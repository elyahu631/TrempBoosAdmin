import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ConsolidatedRidesChart = ({ data ,windowWidth}) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  console.log(windowWidth);
  const creators = data.creators_by_month_and_gender;
  const passengers = data.passengers_by_month_and_gender;

  const allData = [...creators, ...passengers];

  const counts = {};

  allData.forEach(item => {
    const month = item._id.month;
    const gender = item._id.gender[0];
    if (!counts[month]) counts[month] = { month };
    counts[month][gender] = (counts[month][gender] || 0) + item.count;
  });

  const chartData = Object.values(counts);

  return (
    <div style={{ height: windowWidth < 500 ? windowWidth - 40 : 500, width: windowWidth < 500 ? windowWidth - 80 : 500 }}>
      <h4 style={{ textAlign: "center" }}>Females vs men tremps count</h4>
      <BarChart
        width={windowWidth < 500 ? windowWidth - 80 : 500}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="M" stackId="a" fill="#8884d8" />
        <Bar dataKey="F" stackId="a" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ConsolidatedRidesChart;
