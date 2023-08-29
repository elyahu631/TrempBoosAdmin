import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardHeader,
} from '@mui/material';

const InfoListItem = ({ primary, secondary }) => (
  <ListItem>
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

const LocationListItem = ({ location, index }) => (
  <ListItem key={index}>
    <ListItemText
      primary={location.name}
      secondary={`Latitude: ${location.coordinates.latitude}, Longitude: ${location.coordinates.longitude}`}
    />
  </ListItem>
);

const GroupReqInfoCard = ({ selectedReq }) => {
  if (!selectedReq) return null;

  // Format the date
  const date = new Date(selectedReq.request_date);
  const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}-${String(date.getUTCMonth() + 1)
    .padStart(2, '0')}-${date.getUTCFullYear()}`;

  return (
    <Card elevation={3}>
      <CardHeader
        title={"Group Name: " + selectedReq.group_name}
        titleTypographyProps={{ variant: 'h6' }}
        style={{ textAlign: 'center' }}
      />
      <Divider />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          General
        </Typography>
        <List>
          <InfoListItem primary="Description" secondary={selectedReq.description} />
          <InfoListItem primary="Type" secondary={selectedReq.type} />
          <InfoListItem primary="Request Date" secondary={formattedDate} />
          <InfoListItem primary="Requester Name" secondary={selectedReq.requester_name} />
          <InfoListItem primary="Requester Email" secondary={selectedReq.requester_email} />
          <InfoListItem primary="Status" secondary={selectedReq.is_approved} />
        </List>
        <Divider />
        <Typography variant="subtitle1" gutterBottom style={{ marginTop: '1em' }}>
          Locations
        </Typography>
        <List>
          {selectedReq.locations.map((location, index) => (
            <LocationListItem location={location} index={index} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default GroupReqInfoCard;
