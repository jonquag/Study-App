import React, { useState } from 'react';
import { Grid, Typography, Badge, Divider, Avatar, Button } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import { chatList, courseGroupList } from '../../data/mockData';
import { useStyles } from './SidebarStyles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useGlobalContext } from '../../context/studyappContext';
import DragzonePicture from '../DragzonePicture';
import * as actions from '../../context/actions';

const Drawer = props => {
    const classes = useStyles();
    const location = useLocation();
    const { profile, dispatch } = useGlobalContext();

    const [courseList, setCourseList] = useState(
        courseGroupList.map(cgl => ({ ...cgl, expand: false }))
    );
    const [chatId, setChatId] = useState(null);
    const [courseId, setCourseId] = useState([]);

    const showGroup = id => {
        setCourseId([...courseId, id]);
        const editedCourseList = courseList.map(cl => {
            if (cl.id === id && !cl.expand) return { ...cl, expand: true };
            if (cl.id === id && cl.expand) return { ...cl, expand: false };
            else return { ...cl };
        });
        setCourseList(editedCourseList);
    };

    if (location.pathname === '/chat')
        return (
            <Grid container className={classes.list_container}>
                <Grid item className={classes.chat_head}>
                    <Typography>All Chats</Typography>
                    <Badge badgeContent={12} className={classes.badge} />
                </Grid>
                <Divider className={classes.divider} />
                {chatList.map(cg => {
                    let activeChat = null;
                    if (cg.id === chatId) {
                        activeChat = <div className={classes.active_line}></div>;
                    }
                    return (
                        <React.Fragment key={cg.id}>
                            <Grid
                                item
                                container
                                className={
                                    cg.id === chatId
                                        ? classes.chat_list_active
                                        : classes.chat_list
                                }
                                onClick={() => setChatId(cg.id)}
                            >
                                {activeChat}
                                <Grid item className={classes.avatar_container}>
                                    <Avatar
                                        alt="chat_group_img"
                                        src={cg.imgUrl}
                                        variant="rounded"
                                        className={classes.avatar}
                                    />
                                </Grid>
                                <Grid item container className={classes.group_member}>
                                    <Typography className={classes.group_name}>
                                        {cg.chatGroup}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {cg.members} members
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />
                        </React.Fragment>
                    );
                })}
            </Grid>
        );

    if (location.pathname === '/forum')
        return (
            <Grid>
                <Grid item className={classes.chat_head}>
                    <Typography>My Courses</Typography>
                    <Badge badgeContent={3} className={classes.badge} />
                </Grid>
                <Grid item className={classes.accordion}>
                    {courseList.map(cgl => {
                        let groupList = null;
                        const isIdThere = courseId.some(id => cgl.id === id);
                        if (cgl.expand && isIdThere)
                            groupList = cgl.groups.map(group => {
                                return (
                                    <Typography
                                        key={group.id}
                                        className={classes.group_list}
                                        onClick={() => console.log(`${group.name} forum`)}
                                    >
                                        {group.name}
                                    </Typography>
                                );
                            });
                        return (
                            <div key={cgl.id} className={classes.accordion_container}>
                                <Grid className={classes.course_name}>
                                    <Typography>{cgl.name}</Typography>
                                    <Button onClick={() => showGroup(cgl.id)}>
                                        {cgl.expand && isIdThere ? (
                                            <RemoveIcon className={classes.icons} />
                                        ) : (
                                            <AddIcon className={classes.icons} />
                                        )}
                                    </Button>
                                </Grid>
                                <div>{groupList}</div>
                            </div>
                        );
                    })}
                </Grid>
            </Grid>
        );

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
            item
            className={classes.drawer}
        >
            {/* Profile briefing container */}
            <Grid
                container
                item
                direction="column"
                alignItems="center"
                style={{ marginTop: '3em' }}
            >
                <DragzonePicture className={classes.profilePic} />

                <Typography className={classes.profileName} align="center">
                    {profile.firstName + ' ' + profile.lastName}
                </Typography>
            </Grid>

            {/* Profile Links container */}
            <Grid container item direction="column" className={classes.linkContainer}>
                <NavLink
                    to="/profile"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    User Info
                </NavLink>
                <NavLink
                    to="/profile/courses"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    My Courses
                </NavLink>
                <NavLink
                    to="/profile/settings"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    Settings
                </NavLink>
                <NavLink
                    to="/profile/notifications"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    Notifications
                </NavLink>
            </Grid>
            <Grid container item>
                <Grid item>
                    <Button
                        className={classes.button}
                        onClick={() => actions.logout()(dispatch)}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Grid>

        //  Container for Profile Summary
    );
};

export default Drawer;
