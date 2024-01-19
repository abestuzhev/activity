import React from 'react';
import styles from './style.module.scss';

const Error = () => {
    return (
        <div className={styles.errorBox}>
            <div className={styles.errorBoxTitle}>Что-то пошло не так на стороне сервиса.</div>
             Не переживайте, мы уже чиним. Попробуйте обновить страницу или зайти в сервис чуть позже.
        </div>
    );
};

export default Error;