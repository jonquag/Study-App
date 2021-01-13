import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles({
    headerStyles: {
        fontSize: '36',
        // fontFamily: "Poppins",
    },
    labelStyles: {
        opacity: '50%',
        // fontFamily: "Poppins",
    },
    inputStyles: {
        fontWeight: '600',
        paddingLeft: '1em',
    },
    profileGrid: {
        marginLeft: '2em',
    },
});

const Profile2 = (props) => {
    const [firstName, setFirstName] = useState('Ashly');
    const [lastName, setLastName] = useState('Sanford');
    const [email, setEmail] = useState('usermail@gmail.com');
    const [location, setLocation] = useState('+1 (202) 555 0192');
    const [phone, setPhone] = useState('');

    const classes = useStyles();

    // Handles changed fields
    // takes input and sets it to the value of the component

    return (
        <React.Fragment>
            {/* Profile Grid Parnent Container */}
            <Grid
                container
                spacing={2}
                sm={8}
                justify='space-between'
                className={classes.profileGrid}
            >
                <Grid item sm={12}>
                    <Typography variant='h1' className={classes.headerStyles}>
                        Profile
                    </Typography>
                </Grid>
                {/* First Name  */}
                <Grid item xs={12} sm={6}>
                    <FormHelperText variant='h6'>First Name</FormHelperText>{' '}
                    <TextField
                        variant='outlined'
                        hintText='Change First Name..'
                        onChange={(e) => setFirstName(e.target.value)}
                        // setState({...state, name: "newName"})
                        defaultValue={firstName}
                        className={classes.inputStyles}
                    />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' className={classes.labelStyles}>
                        Last Name
                    </Typography>{' '}
                    <TextField
                        variant='outlined'
                        hintText='Change Last Name..'
                        onChange={(e) => setLastName(e.target.value)}
                        defaultValue={lastName}
                        className={classes.inputStyles}
                    />
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' className={classes.labelStyles}>
                        Email address
                    </Typography>{' '}
                    <TextField
                        variant='outlined'
                        hintText='Change Email...'
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                        className={classes.inputStyles}
                    />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' className={classes.labelStyles}>
                        Phone
                    </Typography>{' '}
                    <TextField
                        variant='outlined'
                        hintText='Change Phone Number...'
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={phone}
                        className={classes.inputStyles}
                    />
                </Grid>
                {/* Location */}
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' className={classes.labelStyles}>
                        Location
                    </Typography>{' '}
                    <TextField
                        variant='outlined'
                        hintText='Change Location..'
                        onChange={(e) => setLocation(e.target.value)}
                        defaultValue={location}
                        className={classes.inputStyles}
                    />
                </Grid>
            </Grid>

            {/* Debug testing */}
            <div>Debug:</div>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            <div>Location: {location}</div>
            <div>Phone Number: {phone}</div>
            <div>University: {email}</div>
        </React.Fragment>
    );
};

export default Profile2;
