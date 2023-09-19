import { createContext, useCallback, useEffect, useState } from "react";

export const LoginContext = createContext({
  token: null,
});

const API_BASE_URL = "https://tremp-boss-api.cyclic.cloud/api/adminUsers";
const VALIDATE_TOKEN_URL = `${API_BASE_URL}/validateToken`;
const LOGIN_URL = `${API_BASE_URL}/login`;
const SECRET_PASSWORD = process.env.REACT_APP_SECRET_KEY;
const SALT = 'your-static-salt-string-here';
const ITERATIONS = 100000;

if (!SECRET_PASSWORD) {
  throw new Error("SECRET_PASSWORD is not defined in environment variables!");
}

const deriveKey = async (password) => {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(SALT),
      iterations: ITERATIONS,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

const encryptData = async (plainText, password) => {
  try {
    const encoder = new TextEncoder();
    const key = await deriveKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(plainText)
    );
    return { iv: Array.from(iv), encryptedData: Array.from(new Uint8Array(encrypted)) };
  } catch (error) {
    console.error("Encryption Error:", error);
    throw error;
  }
}

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const decryptData = useCallback(async (encryptedObj, password) => {
    try {
      const decoder = new TextDecoder();
      const key = await deriveKey(password);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(encryptedObj.iv) },
        key,
        new Uint8Array(encryptedObj.encryptedData)
      );
      return decoder.decode(decrypted);
    } catch (error) {
      console.error("Decryption Error:", error);
      throw error;
    }
  }, []);

  const handleServerResponse = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const validateToken = useCallback(async (tokenToValidate) => {
    try {
      const data = await handleServerResponse(VALIDATE_TOKEN_URL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tokenToValidate}`,
          "Content-Type": "application/json",
        },
      });
      setUser(data.data.user);
      setToken(data.data.token);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadAndValidateToken = async () => {
      const tokenFromStorage = localStorage.getItem("token");
      if (tokenFromStorage) {
        const encryptedTokenObj = JSON.parse(tokenFromStorage);
        encryptedTokenObj.iv = new Uint8Array(encryptedTokenObj.iv);
        encryptedTokenObj.encryptedData = new Uint8Array(encryptedTokenObj.encryptedData);
        const decryptedToken = await decryptData(encryptedTokenObj, SECRET_PASSWORD);
        validateToken(decryptedToken);
      } else {
        setLoading(false);
      }
    };
    loadAndValidateToken();
  }, [decryptData, validateToken]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await handleServerResponse(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const receivedToken = data.data.token;
      const encryptedTokenObj = await encryptData(receivedToken, SECRET_PASSWORD);
      localStorage.setItem("token", JSON.stringify(encryptedTokenObj));
      setUser(data.data.user);
      setToken(receivedToken);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <LoginContext.Provider value={{ user, token, login, logout, isLoggedIn: !!user, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
