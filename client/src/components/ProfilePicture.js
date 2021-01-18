import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone'
import {
    Avatar,
    Typography,
    Tooltip,
    Box
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import defaultImage from "../images/sign-up.png"

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    border: 'solid',
    backgroundColor: '#f9f9fc'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: 130,
    height: 130
  },
  image_container: {
      border: 'solid',
      borderRadius: 65,
      borderColor: 'transparent',
  },
  name_text: {
    padding: theme.spacing(3),
    fontSize: '22px',
    letterSpacing: '-1px',
    color: '#000000',
    fontWeight: 500,
    fontFamily: "Poppins",
    textAlign: 'center',
  }
}));


const ProfilePic = ({name}) => {
    const classes = useStyles();
    const {getRootProps, getInputProps} = useDropzone({accept: 'image/*'});
    const DragDropTip = withStyles({
        tooltip: {
          fontSize: '1rem'
        }
    })(Tooltip);

    return (
        <Box 
        className={classes.container}
        >
            <Tooltip
            title="Drag and Drop Profile Picture"
            arrow placement="right"
            >
            <Box
              className={classes.image_container}
              {...getRootProps({borderColor: 'transparent'})}
            >
                <input {...getInputProps()} />
                <Avatar alt="Profile Pic" src={defaultImage} className={classes.large}/>
            </Box>
            </Tooltip>
            <Typography className={classes.name_text}>{name}</Typography>
        </Box>
    )
}

export default ProfilePic;
