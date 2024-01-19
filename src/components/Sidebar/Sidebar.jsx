import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {changeToggleTaskInfo, toggleDetail} from '../../redux/reducers/taskReducer';
import {ReactComponent as IconProductivitySVG} from '../../img/productivity.svg';
import {ReactComponent as IconLogoutSVG} from '../../img/logout.svg';
import {ReactComponent as IconUserSVG} from "../../img/user.svg";
import { addCurrentCategory } from '../../redux/reducers/categoryReducer';
import {apiLogout} from "../../api/endpoints";
import {canObjectValues} from "../../helpers/helpers";
import {setIsAuth} from "../../redux/reducers/authReducer";
import SidebarCategoryUser from "./SidebarCategoryUser";
import SidebarCategoryDefault from "./SidebarCategoryDefault";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {

    const dispatch = useDispatch();
    const {isAuth, user} = useSelector((state) => state.auth);

    const userLogoutHandler = () => {
        apiLogout()
        dispatch(setIsAuth(false))
    }

    const clickCategoryHandler = (category) => {
        dispatch(changeToggleTaskInfo(false))
        dispatch(addCurrentCategory(category))
        dispatch(toggleDetail(false))
    }
    
    return (
        <div className="sidebar">
            <div className="sidebar-account">
                <Link to="/" className="sidebar-account-user">
                    <div className="sidebar-account-user__img"><IconUserSVG /></div>
                    <div className="sidebar-account-user__body">
                        <div className="sidebar-account-user__name">{canObjectValues(user) ? user?.username : ""}</div>
                    </div>
                    <div className="sidebar-account-icons">
                        <Link to="/history" className="sidebar-account-icons__item">
                            <IconProductivitySVG />
                        </Link>
                        {isAuth && <button className="sidebar-account-icons__item" onClick={userLogoutHandler}><IconLogoutSVG /></button> }
                    </div>

                </Link>
            </div>            
            <div className="sidebar-category">
                <SidebarCategoryDefault onClick={clickCategoryHandler} />
                <SidebarCategoryUser onClick={clickCategoryHandler}/>
            </div>
            <SidebarFooter />


        </div>
    )
}
