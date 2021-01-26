import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroupCard from '../../components/Group/GroupCard';
//import axios from 'axios';
import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }
    
  }));

const Groups = () => {
    const classes = useStyles();
    const {userCourse, dispatch} = useGlobalContext();
    const {userGroups, courseGroups} = userCourse;

    const [suggestedGroups, setSuggestedGroups] = React.useState([]);
    const [joinedGroups, setJoinedGroups] = React.useState([...userGroups]);

    //filter out courses which the user has joined as suggestions
    React.useEffect(() => {
      const suggested = courseGroups.filter((group) => {
        return !joinedGroups.some((joinedGroup) => {
          return joinedGroup._id === group._id;
        });
      });
      setSuggestedGroups(suggested)
    }, [courseGroups, userGroups, joinedGroups]);

    const handleJoinGroup = async (id) => {
      const joinedGroup = courseGroups.find(group => group._id === id);
      joinedGroups.push({...joinedGroup});
      setJoinedGroups([...joinedGroups]);
    }

    const handleLeaveGroup = async (id) => {
      const newJoined = joinedGroups.filter((group) => group._id !== id);
      setJoinedGroups(newJoined);
    }

    return (
        <Grid>
          {suggestedGroups.length &&
            <>
              <Grid container >
                  <Grid 
                  item
                  justify="center"
                  direction="row"
                  container
                  sm={12} >
                      <Typography variant="h1" color="textPrimary" style={{ paddingTop: "60px"}}>
                          Sugggested For You.
                      </Typography>
                  </Grid>
                  <Grid 
                  item
                  justify="center"
                  direction="row"
                  container
                  sm={12}>
                      <Typography variant="h6" color="textSecondary" style={{ paddingTop: "20px"}}>
                          Groups you might be interested in!
                      </Typography>
                  </Grid>
              </Grid>

              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                  {suggestedGroups.map((card) => (
                    <GroupCard 
                    key={card.id}
                    actionText="Join Group"
                    data={card} 
                    handleCardPress={handleJoinGroup}
                    />
                  ))}
                </Grid>
              </Container>
            </>
          }
        {joinedGroups.length &&
        <>
          <Grid container >
            <Grid 
            item
            justify="center"
            direction="row"
            container
            sm={12} >
                 <Typography variant="h1" color="textPrimary" style={{ paddingTop: "60px"}}>
                   Your Groups
                </Typography>
            </Grid>
          </Grid>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {joinedGroups.map((card) => (
                <GroupCard 
                key={card.id}
                actionText="Leave Group"
                data={card} 
                handleCardPress={handleLeaveGroup}
                />
              ))}
            </Grid>
          </Container>
          </>
        }
        </Grid>
    );
}

export default Groups;