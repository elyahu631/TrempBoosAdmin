import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const TitleContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: linear-gradient(45deg, #3f51b5, #9c27b0);
  color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;  // to ensure child components do not overflow
`;

const StyledTableRow = styled(TableRow)`
  background: linear-gradient(135deg, #f7f8fa, #e6e7e9);  // Same gradient as the CardContainer
  &:hover {
    background-color: rgba(63, 81, 181, 0.1);  // subtle hover effect
  }
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  padding: 16px 32px;
`;

function DataTable({ data }) {
  return (
    <Box m={4}>
      <TitleContainer>
        <Typography variant="h6">
          Inactive Groups
        </Typography>
      </TitleContainer>
      <StyledTableContainer component={Paper}>
        <Table aria-label="group table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Group Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((group) => (
              <StyledTableRow key={group._id}>
                <TableCell>{group.group_name}</TableCell>
                <TableCell align="center">
                  {group.image_URL ? <img src={group.image_URL} alt="Group" style={{ width: "50px", borderRadius: "4px" }} /> : "No Image"}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}

export default DataTable;
