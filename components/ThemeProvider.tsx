"use client"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F86F03',
        },
        secondary: {
            main: '#525FE1',
        },
    },
})

const MUIThemeProvider = ({ children }
    : {
        children: React.ReactNode,
    }) => {
        
        return ( <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>)
    }

export default MUIThemeProvider;

