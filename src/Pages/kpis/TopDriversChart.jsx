import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#ffffff', padding: '5px', border: '1px solid #cccccc' }}>
        <label>{`Driver: ${payload[0].payload.driverName}`}</label>
        <p>{`Tremps: ${payload[0].value}` }</p>
        <p>{`Email: ${payload[0].payload.driverEmail}`}</p>
      </div>
    );
  }

  return null;
};

const CustomChart = ({ data, title, fillColor }) => {
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
        <YAxis dataKey="driverName" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" fill={fillColor} orientation="left" />
      </BarChart>
    </div>
  );
};

export default CustomChart;
