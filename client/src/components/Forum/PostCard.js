import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Modal } from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PostModal from '../Posts/PostModal';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: 10,
    },
    actionArea: {
        height: 120,
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        alignItems: 'center',
    },
    cardInfo: {
        display: 'grid',
        gridTemplateRows: '1fr',
        justify: 'space-between',
        paddingRight: theme.spacing(2),
    },
    cardImage: {
        width: 100,
        height: 100,
        justifySelf: 'center',
        borderRadius: '10px',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    cardDesc: {
        fontSize: 14,
    },
    postedBy: {
        color: '#2968FF',
    },
    postDateInfo: {
        paddingTop: 10,
    },
}));

const PostCard = props => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    // Calling will open modal
    const handlePostModalOpen = () => {
        setOpen(true);
    };
    // Calling will close modal
    const handlePostModalClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root} variant="outlined" onClick={handlePostModalOpen}>
            <CardActionArea className={classes.actionArea}>
                <CardMedia
                    component="img"
                    alt="alt img"
                    height="140"
                    image={props.post.image}
                    title={props.post.title}
                    className={classes.cardImage}
                />
                <CardContent className={classes.cardInfo}>
                    <div>
                        <Typography className={classes.cardTitle}>
                            {props.post.title}
                        </Typography>
                    </div>
                    <div className={classes.postDateInfo}>
                        <span className={classes.cardDesc}>
                            Posted {props.post.postDate} by{' '}
                        </span>
                        <span className={classes.postedBy}>{props.post.postedBy}</span>
                    </div>
                </CardContent>
                <Modal
                    open={open}
                    onClose={handlePostModalClose}
                    aria-labelledby="simple-modal-post"
                    aria-describedby="simple-modal-to-open-post"
                >
                    <PostModal handlePostModalClose={handlePostModalClose} />
                </Modal>
            </CardActionArea>
        </Card>
    );
};

export default PostCard;
