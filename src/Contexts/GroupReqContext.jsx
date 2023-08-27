import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { fetchGroupReqsData,} from '../API/GroupReqAPI';
import { LoginContext } from './LoginContext';

export const GroupReqContext = createContext();

export const GroupReqProvider = ({ children }) => {
  const [groupReqs, setGroupReqs] = useState([]);
  const { token } = useContext(LoginContext);

  const getGroupReqs = useCallback(async () => {
    if (token) {
      const fetchedGroupReqs = await fetchGroupReqsData(token);
      setGroupReqs(fetchedGroupReqs);
    }
  }, [token]);

  useEffect(() => {
    getGroupReqs();
  }, [getGroupReqs]);

  
  return (
    <GroupReqContext.Provider value={{ groupReqs, refreshGroupsReqs:getGroupReqs }}>
      {children}
    </GroupReqContext.Provider>
  );
};
