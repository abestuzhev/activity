import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Layout = () => {
    const {isAuth} = useSelector((state) => state.auth);

    if(!isAuth) {
        return <Navigate to="/login" />
    }
    return (
        <div className="todo">
            <Sidebar/>
            <Outlet />
        </div>
    );
};

export default Layout;