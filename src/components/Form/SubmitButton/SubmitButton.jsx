import React from 'react';
import styles from './submit-button.module.css';

const SubmitButton = ({title, onSubmit}) => {
    return (
        <div className={styles.row}>
            <input type="submit" value={title} onClick={onSubmit} />  
        </div>
    )
}

export default SubmitButton;