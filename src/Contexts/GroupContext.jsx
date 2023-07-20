import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { LoginContext } from "./LoginContext";
import { fetchGroupsData, addGroup, deleteGroup, updateGroup } from '../API/GroupAPI';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const { token } = useContext(LoginContext);

  const getGroupsWithoutChakToken = async () => {
    const fetchedGroups = await fetchGroupsData(token);
    setGroups(fetchedGroups);
  }

  const getGroups = useCallback(async () => {
    if (token) {
      const fetchedGroups = await fetchGroupsData(token);
      setGroups(fetchedGroups);
      console.log(fetchedGroups);
    }

  }, [token]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const deleteGroups = async (groupIds) => {
    await Promise.all(groupIds.map(id => deleteGroup(token, id)));
    getGroupsWithoutChakToken();
  };

  const addGroupHandler = async (group) => {
    const { image_URL, ...otherProps } = group;
    let res = await addGroup(token, otherProps, image_URL);
    if (res.status) {
      getGroupsWithoutChakToken();
    }
    return res;
  };

  const updateGroupHandler = async (updatedGroup, file) => {
    let res = await updateGroup(token, updatedGroup, file);
    if (res.status) {
      getGroupsWithoutChakToken();
    }
    return res;
  };


  return (
    <GroupContext.Provider
      value={{ groups, refreshGroups: getGroups, deleteGroups, addGroup: addGroupHandler, updateGroup: updateGroupHandler }}
    >
      {children}
    </GroupContext.Provider>
  );
};
