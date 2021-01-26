import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
        fontSize: 18,
        opacity: '50%',
    },
    profilePic: {
        borderRadius: '50%',
        width: '130px',
        marginTop: '4em',
    },
    drawer: {
        background: '#F9F9FC',
    },
    linkContainer: {
        paddingTop: '2em',
    },
    profileName: {
        paddingTop: '1em',
        fontSize: 22,
    },
    list_container: {
        display: 'block',
        height: 'calc(100vh - 103px)',
        overflowY: 'scroll',
    },
    chat_head: {
        height: 120,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        '& p': {
            fontSize: 22,
        },
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(4),
        '& span': {
            width: 40,
            height: 24,
            fontSize: 14,
            background: theme.palette.primary.gradient,
        },
    },
    chat_list: {
        height: 100,
        flexWrap: 'nowrap',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#e6edff',
        },
    },
    chat_list_active: {
        height: 100,
        flexWrap: 'nowrap',
        alignItems: 'center',
        backgroundColor: '#e6edff',
    },
    group_member: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
    },
    avatar_container: {
        marginLeft: theme.spacing(5),
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 18,
    },
    group_name: {
        fontSize: 18,
        fontWeight: 500,
    },
    divider: {
        opacity: 0.10414,
        height: 1,
        background: '#2967ff',
    },
    active_line: {
        width: 8,
        height: '100%',
        backgroundColor: '#2967ff',
        marginLeft: theme.spacing(0.1),
    },
    accordion: {},
    accordion_container: {
        display: 'block',
        width: '90%',
        backgroundColor: '#e6edff',
        margin: theme.spacing(0, 5, 2, 4),
        padding: theme.spacing(2.5),
        borderRadius: 8,
    },
    course_name: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& p': {
            fontSize: 18,
        },
    },
    icons: {
        color: '#2968ff',
    },
    group_list: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginTop: 16,
    },
}));
