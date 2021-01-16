import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    FormHelperText,
    Button,
    Select,
    MenuItem,
    ListItem,
    List,
    IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import axios from 'axios';

import { courses } from '../../data/mockData';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.common.white,
        flexDirection: 'column',
        justify: 'flex-start',
        paddingLeft: theme.spacing(11),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',

        '& input': {
            borderRadius: 4,
            backgroundColor: theme.palette.common.white,
        },
        '& p': {
            fontSize: 12,
            margin: theme.spacing(2.5, 0, 0.5, 0),
        },
    },
}));

const mockMyCourses = [
    {
        id: 2,
        name: 'Art History and Visual Culture',
    },
    {
        id: 3,
        name: 'Environment and Health',
    },
    {
        id: 4,
        name: 'Neuroscience',
    },
];

const MyCourses = () => {
    const classes = useStyles();
    const [school] = useState('University of Toronto');
    const [course, setCourse] = useState('');
    const [schoolCourses] = useState(courses);
    const [myCourses, setMyCourses] = useState(mockMyCourses);

    const addCourse = () => {
        if (myCourses.some(c => c.id === course)) return;
        setMyCourses([...myCourses, schoolCourses.find(c => c.id === course)]);
        setCourse('');
    };

    const removeCourse = id => {
        setMyCourses(myCourses.filter(c => c.id !== id));
    };

    const hanldeCourseUpdate = () => {
        const courses = [...myCourses].map(c => c.id);
        // axios.post('/', {courses});
    };

    return (
        <Grid container>
            <Grid item md={3} style={{ height: '100vh', backgroundColor: '#f1f1f1' }}>
                Sidebar
            </Grid>
            <Grid item container md={9} className={classes.container}>
                <Typography variant="h1">Profile</Typography>
                <Typography>Your school: {school}</Typography>
                {myCourses.length < 1 && <Typography>No course selected.</Typography>}
                {myCourses.map(c => {
                    if (c.id === course) {
                        return (
                            <List key={c.id}>
                                <ListItem>
                                    <Typography>{c.name}</Typography>
                                    <IconButton
                                        edge="end"
                                        onClick={() => removeCourse(c.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => setCourse('')}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                </ListItem>
                            </List>
                        );
                    }
                    return (
                        <List key={c.id}>
                            <ListItem>
                                <Typography>{c.name}</Typography>
                                <IconButton edge="end" onClick={() => setCourse(c.id)}>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </ListItem>
                        </List>
                    );
                })}

                <form className={classes.form}>
                    <FormHelperText>Select the course</FormHelperText>
                    <Select
                        value={course}
                        variant="outlined"
                        onChange={e => {
                            setCourse(e.target.value);
                        }}
                    >
                        {schoolCourses.map(course => {
                            const isSelected = myCourses.some(c => c.id === course.id);
                            if (isSelected) {
                                return (
                                    <MenuItem key={course.id} value={course.id} disabled>
                                        {course.name}
                                    </MenuItem>
                                );
                            } else {
                                return (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.name}
                                    </MenuItem>
                                );
                            }
                        })}
                    </Select>
                    <Grid style={{ marginTop: 8 }}>
                        <Button
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={addCourse}
                        >
                            Add course
                        </Button>
                    </Grid>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={hanldeCourseUpdate}
                    >
                        Update
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default MyCourses;
