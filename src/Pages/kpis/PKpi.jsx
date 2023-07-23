import React, { useContext } from "react";
import styled from "styled-components";
import { KpiContext } from "../../Contexts/KpiContext";
import CardContainer from "./CardContainer";
import GenericBarChart from "./GenericBarChart";
import GenericPieChart from "./GenericPieChart";

const PageContainer = styled.div`
  margin: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  flex: 1 0 20%;
  min-width: 300px;
  margin: 10px;
`;

const PKpi = () => {
  const { trempsStatistics, topHours, topDrivers, topRoots, percentages } = useContext(KpiContext);

  if (trempsStatistics.length === 0) {
    return <div>Loading...</div>;
  }

  const { total_people, total_approved_trips, average_people_per_trip } = trempsStatistics[0];

  const totalHitchhikers = total_people - total_approved_trips;

  return (
    <PageContainer>
      <CardContainer
        total_approved_trips={total_approved_trips}
        average_people_per_trip={average_people_per_trip}
        totalHitchhikers={totalHitchhikers}
      />
      <hr />
      <FlexContainer>
        <ChartContainer>
          <GenericBarChart
            data={topHours}
            title="Top 5 Hours"
            fillColor="#8884d8"
            dataKey="count"
            yAxisDataKey="_id"
            customTooltip={(payload) => (
              <>
                <label>{`Hour: ${payload[0].payload._id}`}</label>
                <p>{`Opend: ${payload[0].value}`}</p>
              </>
            )}
          />
        </ChartContainer>
        <ChartContainer>
          <GenericBarChart
            data={topDrivers}
            title="Top 5 Drivers"
            fillColor="#82ca9d"
            dataKey="count"
            yAxisDataKey="driverName"
            customTooltip={(payload) => (
              <>
                <label>{`Driver: ${payload[0].payload.driverName}`}</label>
                <p>{`Tremps: ${payload[0].value}`}</p>
                <p>{`Email: ${payload[0].payload.driverEmail}`}</p>
              </>
            )}
          />
        </ChartContainer>
        <ChartContainer>
          <GenericBarChart
            data={topRoots}
            title="To 5 Roots"
            fillColor="#ffc658"
            dataKey="count"
            yAxisDataKey={(data) => `${data._id.from_root}-${data._id.to_root}`}
            customTooltip={(payload) => (
              <>
                <label>{`amount : ${payload[0].value}`}</label>
                <p>{`From: ${payload[0].payload._id.from_root}`}</p>
                <p>{`To: ${payload[0].payload._id.to_root}`}</p>
              </>
            )}
          />
        </ChartContainer>
      </FlexContainer>
      <FlexContainer>
        <ChartContainer>
          <GenericPieChart
            data={percentages[0]}
            title="Rides and Trips Percentages"
          />
        </ChartContainer>
      </FlexContainer>
    </PageContainer>
  );
};

export default PKpi;
