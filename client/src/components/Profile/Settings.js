import React from 'react';
import { Grid, Typography, FormHelperText, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField as MikTextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import * as actions from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';
import handleAuthErrors from '../../utils/handleAuthErrors';

export const useStyles = makeStyles(theme => ({
    settings: {
        margin: theme.spacing(8, 2, 2, 11),
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            margin: theme.spacing(0, 0, 2, 0),
        },
    },
    header: {
        marginBottom: theme.spacing(4),
    },
    form: {
        '& div': {
            width: '100%',
            maxWidth: 350,
        },
        '& input': {
            backgroundColor: theme.palette.common.white,
        },
        '& button': {
            width: '100%',
        },
    },
    helper_text: {
        fontSize: '1rem',
        margin: theme.spacing(2.5, 0, 0.5, 0),
    },
    button: {
        marginTop: theme.spacing(4),
    },
}));

const SignupSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'Passwords must match'
    ),
});

const ProfileSettings = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch } = useGlobalContext();

    return (
        <Grid container justify="center">
            <Grid item container direction="column" className={classes.settings}>
                <Typography variant="h1" className={classes.header}>
                    Account access
                </Typography>
                <Typography variant="h5">Change password</Typography>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
                        const password = {
                            oldPassword: values.oldPassword,
                            newPassword: values.newPassword,
                        };
                        actions
                            .updatePassword(password)(dispatch)
                            .then(res => {
                                if (res.status === 200) {
                                    enqueueSnackbar('Updated successfully', {
                                        variant: 'success',
                                        autoHideDuration: '5000',
                                    });
                                    setTimeout(() => {
                                        resetForm();
                                    }, 500);
                                } else if (res.status === 500) {
                                    enqueueSnackbar('Server Error', {
                                        variant: 'Error',
                                        autoHideDuration: '5000',
                                    });
                                } else {
                                    handleAuthErrors(res, setErrors);
                                }
                            });
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting, errors }) => (
                        <Form className={classes.form}>
                            <FormHelperText className={classes.helper_text}>
                                Your current password
                            </FormHelperText>
                            <Field
                                component={MikTextField}
                                name="oldPassword"
                                type="password"
                                variant="outlined"
                            />
                            <FormHelperText className={classes.helper_text}>
                                New password
                            </FormHelperText>
                            <Field
                                component={MikTextField}
                                name="newPassword"
                                type="password"
                                variant="outlined"
                            />
                            <FormHelperText className={classes.helper_text}>
                                Confirm password
                            </FormHelperText>
                            <Field
                                component={MikTextField}
                                name="confirmPassword"
                                type="password"
                                variant="outlined"
                            />
                            <Grid item>
                                <Button
                                    color="primary"
                                    className={classes.button}
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default ProfileSettings;
