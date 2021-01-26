import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        height: 120,
        width: '100%',
        marginTop: theme.spacing(2),
    },
    actionArea: {
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
    },
    cardInfo: {
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
    },
    cardImage: {
        width: 100,
        height: 100,
        justifySelf: 'center',
        borderRadius: '10px',
        margin: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingBottom: 5,
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

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.actionArea}>
                <CardMedia
                    component="img"
                    alt="alt img"
                    height="140"
                    image={props.post.image}
                    title="Contemplative Reptile"
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
            </CardActionArea>
        </Card>
    );
};

export default PostCard;
