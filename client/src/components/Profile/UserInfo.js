import React, { useState } from 'react';
import { Grid, InputLabel, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles(theme => ({
    inputStyles: {
        fontWeight: '600',
        width: 300,
    },
    labelStyles: {
        paddingBottom: '.5em',
    },
    profileGrid: {
        padding: '2em 0 0 2em',
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        height: 54,
        marginLeft: '1.2em',
        marginTop: '1em',
    },
    container: {
        margin: '3em',
    },
}));

const UserInfo = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');

    const classes = useStyles();
    const { profile } = useGlobalContext();
    console.log(profile);

    const updateProfileInfo = () => {
        console.log('update changes clicked');
    };

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid
                item
                container
                alignContent="center"
                sm={2}
                className={classes.headerContainer}
            >
                <Typography variant="h1" className={classes.header}>
                    Profile
                </Typography>
            </Grid>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid
                    item
                    container
                    sm={10}
                    alignContent="flex-start"
                    justify="flex-start"
                    spacing={4}
                >
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>
                            First Name
                        </InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change first name.."
                            defaultValue="Default Value"
                            variant="outlined"
                            value={profile.firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className={classes.inputStyles}
                        />
                    </Grid>
                    {/* Last Name */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Last Name</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change last name.."
                            variant="outlined"
                            value={profile.lastName}
                            onChange={e => setLastName(e.target.value)}
                            className={classes.inputStyles}
                        />
                    </Grid>
                    {/* Email */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Email</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change email.."
                            variant="outlined"
                            value={'hardcodedemail'}
                            onChange={e => setEmail(e.target.value)}
                            className={classes.inputStyles}
                        />
                    </Grid>

                    {/* Phone */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Phone</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change phone.."
                            variant="outlined"
                            value={profile.phone}
                            onChange={e => setPhone(e.target.value)}
                            className={classes.inputStyles}
                        />
                    </Grid>
                    {/* Location */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Location</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change location.."
                            variant="outlined"
                            value={profile.location}
                            onChange={e => setLocation(e.target.value)}
                            className={classes.inputStyles}
                        />
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Button
                                className={classes.button}
                                onClick={updateProfileInfo}
                            >
                                Submit Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default UserInfo;
