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
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background: linear-gradient(135deg, #f7f8fa, #e6e7e9);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  width: 100%;
  padding: 8px 0;
  background-color: ${props => props.color || "#ccc"};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: background-color 0.3s ease-in-out;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-top: 16px;

  svg {
    color: ${props => props.color || "black"};
  }
`;

const NumberText = styled(Typography)`
  font-size: 36px;
  font-weight: bold;
  margin: 20px 0;
`;

const TitleText = styled(Typography)`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
`;

const KpiCard = ({ color, icon: Icon, number, title }) => (
  <StyledCard>
    <CardHeader color={color}></CardHeader>
    <CardContent>
      <IconContainer color={color}>
        <Icon />
      </IconContainer>
      <NumberText align="center">
        {number.toLocaleString()}
      </NumberText>
      <TitleText align="center">{title}</TitleText>
    </CardContent>
  </StyledCard>
);

const CardContainer = ({ total_approved_trips, average_people_per_trip, totalHitchhikers }) => {
  return (
    <CardContainerWrapper>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <KpiCard 
            color="#4caf50"
            icon={CarIcon}
            number={total_approved_trips}
            title="Total Rides"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard 
            color="#f44336"
            icon={PersonIcon}
            number={average_people_per_trip}
            title="Average People Per Ride"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard 
            color="#ff8a05"
            icon={ThumbsUpIcon}
            number={totalHitchhikers}
            title="Total Hitchhikers"
          />
        </Grid>
      </Grid>
    </CardContainerWrapper>
  );
};

export default CardContainer;


