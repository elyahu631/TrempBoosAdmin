import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { LoginContext } from "./LoginContext";
import { addGift, deleteGift, fetchGiftsData, updateGift } from '../API/GiftsAPI';

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const [gifts, setGifts] = useState([]);
  const { token } = useContext(LoginContext);

  const getGiftsWithoutToken = async () => {
    const fetchedGifts = await fetchGiftsData(token);
    setGifts(fetchedGifts);
  }


  const getGifts = useCallback(async () => { // Use useCallback here
    if (token) {
      const fetchedGifts = await fetchGiftsData(token);
      setGifts(fetchedGifts);
    }
  }, [token]); // It depends on 'token'

  useEffect(() => {
    getGifts();
  }, [getGifts]);

  const deleteGifts = async (giftIds) => {
    await Promise.all(giftIds.map(id => deleteGift(token, id)));
    getGiftsWithoutToken();
  };

  const addGiftHandler = async (gift) => {
    const { image_URL, ...otherProps } = gift;
    let res = await addGift(token, otherProps, image_URL);
    console.log(res.status);
    if (res.status) {
      getGiftsWithoutToken();
    }
    return res;
  };


  const updateGiftHandler = async (updatedGift, file) => {
    let res = await updateGift(token, updatedGift, file);
    if (res.status) {
      getGiftsWithoutToken();
    }
    return res;
  };

  return (
    <GiftContext.Provider
      value={{ gifts, refreshGifts: getGifts, deleteGifts, addGift: addGiftHandler, updateGift: updateGiftHandler }} // Provide getUsers as refreshAdmins
    >
      {children}
    </GiftContext.Provider>
  );
};
