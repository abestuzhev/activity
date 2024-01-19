import React, {useState} from 'react';
import styles from './style.module.scss';
import CustomInput from './../../shared/Input';
import {ReactComponent as IconUserSVG} from "../../img/user.svg";
import {Link, Navigate} from "react-router-dom";
import {setIsAuth} from "../../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import AuthService from "../../api/services/UserServices";


const Login = () => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('user3');
    const [password, setPassword] = useState('qwe');
    const {isAuth} = useSelector((state) => state.auth);

    const loginHandler = async (username, password) => {
        const response = await AuthService.login(username, password)
        // TODO извлечь id пользователя с помощью jsonwebtoken
        console.log("response", response)
        dispatch(setIsAuth(response.statusText === 'OK'))
    }

    if(isAuth) {
        return <Navigate to="/" />
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.login}>
                <div className={styles.loginHead}>
                    <h2 className={styles.loginTitle}>Авторизация</h2>
                </div>

                <div className={styles.loginForm}>
                    <div className={styles.loginFormField}>
                        <CustomInput
                            type={'text'}
                            name={'username'}
                            onChange={setUserName}
                            placeholder={'Введите логин'}
                            value={username}
                        />
                    </div>
                    <div className={styles.loginFormField}>
                        <CustomInput
                            type={'password'}
                            name={'password'}
                            onChange={setPassword}
                            placeholder={'Введите пароль'}
                            value={password}
                        />
                    </div>
                    <button className={'c-btn c-btn--large c-btn--full'} onClick={() => loginHandler(username, password)}>
                        Войти
                    </button>
                </div>
                <div className={styles.loginFooter}>
                    <Link to="/" className={'c-link'}>
                        Регистрация
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Login;