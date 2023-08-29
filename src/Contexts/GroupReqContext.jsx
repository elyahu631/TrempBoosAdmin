import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { denyGroupReqsData, fetchGroupReqsData, updateGroupReqsData,} from '../API/GroupReqAPI';
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


  const updateGroupReqHandler = async (id) => {
    const res = await updateGroupReqsData(token, id);
    if (res.status) {
      getGroupReqs();  // refresh the data
    }
    return res;
  };

  const denyGroupReqHandler = async (id) => {
    const res = await denyGroupReqsData(token, id);
    if (res.status) {
      getGroupReqs();  // refresh the data
    }
    return res;
  };
  
  return (
    <GroupReqContext.Provider value={{ groupReqs, refreshGroupsReqs:getGroupReqs,updateGroupReq: updateGroupReqHandler,denyGroupReq:denyGroupReqHandler }}>
      {children}
    </GroupReqContext.Provider>
  );
};
