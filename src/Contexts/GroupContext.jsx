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
    const fetchedGroups = await fetchGroupsData(token);
    setGroups(fetchedGroups);
  };

  const addGroupHandler = async (group, file) => {
    try {
      console.log(group); // Check the structure of the group object here
      await addGroup(token, group, file);
      const fetchedGroups = await fetchGroupsData(token);
      setGroups(fetchedGroups);
    } catch (error) {
      return error;
    }
  };

  const updateGroupHandler = async (updatedGroup, file) => {
    try {
      await updateGroup(token, updatedGroup, file);
      const fetchedGroups = await fetchGroupsData(token);
      setGroups(fetchedGroups);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  return (
    <GroupContext.Provider
      value={{ groups, refreshGroups: getGroups, deleteGroups, addGroup: addGroupHandler, updateGroup: updateGroupHandler}}
    >
      {children}
    </GroupContext.Provider>
  );
};
 