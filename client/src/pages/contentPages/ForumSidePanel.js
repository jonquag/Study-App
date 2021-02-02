import React, { useState, useEffect } from 'react';
import { Grid, Typography, Badge, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
//import { courseGroupList } from '../../data/mockData';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    chat_head: {
        height: 120,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        '& p': {
            fontSize: '1.375rem',
        },
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(4),
        '& span': {
            width: 40,
            height: 24,
            fontSize: '0.875rem',
            background: theme.palette.primary.gradient,
        },
    },
    accordion: {
        display: 'flex',
        flexDirection: 'column',
    },
    accordion_container: {
        display: 'block',
        width: '85%',
        backgroundColor: '#e6edff',
        margin: theme.spacing(0, 5, 2, 4),
        padding: theme.spacing(2.5),
        borderRadius: 8,
    },
    course_name: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& p': {
            fontSize: '1.125rem',
        },
    },
    icons: {
        color: '#2968ff',
    },
    group_list: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginTop: 16,
    },
}));

const ForumSidePanel = ({ onGroupUpdate }) => {
    const classes = useStyles();

    const [courseList, setCourseList] = useState([]);
    const [courseId, setCourseId] = useState([]);

    const getGroups = async () => {
        try {
          const res = await axios.get('/user/groups/');
          setCourseList([...res.data].map(cgl => ({ ...cgl, expand: false })));

        } catch (err) {
          console.log(err);
        }
      }

    useEffect(() => {
        getGroups();
      }, []);
    

    const showGroup = id => {
        setCourseId([...courseId, id]);
        const editedCourseList = courseList.map(cl => {
            if (cl._id === id && !cl.expand) return { ...cl, expand: true };
            if (cl._id === id && cl.expand) return { ...cl, expand: false };
            else return { ...cl };
        });
      
        setCourseList(editedCourseList);
    };

    const handleOnClick = name => {
        console.log(name)
        onGroupUpdate(name);
    }

    return (
        <Grid>
            <Grid item className={classes.chat_head}>
                <Typography>My Courses</Typography>
                <Badge badgeContent={courseList.length} className={classes.badge} />
            </Grid>
            <Grid item className={classes.accordion}>
                {courseList.map(cgl => {
                    let groupList = null;
                    const isIdThere = courseId.some(id => cgl._id === id);
                    if (cgl.expand && isIdThere)
                        groupList = cgl.groups.map(group => {
                            return (
                                <Typography
                                    key={group._id}
                                    className={classes.group_list}
                                    onClick={() => handleOnClick(group.name)}
                                >
                                    {group.name}
                                </Typography>
                            );
                        });
                    return (
                        <div key={cgl._id} className={classes.accordion_container}>
                            <Grid className={classes.course_name}>
                                <Typography>{cgl.name}</Typography>
                                <Button onClick={() => showGroup(cgl._id)}>
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
};

export default ForumSidePanel;
