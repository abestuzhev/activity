import React from 'react'
import {ReactComponent as IconProductivitySVG} from "../../img/productivity.svg";
import {ReactComponent as IconUserSVG} from "../../img/user.svg";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {apiLogout} from "../../api/endpoints";
import {setIsAuth} from "../../redux/reducers/authReducer";

export default function Header() {
    const dispatch = useDispatch();
    const {isAuth} = useSelector((state) => state.auth);


    return (
        <div className="header">
            <div className="header-menu">
                {/*<div className="header-menu__item">*/}
                {/*    <div className="header-menu-card">*/}
                {/*        <div className="header-menu-card__icon"></div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="header-menu__item">*/}
                {/*    <Link to="/history" className="header-menu-link">*/}
                {/*        <IconProductivitySVG />*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<div className="header-menu__item">*/}
                {/*    <Link to="/login/" className="header-menu-user">*/}
                {/*        <div className="header-menu-user__icon"><IconUserSVG /></div>*/}

                {/*    </Link>*/}
                {/*</div>*/}
            </div>            
        </div>
    )
}
