import React from 'react';
import {
    Grid,
    Typography,
    FormHelperText,
    Paper,
    Link,
    Button,
    Hidden,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField as MikTextField } from 'formik-material-ui';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import logo from '../../images/logo.png';
import { useStyles } from './Styles';
import handleAuthErrors from '../../utils/handleAuthErrors';
import { useGlobalContext } from '../../context/studyappContext';
import * as actions from '../../context/actions';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const Login = props => {
    const classes = useStyles();
    const { isAuth, dispatch } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const locState = props.location.state;
    let redirectPath = '/profile';

    //locState only exists if redirected from ProtectedRoute
    if (locState && locState.from) redirectPath = locState.from.pathname;

    if (isAuth) return <Redirect to={redirectPath} />;

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Grid
                    item
                    container
                    md={6}
                    direction="column"
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
                                to="/sign-up"
                            >
                                <Button
                                    variant="text"
                                    color="primary"
                                    style={{ marginTop: 0 }}
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </Hidden>
                    </div>
                    <Typography variant="h1" color="textPrimary">
                        Login.
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            actions
                                .login(values)(dispatch)
                                .then(res => {
                                    if (res.status === 200) {
                                        enqueueSnackbar('Logged in successfully', {
                                            variant: 'success',
                                            autoHideDuration: '5000',
                                        });
                                    } else if (res.status === 500) {
                                        setTimeout(() => {
                                            setSubmitting(false);
                                        }, 500);
                                        enqueueSnackbar('Server Error', {
                                            variant: 'Error',
                                            autoHideDuration: '5000',
                                        });
                                    } else {
                                        console.log(res);
                                        setTimeout(() => {
                                            setSubmitting(false);
                                        }, 500);
                                        handleAuthErrors(res, setErrors);
                                    }
                                });
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
                                <Typography variant="body2">Forget password?</Typography>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Login
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
                                    <Button variant="outlined" color="primary">
                                        Get started
                                    </Button>
                                </Link>
                            </div>
                        </Paper>
                    </Hidden>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
