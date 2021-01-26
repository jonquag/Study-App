import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button, Modal, FormHelperText, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { groups } from '../../data/mockData.js'
import Navbar from '../layout/Navbar';
import GroupCard from '../../components/Group/GroupCard';
import axios from 'axios';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    button: {
      color: '#FFF',
      background: theme.palette.primary.gradient,
      marginTop: "60px",
      marginRight: "60px",
      textTransform: 'none',
      height: '3rem',
  },
    paper: {
      position: 'fixed',
      width: 475,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    
  }));

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const Groups = () => {

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [openModal, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [courseId, setCourseId] = useState('');

     // fetch all the users courses
     const fetchUserCourses = async () => {
      try {
          const courseResponse = await axios.get('/user/courses');

          setCourses(courseResponse.data);

      } catch (err) {
          console.log(err);
      }
  };

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUserCourses();
  }, []);

    const body = (
      <div style={modalStyle} className={classes.paper}>
      <h2>Create a new group</h2>
      <p>
        Add group name and select your course.
      </p>
        <Formik initialValues={{ course: '' }}>
        
        <Form className={classes.form}>
        <FormHelperText>Add a new group name</FormHelperText>
        <Field
          component={TextField}
          name="group_name"
          type="text"
          variant="outlined"
          defaultValue=""
          fullWidth="true"
          onChange={(e) => setGroupName(e.target.value)}
        >
        </Field>
        <FormHelperText>Course</FormHelperText>
        <Field
        component={TextField}
        name="course"
        type="text"
        select
        variant="outlined"
        defaultValue=""
        fullWidth="true"
        >
        { 
        courses.map(course => {
          return (
            <MenuItem
                key={course._id}
                value={course._id}
                onChange={() => setCourseId(course._id)}
                >
                {course.name}
            </MenuItem>
          );
        })}
        </Field>
        <Button
          className={classes.button}
          style={{marginTop: "20px"}}
        >
          Create New Group
        </Button>                    
        </Form>     
        </Formik>             
    </div>
    );

    return (
        <Grid>
        <Navbar />
        <Grid container>
          <Grid 
          item
          direction="row"
          container
          md={4} >
          </Grid>
          <Grid 
          item
          justify="center"
          direction="row"
          container
          md={4}>
            <Typography variant="h1" color="textPrimary" style={{ paddingTop: "60px"}}>
                Sugggested For You.
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ paddingTop: "20px"}}>
                Groups you might be interested in!
            </Typography>
          </Grid>
          <Grid 
          item
          justify="flex-end"
          direction="row"
          container
          md={4}>
            <Button
              className={classes.button}
              onClick={handleOpen}
              >
              Create New Group
            </Button>
            <Modal
              open={openModal}
              onClose={handleClose}
              >
              {body}
          </Modal>
          </Grid>       
        </Grid>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {groups.map((card) => (
              <GroupCard key={card.id} data={card} />
            ))}
          </Grid>
        </Container>
        </Grid>
    );
}

export default Groups;