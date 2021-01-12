import React, { useState } from 'react';
import {
    Grid,
    Typography,
    TextField,
    FormHelperText,
    Paper,
    Link,
    Button,
    Select,
    MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../../images/logo.png';
import { useStyles } from './Styles';
import { schools, courses } from '../../data/mockData';

const Signup = () => {
    const classes = useStyles();
    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid
                    item
                    container
                    md={6}
                    direction="column"
                    justify="flex-start"
                    className={classes.formContainer}
                >
                    <Grid className={classes.logo}>
                        <img src={logo} alt="logo"></img>
                    </Grid>
                    <Typography variant="h1" color="textPrimary">
                        Create an account.
                    </Typography>
                    <form className={classes.form}>
                        {/* <FormHelperText>Name</FormHelperText>
                        <TextField
                            variant="outlined"
                            className={classes.textInput}
                        /> */}
                        <FormHelperText>Email address</FormHelperText>
                        <TextField
                            variant="outlined"
                            className={classes.textInput}
                        />
                        <FormHelperText>Password</FormHelperText>
                        <TextField
                            variant="outlined"
                            type="password"
                            className={classes.textInput}
                        />
                        <FormHelperText>Select your school</FormHelperText>
                        <Select
                            value={school}
                            variant="outlined"
                            onChange={e => setSchool(e.target.value)}
                        >
                            {schools.map(school => {
                                return (
                                    <MenuItem
                                        key={school.id}
                                        value={school.name}
                                    >
                                        {school.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>

                        {/* TODO: courses needs to be based on selected school */}
                        <FormHelperText>Select the course</FormHelperText>
                        <Select
                            value={course}
                            variant="outlined"
                            onChange={e => setCourse(e.target.value)}
                        >
                            {courses.map(course => {
                                return (
                                    <MenuItem
                                        key={course.id}
                                        value={course.name}
                                    >
                                        {course.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <Grid style={{ marginTop: 8 }}>
                            <Button color="primary" startIcon={<AddIcon />}>
                                Add course
                            </Button>
                        </Grid>
                        <Button variant="contained" className={classes.button}>
                            Continue
                        </Button>
                    </form>
                </Grid>
                <Grid item md={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.dark_overlay}>
                            <Link
                                color="inherit"
                                variant="inherit"
                                underline="none"
                                component={RouterLink}
                                to="/login"
                            >
                                <Button variant="outlined">Login</Button>
                            </Link>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Signup;
