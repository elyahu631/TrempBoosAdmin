import React, { memo } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const GenericBarChart = ({ data, title, fillColor, dataKey, yAxisDataKey, customTooltip, windowWidth }) => {
 

  const styles = {
    customTooltip: {
      backgroundColor: '#FFF',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '5px',
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
      boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      padding: windowWidth < 500 ? '10px 5px' : '10px 0px',
      margin: '10px 5px',
      borderRadius: '15px',
      background: 'linear-gradient(135deg, #f7f8fa, #e6e7e9)',

      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)'
      }
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
        backgroundColor={"red"}
        margin={{ top: 15, right: 30, left: 30, bottom: 15 }}
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
GenericBarChart.defaultProps = {
  data: [],
};
export default memo(GenericBarChart);
