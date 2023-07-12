import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Backdrop, IconButton,useTheme,useMediaQuery } from "@mui/material";
import { LoginContext } from "../../Contexts/LoginContext";
import MainTable from '../../Components/MainTable';
import EditIcon from "@mui/icons-material/Edit";
import { GiftContext } from "../../Contexts/GiftsContext";
import GiftsHeader from "./GiftsHeader";
import CustomSnackbar from "../../Components/CustomSnackbar";


const PGifts = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { gifts, refreshGifts, deleteGifts } = useContext(GiftContext);
  const tableData = gifts;
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

  const handleAddGift = () => {
    navigate("/add-gift");
  };

  const handleDelete = () => {
    console.log(selectedGifts);
    if (selectedGifts.length > 0) {
      deleteGifts(selectedGifts.map((gift) => gift.id));
      setSelectedGifts([]);
    } else {
      openSnackbar("No gifts selected", "error"); // Opens the Snackbar with a custom message
    }
  };

  const handleEditGift = (giftId) => {
    console.log('====================================');
    console.log(giftId);
    console.log('====================================');
    navigate(`/update-gift/${giftId}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshGifts();
    setIsRefreshing(false);
  }

  const rows = gifts.map((gift, index) => ({
    ...gift,
    id: gift._id,
    displayId: index + 1,
  }));

  const columns = [
    { field: "displayId", headerName: "ID", minWidth: 50, flex: 0.2, hideable: false, align: "center", headerAlign: "center" },
    { field: "gift_name", headerName: "Gift Name", minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
    { field: "price", headerName: "Price", minWidth: 100, flex: 1, align: "center", headerAlign: "center" },
    { field: "quantity", headerName: "Quantity", minWidth: 100, flex: 1, align: "center", headerAlign: "center" },
    { field: "collect_place", headerName: "Collect Place", minWidth: 200, flex: 1, align: "center", headerAlign: "center" },
    {
      field: "edit",
      headerName: "Edit",
      hideable: false,
      minWidth: 100,
      flex: 0.2,
      align: "center",
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleEditGift(params.row.id)}
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
      <GiftsHeader
        handleDelete={handleDelete}
        handleAddGift={handleAddGift}
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

export default PGifts;
