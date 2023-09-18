// Pages/PTremps.jsx

import React, { useContext, useState } from 'react';
import { Box, CircularProgress, Backdrop, useTheme, useMediaQuery } from "@mui/material";
import { TrempContext } from "../../Contexts/TrempContext";
import MainTable from '../../Components/MainTable';
import TrempsHeader from "./TrempsHeader";
import { LoginContext } from "../../Contexts/LoginContext";

const PTremps = () => {
  const { tremps, refreshTremps } = useContext(TrempContext);

  const { loading } = useContext(LoginContext);

  const tableData = tremps;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshTremps();
    setIsRefreshing(false);
  }

  const rows = tremps.map((tremp, index) => {
    const createDate = new Date(tremp.create_date);
    const formattedCreateDate = `${createDate.toLocaleDateString()}, ${createDate.toLocaleTimeString()}`;

    const trempTime = new Date(tremp.tremp_time);
    const formattedTrempTime = `${trempTime.toLocaleDateString()}, ${trempTime.toLocaleTimeString()}`;

    return {
      ...tremp,
      id: tremp._id,
      displayId: index + 1,
      create_date: formattedCreateDate,
      tremp_time: formattedTrempTime,
      fromRootName: tremp.from_route.name,
      toRootName: tremp.to_route.name,

    };
  });

  const columns = [
    { field: "displayId", headerName: "ID", flex: 0.2, minWidth: 50, hideable: false, align: "center", headerAlign: "center" },
    { field: "tremp_type", headerName: "Tremp Type", flex: 1, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "tremp_group", headerName: "group", flex: 1, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "create_date", headerName: "Creation Date", flex: 1, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "tremp_time", headerName: "Tremp Time", flex: 1, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "fromRootName", headerName: "From", flex: 1, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "toRootName", headerName: "To", flex: 1, minWidth: 50, align: "center", headerAlign: "center" },
    { field: "seats_amount", headerName: "Seat Amount", flex: 0.5, minWidth: 80, align: "center", headerAlign: "center" },
    { field: "is_full", headerName: "Is Full?", flex: 0.5, minWidth: 80, align: "center", headerAlign: "center" },
    { field: "is_completed", headerName: "Is Completed?", flex: 0.5, minWidth: 80, align: "center", headerAlign: "center" },
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
      <TrempsHeader
        handleRefresh={handleRefresh}
      />
      <MainTable
        rows={rows}
        columns={columns}
        tableData={tableData}
        showCheckBox={false}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default PTremps;
