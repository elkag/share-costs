import React from 'react';
import styles from './form-layout.module.css';

const FormLayout = (props) => {
    return (
        <div className={styles["login-page-wrapper"]}>
            <div className={styles.container}>
                {props.children}
            </div>
        </div>
    )
}

export default FormLayout;