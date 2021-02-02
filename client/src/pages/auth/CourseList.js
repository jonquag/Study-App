import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
    },
}));

const CourseList = React.memo(({ courses, removeCourse }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            {courses.map(c => (
                <Button
                    key={c._id}
                    endIcon={<HighlightOffIcon onClick={() => removeCourse(c._id)} />}
                >
                    {c.name}
                </Button>
            ))}
        </Grid>
    );
});

export default CourseList;
