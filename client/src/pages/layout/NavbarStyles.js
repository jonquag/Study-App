import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    logo_study: {
        flexGrow: 6,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '2.25rem',
        '& img': {
            width: '2.5rem',
            height: 'auto',
            marginRight: theme.spacing(2),
        },
    },
    listContainer: {
        flexGrow: 3,
        display: 'flex',
        '& > *': {
            display: 'flex',
            fontSize: 16,
            fontWeight: 500,
        },
    },
    profile: {
        flexGrow: 1,
        display: 'flex',
        marginLeft: theme.spacing(2),
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(3),
        '& span': {
            width: 30,
            fontSize: 12,
            background: theme.palette.primary.gradient,
        },
    },
    profile_button: {
        marginLeft: theme.spacing(1),
        textTransform: 'capitalize',
        '& span': {
            marginLeft: 0,
        },
    },
}));
