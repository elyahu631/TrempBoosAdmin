import { ResponsivePie } from '@nivo/pie';

const GenericPieChart = ({ data, title }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const rawData = [
    {
      id: 'Open Rides',
      label: 'Open Rides',
      value: data.totalOpenRides,
      color: 'hsl(228, 70%, 50%)'
    },
    {
      id: 'Joined Rides',
      label: 'Joined Rides',
      value: data.totalJoinedRides,
      color: 'hsl(48, 70%, 50%)'
    },
    {
      id: 'Open Tremps',
      label: 'Open Tremps',
      value: data.totalOpenTrips,
      color: 'hsl(168, 70%, 50%)'
    },
    {
      id: 'Joined Tremps',
      label: 'Joined Tremps',
      value: data.totalJoinedTrips,
      color: 'hsl(88, 70%, 50%)'
    },
  ];

  // Calculate total value
  const totalValue = rawData.reduce((prev, curr) => prev + curr.value, 0);

  // Calculate chartData with percentages
  const chartData = rawData.map((item) => ({
    ...item,
    value: (item.value / totalValue) * 100
  }));

  return (
    <div style={{ height: 400, width: 500 }}>
      <h4 style={{ textAlign: "center" }}>{title}</h4>

      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        arcLabel={d => `${d.value.toFixed(2)}%`}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        tooltip={({ datum }) => {
          // Find the original data to display the actual value
          const originalData = rawData.find((item) => item.id === datum.id);
          return (
            <strong>
              {datum.id}: {originalData ? originalData.value : 0}
            </strong>
          );
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [{ on: 'hover', style: { itemTextColor: '#000' } }]
          }
        ]}
      />
    </div>
  );
};

export default GenericPieChart;
