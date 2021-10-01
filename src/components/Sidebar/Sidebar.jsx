import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeToggleTaskInfo } from '../../redux/reducers/taskReducer';
import {ReactComponent as IconProductivitySVG} from '../../img/productivity.svg';

export default function Sidebar() {

    const dispatch = useDispatch();
    const categories = useSelector(({sidebar}) => sidebar.categories);

    const clickCategoryHandler = () => {
        dispatch(changeToggleTaskInfo(false))
    }

    
    return (
        <div className="sidebar">
            <div className="sidebar-account">
                <div className="sidebar-account-user">
                    <div className="sidebar-account-user__img"></div>
                    <div className="sidebar-account-user__body">
                        <div className="sidebar-account-user__name">Константин</div>
                    </div>
                    <div className="sidebar-account-productivity">
                        <IconProductivitySVG />
                    </div>
                </div>
                
            </div>            
            <div className="sidebar-category">
                <div className="sidebar-category-default">
                    {categories.map(category => {
                        return (
                            category.default &&
                            
                            <div className="sidebar-category__item" key={category.id}>
                                <Link className="sidebar-category-card" to={`/tasks/${category.id}`} onClick={clickCategoryHandler}>
                                    <div className="sidebar-category-card__head">
                                        <div className="sidebar-category-card__title">
                                            <div className="sidebar-category-card__icon" style={{backgroundColor: category.color}}></div>
                                            <div className="sidebar-category-card__name" >
                                                {category.name}
                                            </div>
                                        </div>                                    
                                        <div className="sidebar-category-card__count">{category.tasksId.length === 0 ? "" : category.tasksId.length}</div>
                                    </div>
                                    <div className="sidebar-category-card__body">                                    
                                    </div>                                
                                </Link>          
                            </div>
                        )
                    })}
                </div>
                
                <div className="sidebar-category-user">
                    <div className="sidebar-category-user__title">Мои категории</div>
                    <div className="sidebar-category-user__list">
                    {categories.map(category => {
                        return (
                            !category.default &&                        
                            <div className="sidebar-category__item" key={category.id}>
                                <Link className="sidebar-category-card" to={`/tasks/${category.id}`} onClick={clickCategoryHandler}>
                                    <div className="sidebar-category-card__head">
                                        <div className="sidebar-category-card__title">
                                            <div className="sidebar-category-card__icon" style={{backgroundColor: category.color}}></div>
                                            <div className="sidebar-category-card__name" >
                                                {category.name}
                                            </div>
                                        </div>                                    
                                        <div className="sidebar-category-card__count">{category.tasksId.length === 0 ? "" : category.tasksId.length}</div>
                                    </div>
                                    <div className="sidebar-category-card__body">                                    
                                    </div>                                
                                </Link>          
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className="sidebar-footer">
                <div className="sidebar-footer__about">Version 0.0.1 About Activity</div>
            </div>
        </div>
    )
}
