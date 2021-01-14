import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
        fontSize: 12,
        h1: {
            // could customize the h1 variant as well
            fontSize: '36px',
        },
        h3: {
            fontFamily: 'Montserrat',
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 35,
            letterSpacing: -1,
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
