import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroupCard from '../../components/Group/GroupCard';
import axios from 'axios';
import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  }));

const Groups = () => {
    const classes = useStyles();
    const {userGroups, dispatch} = useGlobalContext();
    const {groups, courseGroups} = userGroups;
    const [suggestedGroups, setSuggestedGroups] = React.useState([]);

    //filter out courses which the user has joined as suggestions
    React.useEffect(() => {
      const suggested = courseGroups.filter((group) => {
        return !groups.some((joinedGroup) => {
          return joinedGroup._id === group._id;
        });
      });
      setSuggestedGroups(suggested)
    }, [courseGroups, userGroups, groups]);

    const handleJoinGroup = async (id) => {
      try {
        const res = await axios.post(`/user/groups/${id}`, {groupId: id});
        const currGroups = [...groups, res.data];
        const newUserGroups = {courseGroups: [...courseGroups], groups: currGroups};
        dispatch({type: 'updateUserGroups', payload: newUserGroups});
      } catch (err) {
        console.log(err);
      }
    }

    const handleLeaveGroup = async (id) => {
      try {
        const res = await axios.delete(`/user/groups/${id}`, {groupId: id});
        const [currentGroups, updatedCourseGroups] = [[...groups], [...userGroups.courseGroups]];
        const myGroups = currentGroups.filter((group) => group._id !== res.data._id);
        const index = updatedCourseGroups.findIndex(group => group._id === res.data._id);
        updatedCourseGroups[index] = res.data;
        const newUserGroups = {courseGroups: updatedCourseGroups, groups: myGroups}
        dispatch({type: 'updateUserGroups', payload: newUserGroups});
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <Grid>
          {groups.length &&
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
                  {groups.map((card) => (
                    <GroupCard 
                    key={card._id}
                    actionText="Leave Group"
                    data={card} 
                    handleCardPress={handleLeaveGroup}
                    />
                  ))}
                </Grid>
              </Container>
              </>
          }
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
                    key={card._id}
                    actionText="Join Group"
                    data={card} 
                    handleCardPress={handleJoinGroup}
                    />
                  ))}
                </Grid>
              </Container>
            </>
          }
        </Grid>
    );
};

export default Groups;
