import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Tasks from "../components/Tasks/Tasks";
import History from "../pages/history";
import Layout from "../pages/layout";
import Login from "../widgets/Login";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth, setUser} from "../redux/reducers/authReducer";
import UserServices from "../api/services/UserServices";
import ErrorPage from "../pages/error";

const App = () => {
    const dispatch = useDispatch();
    const {isAuth} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(setIsAuth(!!localStorage.getItem('token')))
    }, [])

    useEffect(() => {
        async function startFetching() {
            if(isAuth) {
                dispatch(setUser(await UserServices.getUser(3)));
            }
        }
        startFetching()
    }, [isAuth])

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Tasks/>} />
                <Route path="history" element={<History/>} />
                <Route path="tasks/:idCategory" element={<Tasks/>} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
            <Route path="login" element={<Login/>} />
            <Route path="error" element={<ErrorPage/>} />
        </Routes>
    );
}

export default App;