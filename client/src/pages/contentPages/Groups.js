import React, { useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Container } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {groups} from '../../data/mockData.js'
import Navbar from '../layout/Navbar';

const useStyles = makeStyles(theme => ({

    content_page: {
        backgroundColor: theme.palette.common.grey,
        marginTop: 50,
        
    },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      items: {

      },
      media: {
        height: 200,
      }

}));

const Groups = () => {

    const classes = useStyles();
    
    const items = groups.map((group) => {
        return (<Grid item key={group.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={group.image}
          title={group.title}
        />
            <CardContent>
                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 600 }}>
                {group.title}
                </Typography>
                <Grid container direction="row" style={{ paddingTop: "5px"}}>
                    <PeopleAltOutlinedIcon color="disabled" fontSize="small" className={classes.icon} />
                    <Typography variant="p" color="textSecondary" style={{ paddingLeft: "5px"}} >
                    {group.members} members
                    </Typography>
                </Grid>
                
            </CardContent>
            </Card>
        </Grid>)
    })

    return (
        <Grid>
            <Navbar />
            <Grid container className={classes.content_page} >
                <Grid 
                item
                justify="center"
                direction="row"
                container
                sm={12} >
                     <Typography variant="h1" color="textPrimary">
                        Sugggested For You
                    </Typography>
                </Grid>
                <Grid 
                item
                justify="center"
                direction="row"
                container
                sm={12}>
                     <Typography variant="h6" color="textPrimary">
                        Groups you might be interested in!
                    </Typography>
                </Grid>

                
                
        
            </Grid>

            <Container className={classes.cardGrid} maxWidth="md">
            <Grid 
            container
            spacing={4}
            direction="row">
                {
                items
                }
            </Grid>

            </Container>
            
        </Grid>
    );
};

export default Groups;


