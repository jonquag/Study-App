import { makeStyles } from '@material-ui/core/styles';

import Background from '../../images/sign-up.png';

export const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    logo: {
        width: '4rem',
        height: 'auto',
        marginBottom: theme.spacing(6),
        '& img': {
            width: '100%',
            height: 'auto',
        },
    },
    paper: {
        height: '100vh',
        width: 'auto',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        borderRadius: 0,
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'left top',
        backgroundSize: 'cover',
        '& button': {
            float: 'right',
            margin: '2rem 2rem 0 0',
            color: '#FFF',
            borderColor: '#FFF',
        },
    },
    dark_overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    formContainer: {
        padding: theme.spacing(4, 22, 4, 12),
        '& h1': {
            marginLeft: theme.spacing(4),
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(4),
        '& input': {
            borderRadius: 4,
            backgroundColor: theme.palette.common.white,
        },
        '& p': {
            fontSize: 12,
            margin: theme.spacing(2.5, 0, 0.5, 0),
        },
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        marginTop: theme.spacing(4),
        height: '3rem',
    },
}));
