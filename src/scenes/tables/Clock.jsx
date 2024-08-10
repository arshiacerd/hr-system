import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, Avatar, styled, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: tokens(theme.palette.mode).blueAccent[700],
    color: theme.palette.common.white,
  },
  '& .MuiDataGrid-cell': {
    backgroundColor: tokens(theme.palette.mode).primary[400],
    color: theme.palette.common.white,
  },
  '& .MuiDataGrid-footer': {
    backgroundColor: tokens(theme.palette.mode).primary[400],
  },
}));

const Clock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkInButtonText, setCheckInButtonText] = useState("Check In");
  const [timeEntries, setTimeEntries] = useState([]);
  const [totalMonthlyHours, setTotalMonthlyHours] = useState("0:00:00");

  useEffect(() => {
    const storedCheckInTime = localStorage.getItem('checkInTime');
    const storedIsActive = JSON.parse(localStorage.getItem('isActive'));
    const storedTime = JSON.parse(localStorage.getItem('time'));

    if (storedCheckInTime) setCheckInTime(new Date(storedCheckInTime));
    if (storedIsActive) setIsActive(storedIsActive);
    if (storedTime) setTime(storedTime);

    let interval;
    if (storedIsActive) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
    }

    getEntries();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    localStorage.setItem('isActive', JSON.stringify(isActive));
    localStorage.setItem('time', JSON.stringify(time));
    localStorage.setItem('checkInTime', checkInTime ? checkInTime.toISOString() : '');

    return () => clearInterval(interval);
  }, [isActive, time, checkInTime]);

  const handleCheckin = async () => {
    const now = new Date();
    if (!isActive) {
      const todayEntries = timeEntries.filter(entry => {
        const entryDate = new Date(entry.checkIn).toLocaleDateString();
        return entryDate === now.toLocaleDateString();
      });

      if (todayEntries.length > 0) {
        alert("You cannot clock in more than once per day.");
        return;
      }

      setCheckInTime(now);
      setIsActive(true);
      setCheckInButtonText("Clock Out");
    } else {
      const confirmClockOut = window.confirm("You won't be able to clock in again today. Do you want to proceed?");
      if (!confirmClockOut) return;

      setIsActive(false);
      setCheckInButtonText("Check In");
      const checkOutTime = now;
      const totalTime = (checkOutTime - checkInTime) / 1000; // total time in seconds
      const newEntry = {
        _id: new Date().toISOString(), // Using a temporary unique ID
        date: checkInTime.toLocaleDateString(),
        day: checkInTime.toLocaleDateString('en-US', { weekday: 'long' }),
        checkIn: checkInTime.toISOString(),
        checkOut: checkOutTime.toISOString(),
        totalTime: formatTime(totalTime),
        email: localStorage.getItem('email')
      };
      axios.post("https://hr-backend-gamma.vercel.app/api/timeEntries", newEntry)
        .then((res) => {
          console.log(res);
          getEntries(); // Reload entries without refreshing the page
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.error);
        });
      setTime(0);
      localStorage.removeItem('checkInTime');
      localStorage.removeItem('isActive');
      localStorage.removeItem('time');
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getEntries = async () => {
    try {
      const res = await axios.get('https://hr-backend-gamma.vercel.app/api/timeEntries', {
        params: {
          email: localStorage.getItem('email')
        }
      });
      setTimeEntries(res.data);
      calculateMonthlyHours(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateMonthlyHours = (entries) => {
    const now = new Date();
    const currentMonthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.checkIn);
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    });
    const totalSeconds = currentMonthEntries.reduce((acc, entry) => {
      const duration = (new Date(entry.checkOut) - new Date(entry.checkIn)) / 1000;
      return acc + duration;
    }, 0);
    setTotalMonthlyHours(formatTime(totalSeconds));
  };

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'day', headerName: 'Day', flex: 1 },
    { field: 'checkIn', headerName: 'Check In', flex: 1, valueFormatter: ({ value }) => new Date(value).toLocaleTimeString() },
    { field: 'checkOut', headerName: 'Check Out', flex: 1, valueFormatter: ({ value }) => new Date(value).toLocaleTimeString() },
    { field: 'totalTime', headerName: 'Total Time', flex: 1 }
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        p="30px"
        boxShadow={3}
        sx={{ backgroundColor: theme.palette.primary[400] }}
      >
        <Box>
          <Typography variant="h2" fontWeight="600" textAlign="center">
            Your Work Time Overview
          </Typography> <br/>
          <Typography variant="h5" color="textSecondary">
            Track your time and monitor your <br/>clock-ins and clock-outs.
          </Typography>
        </Box>
        <Card sx={{ boxShadow: 3, minWidth: 320 }}>
          <CardContent sx={{ backgroundColor: theme.palette.background.paper, textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 80, height: 80, margin: '0 auto' }}>
              <AccessTimeIcon fontSize="large" style={{ color: theme.palette.text.primary }} />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, color: theme.palette.text.primary }}>Your Time</Typography>
            <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>{formatTime(time)}</Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Clocked In: {isActive ? checkInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
            </Typography>
            <Button
              variant="contained"
              color={isActive ? "error" : "primary"}
              startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
              onClick={handleCheckin}
              sx={{ mt: 2 }}
            >
              {checkInButtonText}
            </Button>
          </CardContent>
        </Card>
      </Box>

      <Box
  m="40px 0 0 0"
  height="75vh"
  sx={{
    "& .MuiDataGrid-root": { border: "none" },
    "& .MuiDataGrid-cell": { borderBottom: "none" },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.blueAccent[700],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
    },
  }}
>
    <Box sx={{ height: "70vh", width: "100%", border: "none" }}>
      <DataGrid
        rows={timeEntries}
        columns={columns}
        getRowId={(row) => row.date + row.name}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
          "& .MuiDataGrid-footerContainer": { borderTop: "none" },
        }}
      />
    </Box>
</Box>

    </Box>
  );
};

export default Clock;
