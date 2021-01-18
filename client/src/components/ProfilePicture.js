import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import {
    Avatar,
    Tooltip,
    Box
} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import defaultImage from "../images/sign-up.png"

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
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

const baseStyle = {
  borderWidth: 2,
  borderRadius: 65,
  borderColor: '#eeeeee',
  borderStyle: 'solid',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const ProfilePic = ({url}) => {
    const classes = useStyles();

    const onDrop = useCallback(async (droppedFiles) => {
      if (droppedFiles.length) {
        console.log(droppedFiles[0])
        const form = new FormData()
        form.append("image", droppedFiles[0]);
        console.log(form);
        const url = await axios.post('/upload', {image: form}).catch((err) => console.log(err));
        //Todo add url to profile in context
      }
    }, [])

    const {
      getRootProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({onDrop, maxFiles: 1, accept: 'image/*'});
  
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);
  

    return (
          <Box
          className={classes.container}
          >
            <Tooltip
            title="Drag and drop profile picture"
            arrow placement="right"
            >
            <Box
            {...getRootProps({style})}
              className={classes.image_container}
            >
                <Avatar alt="Profile Pic" src={url || defaultImage} className={classes.large}/>
            </Box>
            </Tooltip>
          </Box>  
    )
}

export default ProfilePic;
