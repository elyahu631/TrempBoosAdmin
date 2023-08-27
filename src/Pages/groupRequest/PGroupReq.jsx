// PGroupReqs.jsx

import React, { useContext, useState } from 'react';
import { CircularProgress, Backdrop, useTheme, useMediaQuery, Box } from "@mui/material";
import { LoginContext } from "../../Contexts/LoginContext";
import MainTable from '../../Components/MainTable';
import { GroupReqContext } from '../../Contexts/GroupReqContext';
import GroupReqsHeader from './GroupReqHeader';

const PGroupReq = () => {
  const { groupReqs, refreshGroupsReqs } = useContext(GroupReqContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedReqs, setSelectedReqs] = useState([]);
  const { loading } = useContext(LoginContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const tableData = groupReqs;


  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshGroupsReqs();
    setIsRefreshing(false);
  };

  const rows = groupReqs.map((groupReq, index) => {
    const date = new Date(groupReq.request_date);
    // Format the corrected date
    const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}-${String(date.getUTCMonth() + 1)
      .padStart(2, '0')}-${date.getUTCFullYear()}`;

    return {
      ...groupReq,
      id: groupReq._id,
      displayId: index + 1,
      request_date: formattedDate
    }
  });

  const columns = [
    { field: "displayId", headerName: "ID", minWidth: 50, flex: 0.2, hideable: false, align: "center", headerAlign: "center" },
    { field: "group_name", headerName: "Group Name", minWidth: 100, flex: 1, align: "center", headerAlign: "center" },
    { field: "type", headerName: "Type", minWidth: 80, flex: 1, align: "center", headerAlign: "center" },
    { field: "request_date", headerName: "Request Date", minWidth: 100, flex: 1, align: "center", headerAlign: "center" },
    { field: "requester_name", headerName: "Name", minWidth: 100, flex: 1, hideable: false, align: "center", headerAlign: "center" },
    { field: "requester_email", headerName: "Email", minWidth: 100, flex: 1, hideable: false, align: "center", headerAlign: "center" },
  ];

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingLeft: isSmallScreen ? theme.spacing(2) : 0,
        paddingRight: isSmallScreen ? theme.spacing(2) : 0,
      }}
    >
      <GroupReqsHeader
        handleRefresh={handleRefresh}
      />
      <MainTable
        rows={rows}
        columns={columns}
        tableData={tableData}
        setSelectedData={setSelectedReqs}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};


export default PGroupReq;
