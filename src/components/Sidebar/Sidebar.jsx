import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeToggleTaskInfo } from '../../redux/reducers/taskReducer';
import {ReactComponent as IconProductivitySVG} from '../../img/productivity.svg';
import { addCurrentCategory } from '../../redux/reducers/categoryReducer';
import {ReactComponent as IconPlusSVG} from '../../img/plus.svg';
import { CSSTransition } from 'react-transition-group';

export default function Sidebar() {

    const dispatch = useDispatch();
    const categories = useSelector(({sidebar}) => sidebar.categories);
    const currentCategory = useSelector(({sidebar}) => sidebar.currentCategory);

    const [showMessage, setShowMessage] = useState(false);

    const clickCategoryHandler = (category) => {
        dispatch(changeToggleTaskInfo(false))
        dispatch(addCurrentCategory(category))
    }

    
    return (
        <div className="sidebar">
            <div className="sidebar-account">
                <div className="sidebar-account-user">
                    <div className="sidebar-account-user__img"></div>
                    <div className="sidebar-account-user__body">
                        <div className="sidebar-account-user__name">Константин</div>
                    </div>
                    <Link to="/history" className="sidebar-account-productivity">
                        <IconProductivitySVG />
                    </Link>
                </div>
                
            </div>            
            <div className="sidebar-category">
                <div className="sidebar-category-default">
                    {categories.map(category => {
                        return (
                            category.default &&
                            
                            <div className="sidebar-category__item" key={category.id}>
                                <Link 
                                className={currentCategory && currentCategory.id === category.id ? "sidebar-category-card current" : "sidebar-category-card"} 
                                to={`/tasks/${category.id}`} 
                                onClick={() => clickCategoryHandler(category)}>
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
                                <Link 
                                className={currentCategory && currentCategory.id === category.id ? "sidebar-category-card current" : "sidebar-category-card"} 
                                to={`/tasks/${category.id}`} 
                                onClick={() => clickCategoryHandler(category)}>
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

                    <div className="sidebar-category-card sidebar-category-add">
                        <div className="sidebar-category-add__icon"><IconPlusSVG /></div>
                        <div className="sidebar-category-add__text">Добавить категорию</div>
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="test">
                <button onClick={() => setShowMessage(!showMessage)}>Новость</button>
                <CSSTransition
                in={showMessage}
                timeout={300}
                classNames="alert"
                unmountOnExit
                >
                    <div className="test-alert">
                    Animated alert message
                    This alert message is being transitioned in and out of the DOM.
                    </div>
                    
                </CSSTransition>
            </div>
            <div className="sidebar-footer">
                <div className="sidebar-footer-list">
                    <div className="sidebar-footer-list__item">
                        <a className="c-link" href="https://ncase.me/remember/ru.html">Ящик Лейтнера</a>
                    </div>
                    <div className="sidebar-footer-list__item">
                        <a className="c-link" href="https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method">Матрица Эйзенхауэра</a>
                        <div className="c-note">
                        Раскидываем эти задачи по 4 квадрантам: "Важное и Срочное", "Важное и Не срочное", "Не важное и Срочное" и "Не важное и не срочное". Так вот задачи, которые оказались у вас в квадранте "Важное и Не срочное", это задачи, выполнение которых принесет вам больше всего счастья и значимости, именно их выполнение двигает вас вперёд
                        </div>
                    </div>
                </div>
                <div className="sidebar-footer__about">Version 0.0.1 About Activity</div>
                
            </div>
        </div>
    )
}
