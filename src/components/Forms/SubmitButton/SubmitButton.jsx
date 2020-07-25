import React from 'react';
import styles from './submit-button.module.css';

const SubmitButton = ({title, onSubmit, disabled}) => {
    return (
        <div className={styles.row}>
            <input value={title} type="submit" disabled={disabled} onClick={onSubmit}/>  
        </div>
    )
}

export default SubmitButton;