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
  border-radius: 15px; 
  background-color: #f3f3f3; /* Light Grey */
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2); /* Shadow effect */
  transition: all 0.3s ease-in-out; /* Animation for hover effect */

  &:hover {
    transform: scale(1.05);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;

  svg {
    color: ${props => props.color || "black"}; /* Color from props */
  }
`;

const NumberText = styled(Typography)`
  font-size: 28px;
`;

const CardContainer = ({ total_approved_trips, average_people_per_trip, totalHitchhikers }) => {
  return (
    <CardContainerWrapper>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent>
              <IconContainer color="#4caf50">  {/* Green */}
                <CarIcon />
              </IconContainer>
              <Typography variant="h5" align="center">
                Total Rides
              </Typography>
              <NumberText align="center">
                {total_approved_trips.toLocaleString()}
              </NumberText>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent>
              <IconContainer color="#f44336"> {/* Red */}
                <PersonIcon />
              </IconContainer>
              <Typography variant="h5" align="center">
                Average People Per Ride
              </Typography>
              <NumberText align="center">
                {average_people_per_trip.toLocaleString()}
              </NumberText>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent>
              <IconContainer color="#ffeb3b"> {/* Yellow */}
                <ThumbsUpIcon />
              </IconContainer>
              <Typography variant="h5" align="center">
                Total Hitchhikers
              </Typography>
              <NumberText align="center">
                {totalHitchhikers.toLocaleString()}
              </NumberText>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </CardContainerWrapper>
  );
};

export default CardContainer;
