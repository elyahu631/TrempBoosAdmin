// PGroupReqs.jsx

import React, { useContext, useState, useEffect } from 'react';
import { CircularProgress, Backdrop, useTheme, useMediaQuery, Box } from "@mui/material";
import { LoginContext } from "../../Contexts/LoginContext";
import MainTable from '../../Components/MainTable';
import { GroupReqContext } from '../../Contexts/GroupReqContext';
import GroupReqsHeader from './GroupReqHeader';
import GroupReqActions from './GroupReqActions';
import InfoButton from './InfoButton';
import ConfirmationDialog from './ConfirmationDialog';
import GroupReqInfoCard from './GroupReqInfoCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const PGroupReq = () => {
  const { groupReqs, refreshGroupsReqs, updateGroupReq, denyGroupReq } = useContext(GroupReqContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedReqs, setSelectedReqs] = useState([]);
  const { loading } = useContext(LoginContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroupReq, setSelectedGroupReq] = useState(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);  // New state for dialog
  const [selectedInfoReq, setSelectedInfoReq] = useState(null); // New state for selected request to show info
  const tableData = groupReqs;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'v' && selectedReqs.length > 0) {
        setSelectedGroupReq(selectedReqs[0]);
        setOpenDialog(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedReqs]);
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedGroupReq(null);
  };

  const handleConfirm = async () => {
    if (selectedGroupReq) {
      await updateGroupReq(selectedGroupReq.id);
    }
    handleClose();
  };

  const handleMoreInfo = (groupId) => {
    const req = groupReqs.find(groupReq => groupReq._id === groupId);
    setSelectedInfoReq(req);
    setInfoDialogOpen(true);
  };

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
    { field: "description", headerName: "Description", minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
    { field: "type", headerName: "Type", minWidth: 100, flex: 0.5, align: "center", headerAlign: "center" },
    { field: "requester_name", headerName: "User Name", minWidth: 100, flex: 1, align: "center", headerAlign: "center" },
    { field: "requester_email", headerName: "Email", minWidth: 100, flex: 1, align: "center", headerAlign: "center" },
    { field: "request_date", headerName: "Request Date", minWidth: 100, flex: 0.5, align: "center", headerAlign: "center" },
    { field: "is_approved", headerName: "Status", minWidth: 100, flex: 0.5, align: "center", headerAlign: "center" },
    {
      field: 'moreInfo', headerName: 'Info', minWidth: 80, flex: 0.2, align: 'center', headerAlign: 'center',
      renderCell: (params) => <InfoButton onClick={() => handleMoreInfo(params.row.id)} />,
    },
    {
      field: 'actions', headerName: 'Actions', minWidth: 100, flex: 0.5, align: "center", headerAlign: "center",
      renderCell: (params) => (
        <GroupReqActions
          onApprove={() => {
            setSelectedGroupReq(params.row);
            setOpenDialog(true);
          }}
          onDeny={async () => {
            await denyGroupReq(params.row.id);
          }}
        />
      ),
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
      <GroupReqsHeader
        handleRefresh={handleRefresh}
      />
      <MainTable
        rows={rows}
        columns={columns}
        tableData={tableData}
        setSelectedData={setSelectedReqs}
        showCheckBox={false}
      />
      <Backdrop open={isRefreshing} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
        groupName={selectedGroupReq?.group_name}
      />
      <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}>
        <DialogTitle style={{ textAlign: 'center', fontWeight:'bold'}}>
          Group Request Information
        </DialogTitle>
        <DialogContent>
          <GroupReqInfoCard selectedReq={selectedInfoReq} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};


export default PGroupReq;
