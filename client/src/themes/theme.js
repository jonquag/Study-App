import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
        // fontSize: '0.75rem',
        h1: {
            fontSize: '2.25rem',
        },
        h2: {
            fontSize: 22,
            fontWeight: 'bold',
            letterSpacing: 0.5,
        },
        h3: {
            fontFamily: 'Montserrat',
            fontSize: '1.625rem',
            fontWeight: 500,
            letterSpacing: -1,
        },
        h4: {
            fontSize: 16,
            opacity: '50%',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: -0.5,
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
        secondary: {
            main: '#2968FF',
        },
    },
    overrides: {
        MuiButton: {
            textPrimary: {
                color: '#FFF',
                background: 'linear-gradient(45deg, #2574FF, #4B00FF)',
                textTransform: 'none',
                fontSize: 14,
                padding: 20,
                height: '3rem',
            },
            outlinedPrimary: {
                color: '#FFF',
                textTransform: 'none',
                fontSize: 14,
                padding: 20,
                height: '3rem',
            },
            outlinedSecondary: {
                color: '#2968FF',
                textTransform: 'none',
                fontSize: 14,
                padding: 20,
                height: '3rem',
            },
        },
    },
});
