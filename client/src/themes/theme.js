import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
        fontSize: '0.75rem',
        h1: {
            fontSize: '2.25rem',
        },

        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: -0.5,
        },
        h3: {
            fontFamily: 'Montserrat',
            fontSize: '1.625rem',
            fontWeight: 500,
            letterSpacing: -1,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
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
