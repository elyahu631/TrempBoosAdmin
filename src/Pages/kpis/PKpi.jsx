import React, { useContext, useState, useEffect } from "react";
import { KpiContext } from "../../Contexts/KpiContext";
import CardContainer from "./CardContainer";
import GenericBarChart from "./GenericBarChart";
import GenericPieChart from "./GenericPieChart";
import ConsolidatedRidesChart from "./ConsolidatedRidesChart";
import DataTable from './InactiveGroupsTable';
import { Filters } from "./FilterKpi";

const PKpi = () => {
  const { trempsStatistics, topFive, percentages, monthlyCounts, mostActiveGroups, inactiveGroups } = useContext(KpiContext);
  const context = useContext(KpiContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false); // New state for mobile visibility

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

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
    <div style={{ margin: "0px 10px 10px 10px", display: 'flex', overflowY: 'auto', maxHeight: '82vh' }}>

      {windowWidth > 768 ? (
        <Filters
          style={{
            position: 'sticky',
            top: 0,
            height: '82vh',
            overflowY: 'auto',
            borderRight: '1px solid #ddd'
          }}
          onFilterChange={(filters) => {
            context.fetchTrempsState(filters);
            context.fetchTopFiveState(filters);
            context.fetchPercentagesState(filters);
            context.fetchMonthlyCountsState(filters);
          }}
        />
      ) : null}

      <div style={{ flex: 1, margin: '0', padding: '0 30px', position: 'relative', overflowY: 'auto' }}>

        {windowWidth <= 768 ? (
          <button onClick={toggleFilters} style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 10,
            padding: '10px 20px',
            backgroundColor: '#2979ff',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            fontWeight: 'bold'
          }}>
            {isFiltersVisible ? "Close Filters" : "Open Filters"}
          </button>
        ) : null}

        {isFiltersVisible && windowWidth <= 768 ? (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 5,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            alignItems:'center',
          }}>
            <Filters onFilterChange={(filters) => {
              context.fetchTrempsState(filters);
              context.fetchTopFiveState(filters);
              context.fetchPercentagesState(filters);
              context.fetchMonthlyCountsState(filters);
              setIsFiltersVisible(!isFiltersVisible);
            }} />
          </div>
        ) : null}
        
        <h1 style={{
          position: 'sticky',
          margin: '0',
          top: '0',
          backgroundColor: '#ebebeb',
          zIndex: 1,
          borderBottom: '1px solid #eee',
          textAlign: "left",
          color: "#2C3E50",
          marginBottom: "30px"
        }}>
          TREMP-BOSS DASHBOARD
        </h1>
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
            title="Top 5 Routes"
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
            title="Top 5 Groups"
            fillColor="#123456"
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
    </div>
  );
};

export default PKpi;
