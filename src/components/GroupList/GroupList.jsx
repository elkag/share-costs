import React from 'react';
import GroupElement from './GroupElement';
import { makeStyles, Tabs, Tab, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    
    wrapper: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: grey[900],
        fontSize: '10pt',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
    },
    content: {
         width: '100%',
         maxWidth: '600px',
         alignItems: 'center',
    },
   
    label: {
        cursor: 'pointer',
    }
  }
  ));

const GroupList = ({groups}) => {

    const filterTypes = ['ALL', 'ACTIVE', 'CLOSED']
    const classes = useStyles(makeStyles);

    const [filter, setFilter] = React.useState(0);

    const handleChange = (event, filterId) => {
        setFilter(filterId);
    }
    const renderGroups = () => {
       
        const selectedGroups = getSelectedGroups();
        return selectedGroups && selectedGroups.map((group, index) => {
          return (
                <GroupElement key={index} group={group} />
          )
        })
      }

    const getSelectedGroups = () => {
        
        if(!groups)
            return null;
        
            if(filter > 0) {
                return groups.filter(group => group.status.toUpperCase() === filterTypes[filter]);
            }

        return Object.assign(groups);
      }

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <Paper >
                    <Tabs 
                        value={filter}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                    >
                        <Tab label="All" />
                        <Tab label="Active" />
                        <Tab label="Closed" />
                    </Tabs>
                </Paper>
                { renderGroups() }
            </div>
        </div>
    )
}

export default GroupList;