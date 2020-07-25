import React from 'react';
//Styles
import styles from './input-field.module.css';

const SimpleInput = ({
                        id, 
                        type, 
                        onChange,
                        onBlur,
                        inputName,
                        title,
                        placeholder,
                        error }) => {


    const onChangeInput = (event) => {
        return onChange(event.target.value);
    }

    return (
        <div className={styles.row}>
            <div className={styles["input-error-wrapper"]}>
                <div className={styles["col-25"]}>
                    <label htmlFor={id}>{title}:</label>
                </div>
                <div className={styles.error}>
                    <label htmlFor={id}>{error}</label>
                </div>
           </div>
           <div className={styles["col-75"]}>
               <input  type={type} 
                       id={id} 
                       name={inputName} 
                       placeholder={placeholder} 
                       onChange={onChangeInput}
                       onBlur={onBlur} />
           </div>
           
       </div> )
}

export default SimpleInput;