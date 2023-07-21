import React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CarIcon from "@mui/icons-material/DriveEta";
import PersonIcon from "@mui/icons-material/Person";
import ThumbsUpIcon from "@mui/icons-material/ThumbUp";

const CardContainerWrapper = styled.div`
  margin-top: 32px;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TotalRidesCard = styled(StyledCard)`
  background-color: #d1c4e9; /* Purple */
`;

const AveragePeopleCard = styled(StyledCard)`
  background-color: #e1bee7; /* Light Purple */
`;

const TotalHitchhikersCard = styled(StyledCard)`
  background-color: #ffe0b2; /* Orange */
`;

const NumberText = styled(Typography)`
  font-size: 28px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

const CardContainer = ({ total_approved_trips, average_people_per_trip, totalHitchhikers }) => {
  return (
    <CardContainerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TotalRidesCard>
            <CardContent>
              <IconContainer>
                <CarIcon />
              </IconContainer>
              <Typography variant="h5" align="center">
                Total Rides
              </Typography>
              <NumberText align="center">
                {total_approved_trips.toLocaleString()}
              </NumberText>
            </CardContent>
          </TotalRidesCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AveragePeopleCard>
            <CardContent>
              <IconContainer>
                <PersonIcon />
              </IconContainer>
              <Typography variant="h5" align="center">
                Average People Per Ride
              </Typography>
              <NumberText align="center">
                {average_people_per_trip.toLocaleString()}
              </NumberText>
            </CardContent>
          </AveragePeopleCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TotalHitchhikersCard>
            <CardContent>
              <IconContainer>
                <ThumbsUpIcon />
              </IconContainer>
              <Typography variant="h5" align="center">
                Total Hitchhikers
              </Typography>
              <NumberText align="center">
                {totalHitchhikers.toLocaleString()}
              </NumberText>
            </CardContent>
          </TotalHitchhikersCard>
        </Grid>
      </Grid>
    </CardContainerWrapper>
  );
};

export default CardContainer;
