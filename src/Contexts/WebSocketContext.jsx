// WebSocketContext.jsx
import { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5500');
    setWs(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws }}>
      {children}
    </WebSocketContext.Provider>
  );
};
