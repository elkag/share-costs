import React from 'react';
import styles from './input-field.module.css';

const FormField = ({id, type, inputName, title, placeholder, onChange}) => {

    return (
        <div className={styles.row}>
            <div className={styles["col-25"]}>
                <label htmlFor={id}>{title}:</label>
            </div>
            <div className={styles["col-75"]}>
                <input type={type} id={id} name={inputName} placeholder={placeholder} onChange={onChange} />
            </div>
        </div>
    )
}

export default FormField;