import React from 'react';
import { InputBase } from '@material-ui/core';
import { UserContext } from '../../contexts/userContext';
import { Redirect, useHistory } from 'react-router-dom';
import { HOME_PAGE, VIEW_GROUP_PAGE } from '../../config/routes';
import StyledButton from '../../components/common/StyledButton';
import {createGroupApi} from '../../api/services/createGroupApi'

const CreateGroupPage = () => {

    const [session] = React.useContext(UserContext);
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [userIds, ] = React.useState([]);

    const history = useHistory();

    const createGroup = async () => {
        const response = await createGroupApi.createGroup({name, description, userIds});
        history.push(VIEW_GROUP_PAGE + response.id);
    }

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const render = () => {
        if (!session || !session.user) {
            return <Redirect to={HOME_PAGE} />
        }
        return (
            <div>
                <form onSubmit={createGroup}>
                    <div>Name</div>
                    <InputBase id="group-name" value={name} onChange={onChangeName} />
                    <div>Short Description</div>
                    <textarea id="group-description" value={description} onChange={onChangeDescription} />
                    <StyledButton id="submit-group" onClick={createGroup} disabled={name === ''}>Submit</StyledButton>
                </form>
            </div>
        )
    }


    return (
        render()
    )

}

export default CreateGroupPage;