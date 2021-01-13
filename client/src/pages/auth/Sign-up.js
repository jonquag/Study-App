import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    FormHelperText,
    Paper,
    Link,
    Button,
    Select,
    MenuItem,
    Hidden,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { TextField as MikTextField } from 'formik-material-ui';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../images/logo.png';
import { useStyles } from './Styles';
import { schools, courses } from '../../data/mockData';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Required'),
});

const Signup = () => {
    const classes = useStyles();
    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [schoolCourses, setSchoolCourses] = useState(courses);
    // const [addedCourses, setAddedCourses] = useState([]);

    // const addCourse = () => {
    //     const newCourses = [...addedCourses];
    //     newCourses.push(course);
    //     setAddedCourses(newCourses);
    //     setSchoolCourses(schoolCourses.filter(sc => sc.name !== course));
    // };

    useEffect(() => {
        if (school) {
            let filteredCourses = [];
            schools.forEach(sch => {
                if (sch.name === school) return (filteredCourses = [...sch.courses]);
            });

            setSchoolCourses(filteredCourses);
        }
    }, [school]);

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
                    <div className={classes.logoContainer}>
                        <div className={classes.logo}>
                            <img src={logo} alt="logo"></img>
                        </div>
                        <Hidden mdUp>
                            <Link
                                color="inherit"
                                variant="inherit"
                                underline="none"
                                component={RouterLink}
                                to="/login"
                            >
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    style={{ marginTop: 0 }}
                                >
                                    login
                                </Button>
                            </Link>
                        </Hidden>
                    </div>
                    <Typography variant="h1" color="textPrimary">
                        Create an account.
                    </Typography>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            schoolSelect: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log('values: ', values);
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form className={classes.form}>
                                <FormHelperText>Email address</FormHelperText>
                                <Field
                                    component={MikTextField}
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                />
                                <FormHelperText required>Password</FormHelperText>
                                <Field
                                    component={MikTextField}
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                />
                                <FormHelperText>Select your school</FormHelperText>
                                <Select
                                    value={school}
                                    variant="outlined"
                                    onChange={e => setSchool(e.target.value)}
                                >
                                    {schools.map(school => {
                                        return (
                                            <MenuItem key={school.id} value={school.name}>
                                                {school.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>

                                <FormHelperText>Select the course</FormHelperText>
                                <Select
                                    value={course}
                                    variant="outlined"
                                    onChange={e => setCourse(e.target.value)}
                                >
                                    <MenuItem value="Select">
                                        <em>None</em>
                                    </MenuItem>
                                    {schoolCourses.map(course => {
                                        return (
                                            <MenuItem key={course.id} value={course.name}>
                                                {course.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <Grid style={{ marginTop: 8 }}>
                                    <Button
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        // onClick={addCourse}
                                    >
                                        Add course
                                    </Button>
                                </Grid>

                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Sign up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
                <Grid item md={6}>
                    <Hidden smDown>
                        <Paper className={classes.paper}>
                            <div className={classes.dark_overlay}>
                                <Link
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    component={RouterLink}
                                    to="/sign-up"
                                >
                                    <Button variant="outlined">Get started</Button>
                                </Link>
                            </div>
                        </Paper>
                    </Hidden>
                </Grid>
            </Grid>
        </div>
    );
};

export default Signup;
