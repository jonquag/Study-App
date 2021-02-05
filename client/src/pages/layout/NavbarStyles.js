import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        height: 100,
        backgroundColor: theme.palette.common.white,
    },
    logo_study: {
        flexGrow: 6,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '2.25rem',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0.75rem',
        },
        '& img': {
            width: '2.75rem',
            height: 'auto',
            marginRight: theme.spacing(2),
            cursor: 'pointer',
        },
    },
    listContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        flexGrow: 3,
        display: 'flex',
        '& > *': {
            display: 'flex',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
        },
    },
    profile: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        flexGrow: 1,
        display: 'flex',
        marginLeft: theme.spacing(2),
    },
    menuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        fontSize: '2.25rem',
        color: '#4B00FF',
    },
    avatar: {
        height: 60,
        width: 60,
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(3),
        '& span': {
            width: 30,
            fontSize: '0.75rem',
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
    icons: { marginRight: 8 },
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '1.125rem',
        opacity: '50%',
        marginLeft: 15,
    },
    dropdown_list: {
        '& li': {
            paddingLeft: theme.spacing(0.5),
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
    },
    mobile_logout: {
        marginTop: theme.spacing(2),
    },
}));
