import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { groups } from '../../data/mockData.js'
import Navbar from '../layout/Navbar';
import GroupCard from '../../components/Group/GroupCard';
import axios from 'axios';

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

     // fetch all the users courses
     const fetchUserCourses = async () => {
      try {
          const response = await axios.get('/user/courses');

          setCourses(response.data);

      } catch (err) {
          console.log(err);
      }
  };

  useEffect(() => {
    fetchUserCourses();
  }, []);

    const body = (
      <div style={modalStyle} className={classes.paper}>
      <h2>Create a new group</h2>
      <p>
        Add group name and select your course.
        {
          courses.map(course => {
            return <p>{course.name} </p>
          })
        }
      </p>
    </div>
    );

    const handleOpen = () => {
      setOpen(true)
    };

    const handleClose = () => {
      setOpen(false);
    };

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