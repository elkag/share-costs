import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect, useHistory } from 'react-router-dom';
import { HOME_PAGE, LOGIN_PAGE, VIEW_GROUP_PAGE } from '../../config/routes';
import StyledButton from '../../components/common/StyledButton';
import {createGroupApi} from '../../api/services/createGroupApi'
import FormLayout from '../../components/Forms/FormLayout/FormLayout';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageWrapper: {
        width: '100%',
        height: 'calc(100vh - 90px)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
    },
    formWrapper: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
    },
    columnWrapper: {
        width: '100%',
        maxWidth: 800,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    titleTF: {
        width: '100%',
        paddingBottom: '20px',
    },
    descriptioTF: {
        width: '100%',
        paddingBottom: '20px'
    },
}));

const CreateGroupPage = () => {

    const [session] = React.useContext(UserContext);
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [userIds, ] = React.useState([]);
    const [loading, setLoading] = React.useState('');
    const [error, setError] = React.useState('');
    const history = useHistory();

    const classes = useStyles(makeStyles);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await createGroupApi.createGroup({name, description, userIds});
        setLoading(false);
        if(response) {
            history.push(VIEW_GROUP_PAGE + response.id);
        } else {
            setError(true);
        }
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(!session || !session.user) {
            return <Redirect to={LOGIN_PAGE} />
        } 
        return (
            <div className={classes.pageWrapper}>
                <div className={classes.formWrapper}>
                <form onSubmit={onSubmit}>
                    <FormLayout>
                    <div className={classes.columnWrapper}>
                        <TextField className={classes.titleTF}
                            testid='group_title'
                            id="title" 
                            label="Title"
                            value={name}
                            variant="outlined"
                            onChange={onChangeName} />
                    
                        <TextField className={classes.descriptioTF}
                            testid='item_description'
                            id="description" 
                            value={description}
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={5}
                            onChange={onChangeDescription} />
               
                    

                                <StyledButton
                                    onClick={onSubmit}
                                    disabled={loading}
                                    >
                                    OK
                                </StyledButton>
                                </div>
                        
                    </FormLayout>
                </form>
                </div>
            </div>
        )
    }


    return (
        render()
    )

}

export default CreateGroupPage;