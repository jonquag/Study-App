import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    headerStyles: {
        fontSize: '36',
        fontFamily: "Poppins",
    },
    labelStyles: {
        opacity: '50%',
        fontFamily: "Poppins",
    },
    inputStyles: {
        fontWeight: '600',
        paddingLeft: '1em',
    },
    profileGrid: {
        marginLeft: '2em',
    }

});

const Profile2 = () => {
    const state = {
        firstName: 'Ashly',
        lastName: 'Sanford',
        location: '',
        phone: '+1 (202) 555 0192',
        email: '',
        courses: [],
    };

    const classes = useStyles();

    // Handles changed fields
    // takes input and sets it to the value of the component
    const handleChange = (input) => (e) => {
        e.preventDefault();
        if (!input) return;
        // this.setState({ [input]: e.target.value });
    };

    return (
        <MuiThemeProvider>
                <React.Fragment>
                    {/* First Name  */}
                    <Grid container spacing={4} className={classes.profileGrid}>
                        <Grid item sm={12}>
                            <Typography variant='h5' className={classes.headerStyles}>Profile</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant='h6' className={classes.labelStyles}>First Name</Typography>{' '}
                            <TextField
                                hintText='Change First Name..'
                                onChange={handleChange('firstName')}
                                defaultValue={state.firstName}
                                className={classes.inputStyles}
                            />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant='h6' className={classes.labelStyles}>Last Name</Typography>{' '}
                            <TextField
                                hintText='Change Last Name..'
                                onChange={handleChange('lastName')}
                                defaultValue={state.lastName}
                                className={classes.inputStyles}
                            />
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant='h6' className={classes.labelStyles}>Email address</Typography>{' '}
                            <TextField
                                hintText='Change Email...'
                                labelText='Email'
                                onChange={handleChange('university')}
                                defaultValue={state.university}
                                className={classes.inputStyles}
                            />
                        </Grid>

                        {/* Location */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant='h6' className={classes.labelStyles}>Location</Typography>{' '}
                            <TextField
                                hintText='Change Location..'
                                onChange={handleChange('location')}
                                defaultValue={state.location}
                                className={classes.inputStyles}
                            />
                        </Grid>
                        {/* Phone */}
                        <Grid item  xs={12} sm={6}>
                            <Typography variant='h6' className={classes.labelStyles}>Phone</Typography>{' '}
                            <TextField
                                hintText='Change Phone Number...'
                                onChange={handleChange('phone')}
                                defaultValue={state.phone}
                                className={classes.inputStyles}
                            />
                        </Grid>

                    </Grid>
                
                    <Button variant='contained'>Submit</Button>

                    {/* Debug testing */}
                    <div>Debug:</div>
                    <div>First Name: {state.firstName}</div>
                    <div>Last Name: {state.lastName}</div>
                    <div>Location: {state.location}</div>
                    <div>Phone Number: {state.phone}</div>
                    <div>University: {state.university}</div>
                </React.Fragment>
            </MuiThemeProvider>
    )
}

export default Profile2
