import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";
import { tokens } from '../../theme';

const EarningAndDeductions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {};

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const employees = await axios.get("https://hr-backend-gamma.vercel.app/api/EmployeesPayroll");
      setProjects(employees.data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "employeeId", headerName: "Employee ID", width: 150 },
    { field: "employeeName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "basicSalary", headerName: "Basic Salary", width: 150 },
    { field: "deductions", headerName: "Deductions", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "netSalary", headerName: "Total Salary", width: 150 },
  ];

  // Ensure colors are defined and fall back to default if not
  const primaryColor = colors.primary ? colors.primary[400] : theme.palette.primary.main;
  const primaryLightColor = colors.primary ? colors.primary.light : theme.palette.primary.light;
  const successColor = colors.success ? colors.success.main : theme.palette.success.main;
  const backgroundColor = colors.background ? colors.background.default : theme.palette.background.default;

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" mt={5}>
        <Box flex={1} p={3} bgcolor={primaryColor} borderRadius={3} boxShadow={3}>
          <Header title="Earning And Deductions" subtitle="Managing Employee Payroll" />
          <Box mt={4} sx={{ height: '75vh', overflowY: 'auto' }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box sx={{ height: '60vh' }}>
                <DataGrid
                  rows={projects}
                  columns={columns}
                  getRowId={(row) => row._id}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  checkboxSelection
                  disableMultipleRowSelection={true}
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: successColor,
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: primaryLightColor,
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: backgroundColor,
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: primaryLightColor,
                    },
                    "& .MuiCheckbox-root": {
                      color: `${successColor} !important`,
                    },
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default EarningAndDeductions;
