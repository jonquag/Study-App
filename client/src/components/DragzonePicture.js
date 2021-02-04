import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Avatar, Tooltip, Box } from '@material-ui/core';
import {
    baseStyle,
    activeStyle,
    acceptStyle,
    rejectStyle,
    useStyles,
} from './DragzonePicture.styles';
import { useGlobalContext } from '../context/studyappContext';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ProfilePic = () => {
    const classes = useStyles();
    const [uploading, setUploading] = useState(false);
    const { profile, dispatch } = useGlobalContext();

    const onDrop = useCallback(
        async droppedFiles => {
            if (droppedFiles.length) {
                setUploading(true);
                updateProfilePicture(droppedFiles[0])
            }
        }
    );

    useEffect(() => {
        setUploading(false);
    }, [profile]);

    const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: 'image/*',
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    const onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setUploading(true);
        const file = event.target.files[0];
        if(file) {
            updateProfilePicture(file)
        }
    }

    const updateProfilePicture = async (file) => {
        const form = new FormData();
        form.append('image', file);
        const res = await axios
            .post('/upload', form)
            .catch(err => console.log(err));

        if (res && res.data) {
            dispatch({ type: 'updateProfile', payload: res.data });
        }
    }

    return (
        <Box className={classes.container} >
            <label htmlFor="fileUpload">           
            <Tooltip title="Drag and drop profile picture or click to upload" arrow placement="right">
                <Box {...getRootProps({ style })}>
                    {profile.imageUrl ? (
                        <Avatar
                            alt="Profile Pic"
                            src={profile.imageUrl}
                            className={uploading ? classes.uploading : classes.large}
                        />
                    ) : (
                        <Avatar className={classes.large}>
                            <PersonAddIcon className={classes.large} />
                        </Avatar>
                    )}
                </Box>
            </Tooltip>
            </label>
            <input hidden type="file" accept="image/*" multiple={false} id="fileUpload" onChange={onChangeFile} />
        </Box>
    );
};

export default ProfilePic;
