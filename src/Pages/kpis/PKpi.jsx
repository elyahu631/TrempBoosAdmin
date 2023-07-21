import React, { useContext } from "react";
import { KpiContext } from "../../Contexts/KpiContext";
import CardContainer from "./CardContainer";
import TopHoursChart from "./TopHoursChart";
import TopDriversChart from "./TopDriversChart";
import CustomChart from "./CustomTooltip"; // Import the new chart component

const PKpi = () => {
  const { trempsStatistics, topHours, topDrivers, topRoots } = useContext(KpiContext);

  if (trempsStatistics.length === 0) {
    return <div>Loading...</div>;
  }

  const { total_people, total_approved_trips, average_people_per_trip } =
    trempsStatistics[0];

  const totalHitchhikers = total_people - total_approved_trips;

  return (
    <div>
      <CardContainer
        total_approved_trips={total_approved_trips}
        average_people_per_trip={average_people_per_trip}
        totalHitchhikers={totalHitchhikers}
      />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
        <TopHoursChart
          data={topHours}
          title="Top 5 Hours"
          fillColor="#8884d8"
          style={{ flex: "1 0 20%", minWidth: "300px", margin: "10px" }}
          dataKey="_id"
        />
        <TopDriversChart
          data={topDrivers}
          title="Top 5 Drivers"
          fillColor="#82ca9d"
        />
        <CustomChart
          data={topRoots}
          title="Top Roots"
          fillColor="#ffc658"
        />
      </div>

    </div>
  );
};

export default PKpi;
