import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload, customTooltip }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#ffffff', padding: '5px', border: '1px solid #cccccc' }}>
        {customTooltip(payload)}
      </div>
    );
  }

  return null;
};

const GenericBarChart = ({ data, title, fillColor, dataKey, yAxisDataKey, customTooltip }) => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>{title}</h4>
      <BarChart
        width={500}
        height={250}
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis type="number" />
        <YAxis dataKey={yAxisDataKey} type="category" />
        <Tooltip content={<CustomTooltip customTooltip={customTooltip} />} />
        <Bar dataKey={dataKey} fill={fillColor} orientation="left" />
      </BarChart>
    </div>
  );
};

export default GenericBarChart;
