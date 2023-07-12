// Pages/PGroups.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop, IconButton, useTheme, useMediaQuery, Tooltip, Table, TableBody, TableRow, TableCell, Box, TableHead } from "@mui/material";
import { LoginContext } from "../../Contexts/LoginContext";
import MainTable from '../../Components/MainTable';
import EditIcon from "@mui/icons-material/Edit";
import { GroupContext } from "../../Contexts/GroupContext";
import GroupsHeader from "./GroupsHeader";
import CustomSnackbar from "../../Components/CustomSnackbar";

const PGroups = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { groups, refreshGroups, deleteGroups } = useContext(GroupContext);
  const tableData = groups;
  const [selectedGifts, setSelectedGifts] = useState([]);
  const { loading } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const openSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddGroup = () => {
    navigate("/add-group");
  };

  const handleDelete = () => {
    console.log(selectedGifts);
    if (selectedGifts.length > 0) {
      deleteGroups(selectedGifts.map((gift) => gift.id));
      setSelectedGifts([]);
    } else {
      openSnackbar("No gifts selected", "error"); // Opens the Snackbar with a custom message
    }
  };

  const handleEditGroup = (giftId) => {
    console.log('====================================');
    console.log(giftId);
    console.log('====================================');
    navigate(`/update-gift/${giftId}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshGroups();
    setIsRefreshing(false);
  }

  const rows = groups.map((group, index) => {
    const locationsComponents = group.locations.map((location, locIndex) =>
      <TableRow key={locIndex}>
        <TableCell component="th" scope="row" >
          {location.name}
        </TableCell>
        <TableCell align="right">{location.coordinates.latitude}</TableCell>
        <TableCell align="right">{location.coordinates.longitude}</TableCell>
      </TableRow>
    );

    const locationTable = (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locationsComponents}
        </TableBody>
      </Table>
    );

    return {
      ...group,
      id: group._id,
      displayId: index + 1,
      locations: locationTable,
      active: group.active === "active" ? "V" : "X"
    }
  });

  const columns = [
    { field: "displayId", headerName: "ID", minWidth: 50, flex: 0.2, hideable: false, align: "center", headerAlign: "center" },
    { field: "group_name", headerName: "Group Name", minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
    { field: "type", headerName: "Type", minWidth: 80, flex: 0.5, align: "center", headerAlign: "center" },
    {field: "locations",headerName: "Locations",minWidth: 250,flex: 1.5,align: "center", headerAlign: "center",
      renderCell: (params) => (
        <Tooltip
          title={
            <Box display="flex" flexDirection="column" overflow="auto" maxHeight={200} color={"white"}>
              {params.value}
            </Box>
          }
        >
          <Box display="flex" flexDirection="column" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >
            {params.value}
          </Box>
        </Tooltip>
      ),
    },
    { field: "active", headerName: "Active", minWidth: 80, flex: 0.5, align: "center", headerAlign: "center" },
    {
      field: "edit", headerName: "Edit", hideable: false, minWidth: 100, flex: 0.2,align: "center",
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleEditGroup(params.row.id)}
        >
          <EditIcon />
        </IconButton>
      ),
      headerAlign: "center", // Align the header cell to the center
    },
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
      <GroupsHeader
        handleDelete={handleDelete}
        handleAddGroup={handleAddGroup}
        handleRefresh={handleRefresh}
      />
      <MainTable
        rows={rows}
        columns={columns}
        tableData={tableData}
        setSelectedData={setSelectedGifts}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default PGroups;

