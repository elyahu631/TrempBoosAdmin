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
    const fetchedGifts = await fetchGiftsData(token);
    setGifts(fetchedGifts);
  };

  const addGiftHandler = async (gift) => {
    const { gift_image, ...otherProps } = gift;
    try {
      console.log(gift);
      await addGift(token, otherProps, gift_image);
      const fetchedGifts = await fetchGiftsData(token);
      setGifts(fetchedGifts);
    } catch (error) {
      return error;
    }
  };


  const updateGiftHandler = async (updatedGift, file) => {
    try {
      await updateGift(token, updatedGift, file);
      console.log(file);
      const fetchedGifts = await fetchGiftsData(token);
      setGifts(fetchedGifts);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <GiftContext.Provider
      value={{ gifts, refreshGifts: getGifts, deleteGifts, addGift: addGiftHandler, updateGift: updateGiftHandler}} // Provide getUsers as refreshAdmins
    >
      {children}
    </GiftContext.Provider>
  );
};
