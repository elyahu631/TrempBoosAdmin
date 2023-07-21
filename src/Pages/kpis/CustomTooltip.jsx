import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#ffffff', padding: '5px', border: '1px solid #cccccc' }}>
        <label>{`${payload[0].payload.label} : ${payload[0].value}`}</label>
        <p>{`From: ${payload[0].payload.from}`}</p>
        <p>{`To: ${payload[0].payload.to}`}</p>
      </div>
    );
  }

  return null;
};

const CustomChart = ({ data, title, fillColor }) => {
  // create a new field that combines "from_root" and "to_root"
  const newData = data.map(item => ({
    ...item,
    label: `${item._id.from_root} - ${item._id.to_root}`,
    from: item._id.from_root,
    to: item._id.to_root
  }));

  if (newData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <BarChart
        width={800}
        height={300}
        layout="vertical"
        data={newData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis width={200} dataKey="label" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" fill={fillColor} orientation="left" />
      </BarChart>
    </div>
  );
};

export default CustomChart;
