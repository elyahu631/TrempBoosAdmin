import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TopHoursChart = ({ data, title, fillColor }) => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <BarChart
        width={500}
        height={300}
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="_id" type="category" />
        <Tooltip />
        <Bar dataKey="count" fill={fillColor} orientation="left" />
      </BarChart>
    </div>
  );
};

export default TopHoursChart;
