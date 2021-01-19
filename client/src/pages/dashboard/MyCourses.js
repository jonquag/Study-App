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
        padding: theme.spacing(8, 0, 0, 11),
    },
    university: {
        marginBottom: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    list_item: {
        justifyContent: 'space-between',
        maxWidth: '400px',
        padding: '0 4px 0 8px',
        '& button': {
            padding: 8,
        },
    },
    btn_group: {
        width: '15%',
        display: 'flex',
        justifyContent: 'space-between',
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
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        marginTop: theme.spacing(4),
        height: '3rem',
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
    const [selectId, setSelectId] = useState('');
    const [course, setCourse] = useState('');
    const [schoolCourses] = useState(courses);
    const [myCourses, setMyCourses] = useState(mockMyCourses);

    const addCourse = () => {
        if (selectId === '' || myCourses.some(c => c.id === selectId)) return;
        setMyCourses([...myCourses, schoolCourses.find(c => c.id === selectId)]);
        setCourse('');
        setSelectId('');
    };

    const removeCourse = id => {
        setMyCourses(myCourses.filter(c => c.id !== id));
    };

    const handleCourseUpdate = () => {
        const courses = [...myCourses].map(c => c.id);
        // axios.post('/', {courses});
    };

    return (
        <Grid container>
            <Grid item md={3} style={{ height: '100vh', backgroundColor: '#f1f1f1' }}>
                Sidebar
            </Grid>
            <Grid item container md={9} className={classes.container}>
                <Typography variant="h4" className={classes.university}>
                    {school}
                </Typography>
                <Typography variant="h5" className={classes.title}>
                    Your courses
                </Typography>
                {myCourses.length < 1 && <Typography>No course selected.</Typography>}
                {myCourses.map(c => {
                    if (c.id === course) {
                        return (
                            <ListItem key={c.id} className={classes.list_item}>
                                <Typography>{c.name}</Typography>
                                <div className={classes.btn_group}>
                                    <IconButton
                                        edge="end"
                                        onClick={() => removeCourse(c.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => setCourse('')}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                </div>
                            </ListItem>
                        );
                    }
                    return (
                        <ListItem key={c.id} className={classes.list_item}>
                            <Typography>{c.name}</Typography>
                            <IconButton edge="end" onClick={() => setCourse(c.id)}>
                                <EditOutlinedIcon />
                            </IconButton>
                        </ListItem>
                    );
                })}

                <form className={classes.form}>
                    <FormHelperText>Select course</FormHelperText>
                    <Select
                        value={selectId}
                        variant="outlined"
                        onChange={e => {
                            setSelectId(e.target.value);
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
                        onClick={handleCourseUpdate}
                    >
                        Update
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default MyCourses;
