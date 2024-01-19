import React from 'react';
import styles from './style.module.scss';
import Error from "../../widgets/Error";

const ErrorPage = () => {
    return (
        <div className={styles.errorPage}>
            <Error />
        </div>
    );
};

export default ErrorPage;