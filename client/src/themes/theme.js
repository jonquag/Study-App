import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
        fontSize: 12,
        h1: {
            fontSize: 36,
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
