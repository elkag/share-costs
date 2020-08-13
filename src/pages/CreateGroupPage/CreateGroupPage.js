import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect, useHistory } from 'react-router-dom';
import { HOME_PAGE, VIEW_GROUP_PAGE } from '../../config/routes';
import StyledButton from '../../components/common/StyledButton';
import {createGroupApi} from '../../api/services/createGroupApi'
import TextInput from '../../components/Forms/InputFields/TextInput';
import FormLayout from '../../components/Forms/FormLayout/FormLayout';

const CreateGroupPage = () => {

    const [session] = React.useContext(UserContext);
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [userIds, ] = React.useState([]);
    const [loading, setLoading] = React.useState('');
    const [error, setError] = React.useState('');
    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await createGroupApi.createGroup({name, description, userIds});
        history.push(VIEW_GROUP_PAGE + response.id);
    }

    const onChangeName = (value) => {
        setName(value);
    }


    const render = () => {
        if (!session || !session.user) {
            return <Redirect to={HOME_PAGE} />
        }
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <FormLayout>
                    <TextInput 
                        id="group-name" 
                        disabled={loading}
                        type="text"
                        value={name}
                        inputName="Group Name" 
                        title="Name" 
                        placeholder="Group name.."
                        onChange={ onChangeName } />
                
                    <div >{error}</div>
                        <StyledButton
                            onClick={onSubmit}
                            disabled={loading}
                            >
                            OK
                        </StyledButton>
                        
                </FormLayout>
                </form>
            </div>
        )
    }


    return (
        render()
    )

}

export default CreateGroupPage;