import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KpiContext } from '../../Contexts/KpiContext';
import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PKpi() {
  const { driverStatistics, hitchhikerStatistics } = useContext(KpiContext);

  // If driverStatistics or hitchhikerStatistics or any of their properties is null or undefined, show loading
  if (!driverStatistics 
    || driverStatistics.openedDrivers === undefined 
    || driverStatistics.approvedDrivers === undefined 
    || !hitchhikerStatistics 
    || hitchhikerStatistics.openedHitchhikers === undefined 
    || hitchhikerStatistics.approvedHitchhikers === undefined) {
    return <CircularProgress />;
  }

  // Preparing data for the BarChart
  const data = [
    { name: 'ride offers', amount: driverStatistics.openedDrivers },
    { name: 'Approved offers', amount: driverStatistics.approvedDrivers },
    { name: 'ride requests', amount: hitchhikerStatistics.openedHitchhikers },
    { name: 'Approved requests', amount: hitchhikerStatistics.approvedHitchhikers },
  ];

  return (
    <Box width={600}>
      <Typography variant="subtitle1" fontWeight="bold" fontSize="smaller" style={{textAlign:"center"}}>
          Proposals and Travel Requests Opened and Approved
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#8884d8"/>
          <YAxis />
          <Tooltip />
    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
          <Bar dataKey="amount" fill="#8884d8" barSize={30}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
