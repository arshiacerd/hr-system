// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//     const navigate = useNavigate();
//     const isLoggedIn = localStorage.getItem("login");

//     useEffect(() => {
//         if (!isLoggedIn) {
//             navigate("/");
//         }
//     }, [isLoggedIn, navigate]);

//     return (
//         <>
//             {isLoggedIn ? <Component {...rest} /> : null}
//         </>
//     );
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';


const ProtectedRoute = ({ element: Component, ...rest }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem("login");
        if (loginStatus) {
            setIsLoggedIn(true);
        } else {
            navigate("/");
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return <Loader message="Checking authentication..." />; // Return nothing while loading
    }

    return isLoggedIn ? <Component {...rest} /> : null;
};

export default ProtectedRoute;


export const Loader = ({ message = 'Loading...' }) => {
    console.log("I am in loader")
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};



