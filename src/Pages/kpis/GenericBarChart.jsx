import React, { memo } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const GenericBarChart = ({ data, title, fillColor, dataKey, yAxisDataKey, customTooltip, windowWidth }) => {
 

  const styles = {
    customTooltip: {
      backgroundColor: '#FFF',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontSize: windowWidth < 360 ? '12px' : windowWidth < 500 ? '14px' : '16px'
    },
    title: {
      textAlign: "center",
      marginBottom: '20px',
      fontSize: windowWidth < 360 ? '14px' : windowWidth < 500 ? '16px' : '18px',
      fontWeight: '500',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    chartContainer: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      padding: windowWidth < 500 ? '10px 5px' : '10px 15px 10px 50px',
      margin: '10px 5px',
      borderRadius: '6px',
      backgroundColor: '#CCC'
    }
  };

  const CustomTooltip = ({ active, payload, renderContent }) => {
    if (active && payload && payload.length) {
      return <div style={styles.customTooltip}>{renderContent(payload)}</div>;
    }
    return null;
  };

  if (!data || data.length === 0) return <div>Loading...</div>;
  return (
    <div style={styles.chartContainer}>
      <h4 style={styles.title}>{title}</h4>
      <BarChart
        width={windowWidth < 580 ? windowWidth - 85 : 500}
        height={windowWidth < 580 ? 200 : 250}
        layout="vertical"
        data={data}
        margin={{ top: 15, right: 30, left: 85, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis type="number" />
        <YAxis
          dataKey={yAxisDataKey}
          type="category"
          width={windowWidth < 500 ? 80 : 100}
        />
        <Tooltip content={<CustomTooltip renderContent={customTooltip} />} />
        <Bar dataKey={dataKey} fill={fillColor} orientation="left" />
      </BarChart>
    </div>
  );
};

GenericBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  fillColor: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  yAxisDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  customTooltip: PropTypes.func
};

export default memo(GenericBarChart);
