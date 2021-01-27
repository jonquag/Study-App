import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroupCard from '../../components/Group/GroupCard';
import axios from 'axios';
import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      border: 'solid',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    hozirontalCardGrid: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
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
        dispatch({type: 'joinGroup', payload: res.data});
      } catch (err) {
        console.log(err);
      }
    }

    const handleLeaveGroup = async (id) => {
      try {
        const res = await axios.delete(`/user/groups/${id}`, {groupId: id});
        dispatch({type: 'leaveGroup', payload: res.data});
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
}

export default Groups;