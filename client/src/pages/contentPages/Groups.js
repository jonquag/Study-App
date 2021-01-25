import React from 'react';
import { Grid, Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { groups } from '../../data/mockData.js'
import Navbar from '../layout/Navbar';
import GroupCard from '../../components/Group/GroupCard';

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
  }
    
  }));

const Groups = () => {
    const classes = useStyles();

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
                 <Button  className={classes.button}>
                      Create New Group
                 </Button>
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