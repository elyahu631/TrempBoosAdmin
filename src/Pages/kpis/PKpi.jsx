import React, { useContext, useState, useEffect } from "react";
import { KpiContext } from "../../Contexts/KpiContext";
import CardContainer from "./CardContainer";
import GenericBarChart from "./GenericBarChart";
import GenericPieChart from "./GenericPieChart";
import ConsolidatedRidesChart from "./ConsolidatedRidesChart";
import DataTable from './InactiveGroupsTable';

const PKpi = () => {
  const { trempsStatistics, topFive, percentages, monthlyCounts, mostActiveGroups, inactiveGroups } = useContext(KpiContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (trempsStatistics.length === 0) {
    return <div>Loading...</div>;
  }

  const { total_people, total_approved_trips, average_people_per_trip } =
    trempsStatistics[0];

  const totalHitchhikers = total_people - total_approved_trips;

  return (
    <div style={{ margin: "30px" }}>
      <CardContainer
        total_approved_trips={total_approved_trips}
        average_people_per_trip={average_people_per_trip}
        totalHitchhikers={totalHitchhikers}
      />
      <hr />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", marginBottom: "20px" }}>
        <GenericBarChart
          data={topFive.top_hours}
          windowWidth={windowWidth}
          title="Top 5 Hours"
          fillColor="#8884d8"
          style={{ flex: "1 0 20%", minWidth: "300px", margin: "10px" }}
          dataKey="count"
          yAxisDataKey="_id"
          customTooltip={(payload) => (<>
            <label>{`Hour: ${payload[0].payload._id}`}</label>
            <p>{`Opend: ${payload[0].value}`}</p>

          </>)}
        />
        <GenericBarChart
          data={topFive.top_drivers}
          windowWidth={windowWidth}
          title="Top 5 Drivers"
          fillColor="#82ca9d"
          dataKey="count"
          yAxisDataKey="driverName"
          customTooltip={(payload) => (<>
            <label>{`Driver: ${payload[0].payload.driverName}`}</label>
            <p>{`Tremps: ${payload[0].value}`}</p>
            <p>{`Email: ${payload[0].payload.driverEmail}`}</p>
          </>)}
        />
        <GenericBarChart
          data={topFive.top_routes}
          title="To 5 Routes"
          windowWidth={windowWidth}
          fillColor="#ffc658"
          dataKey="count"

          yAxisDataKey={(data) => `${data._id.from_route.substring(0, 18)}`}
          customTooltip={(payload) => (<>
            <label>{`amount : ${payload[0].value}`}</label>
            <p>{`From: ${payload[0].payload._id.from_route}`}</p>
            <p>{`To: ${payload[0].payload._id.to_route}`}</p>
          </>)}
        />


      </div>
      <hr />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", gap: 50 }}>
        <GenericPieChart
          data={percentages[0]}
          windowWidth={windowWidth}
          title="Rides and Trips Percentages"
          style={{ flex: "1 0 20%", minWidth: "300px", margin: "10px" }}
        />
        <ConsolidatedRidesChart
          data={monthlyCounts}
          windowWidth={windowWidth}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", marginTop: 50 }}>
        <GenericBarChart
          data={mostActiveGroups}
          windowWidth={windowWidth}
          title="Top 5 Active Groups"
          fillColor="#123456"  // choose any color
          dataKey="total_activity"
          yAxisDataKey="group_name"
          customTooltip={(payload) => (
            <>
              <label>{`Group: ${payload[0].payload.group_name}`}</label>
              <p>{`Tremps: ${payload[0].payload.tremp_count}`}</p>
              <p>{`Members: ${payload[0].payload.user_count}`}</p>
            </>
          )}
        />
        <DataTable data={inactiveGroups} />

      </div>

    </div>
  );
};

export default PKpi;
