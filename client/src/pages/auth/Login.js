import React from 'react';
import {
    Grid,
    Typography,
    TextField,
    FormHelperText,
    Paper,
    Link,
    Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../../images/logo.png';
import { useStyles } from './Styles';

const Login = () => {
    const classes = useStyles();

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
                        Login.
                    </Typography>
                    <form className={classes.form}>
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
                        <Typography variant="body2">
                            Forget password?
                        </Typography>
                        <Button variant="contained" className={classes.button}>
                            Login
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
                                to="/sign-up"
                            >
                                <Button variant="outlined">Get started</Button>
                            </Link>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
