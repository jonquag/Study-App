import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
        fontSize: 12,
        h1: {
            // could customize the h1 variant as well
            fontSize: '36px',
        },
        h5: {
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: -0.5,
        },
    },
    palette: {
        primary: {
            main: '#4B00FF',
            light: '#2574FF',
            gradient: 'linear-gradient(45deg, #2574FF, #4B00FF)',
        },
    },
});
