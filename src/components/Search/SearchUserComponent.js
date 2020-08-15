import React, { Fragment } from 'react';
// components
import { ListItem, ListItemText, List, makeStyles, MenuList, Divider, Typography } from '@material-ui/core';
import CustomizedInputBase from './CustomizedInputBase';
//api
import { findUserApi } from '../../api/services/findUsersApi';
// styles
import { grey } from '@material-ui/core/colors';
import { textsGrey } from '../../styles/colors';
import { GroupContext } from '../../pages/GroupPage/GroupPage';

const useStyles = makeStyles(theme => ({
    overlay: {
        width: '100%',
        minHeight: '100%',
        height: 100,
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        left: 0,
        top: 0,
        zIndex: 1,
        position: 'fixed',
        overflowY: 'auto'
    },
    popper: {
        zIndex: 2,
        position: 'absolute'
    },
    searchItemWrapper: {
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: grey[50],
          },
    },
    listItemName: {
            color: textsGrey,
    },
    listItemUsername: {
        color: grey[600],
        fontSize:'10pt',
    },
    fullList: {
        width: '100%',
    },
  }));
  
const SearchUserComponent = ({onClick}) => {

    const classes = useStyles(makeStyles);

    const context = React.useContext(GroupContext);

    // Locally filtered users
    const [result, setResult] = React.useState(null);
    // Result with users from the BE
    const [list, setList] = React.useState(null);

    const [open, setOpen] = React.useState(false);

   /**
    * List with the find values
    */
    const userList = () => (
        result && 
        <div
            role="presentation"
        >
        <List>
            <ListItem className={classes.searchItemWrapper} button key="result_id">
                <ListItemText primary={
                    <Typography className={classes.listItemUsername}>
                       {result.length? "Search results" : "No user found .." }
                    </Typography>
                } />
            </ListItem>
            <Divider/>
            {result.map((user, index) => (
            <Fragment  key={index}>
                <ListItem 
                        className={classes.searchItemWrapper} 
                        button 
                        key={user.id} 
                        onClick={() => onSelectUserHandler(user)}>
                    <ListItemText primary={
                        <Typography className={classes.listItemName}>
                             {user.firstName}&nbsp;{user.lastName}
                        </Typography>
                    } />
                    <ListItemText primary={
                        <Typography className={classes.listItemUsername}>
                            {user.email}
                        </Typography>
                    } />
                    <Typography className={classes.listItemUsername}>
                        {user.username}
                    </Typography>
                </ListItem>
            <Divider />
            </Fragment>
            ))}
        </List>
        </div>
    );

    const onSelectUserHandler = (user) => {
        setOpen(false);
        onClick(user.id);
    }

    /**
     * Updates results list on onChange handler
     * @param {*} event 
     */
    const updateResult = (event) => {
        const value = event.target.value;

        if(list === null && value.length < 2) {
            setOpen(true);
            return;
        }

        if(list === null) {
            getServerResponse(value);
            return;
        }
       
        if(value === '') {
            setOpen(false);
            resetResult();
            return;
        }

        setResult(findUsers(value))
    }

    /**
     * Update the result list on onPaste handler
     * @param {*} event 
     */
    const updateOnPaste = (event) => {
        resetResult();
        const value = event.target.value;
        getServerResponse(value, context.gr);
    }

    /**
     * Search in the local list
     * @param {*} value the string value to search for
     */
    const findUsers = (value) => {

        const clone = Object.assign(list);

        const res = clone.filter(user => {
            let searchString = (user.firstName + user.lastName + user.email).toLowerCase();
            searchString = searchString.replace(/\s+/g, '');
            const trimmedValue = value.toLowerCase().replace(/\s+/g, '');
            
            if(searchString.search(trimmedValue) > -1) {
                return true;
            }
            return false;
        } )

        setOpen(true);
        return res;
    }

    /**
     * Get result from BE
     * @param {*} value searched value
     */
    const getServerResponse = async (value) => {
        const response = await findUserApi.findUser(value, context.group.id);
        if(response.error){
            //setError(SERVER_ERROR);
        } else {
            setList(response);
            setResult(response);
        }
    }
 
    /**
     * resets result list
     */
    const resetResult = () => {
        setList(null);
        setResult(null);
    }

    const render = () => {
        return (
           
            <div className={classes.wrapper}>
                <CustomizedInputBase 
                    className={classes.input} 
                    id="test1" onPaste={(event) => updateOnPaste(event)} 
                    onChange={(event) => updateResult(event)} 
                    onFocus={() => setOpen(true)}
                />

                { renderSearchList()  }
                
            </div>
        )
    }

    const renderSearchList = () => {
        if(open && result) {
            return (
                <Fragment>
                    <MenuList className={classes.popper}> 
                        {userList()}
                    </MenuList>
                    <div 
                        onClick={() => setOpen(false)} 
                        className={classes.overlay}></div>
                </Fragment>
            )
        }
    }


    return (
        render()
    );
}

export default SearchUserComponent;
