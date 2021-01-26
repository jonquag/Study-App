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
        h3: {
            fontFamily: 'Montserrat',
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: -1,
        },
        h6: {
            fontSize: 16,
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
    button: {
        color: '#FFF',
        background: 'linear-gradient(45deg, #2574FF, #4B00FF)',
        height: 54,
    },
    overrides: {
        MuiButton: {
            root: {
                color: '#FFF',
                background: 'linear-gradient(45deg, #2574FF, #4B00FF)',
                textTransform: 'none',
                fontSize: 22,
            },
        },
    },
});
