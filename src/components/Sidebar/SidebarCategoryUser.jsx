import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as IconPlusSVG} from "../../img/plus.svg";
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../redux/reducers/categoryReducer";
import CategoryServices from "../../api/services/CategoryServices";
import {canArrayValues, canObjectValues} from "../../helpers/helpers";
import {Constants} from "../../helpers/constants";

const SidebarCategoryUser = ({onClick}) => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [categoryTitleValue, setCategoryTitleValue] = useState(Constants.CATEGORIES.DEFAULT_TITLE)
    const {user} = useSelector((state) => state.auth);
    const {tasks} = useSelector((state) => state.tasksPage);
    const {categories, currentCategory} = useSelector((state) => state.sidebar);
    const userCategories = categories.filter(category => category.type === 'user')

    const addCategoryHandler = () => {
        setIsEditing(true)

    }

    const changeTitleHandler = (e) => {
        setCategoryTitleValue(e.target.value)
    }

    const blurTitleHandler = async (e) => {
        setIsEditing(false)
        const response = await CategoryServices.addCategory({
            user_id: user.id,
            title: categoryTitleValue,
            color: "rgba(206, 205, 202, 0.5)"
        })
        if(canObjectValues(response)) {
            dispatch(addCategory(response))
        }
        setCategoryTitleValue(Constants.CATEGORIES.DEFAULT_TITLE)
    }

    const handleFocus = (event) => {
        event.target.select()
    }

    const getTaskInCategory = (tasks, categoryId) => {
        return canArrayValues(tasks)
            ? tasks.filter(task => task?.categories?.includes(categoryId))
            : []
    }

    return (
        <div className="sidebar-category-user">
            <div className="sidebar-category-user__title">Мои категории</div>
            <div className="sidebar-category-user__list">
                {userCategories.map(category => {
                    const tasksInCategory = getTaskInCategory(tasks, category.id)
                    const tasksActiveInCategory = canArrayValues(tasksInCategory) ? tasksInCategory.filter(task => !task.status) : []
                    return (
                        <div className="sidebar-category__item" key={category.id}>
                            <Link
                                className={currentCategory && currentCategory.id === category.id ? "sidebar-category-card current" : "sidebar-category-card"}
                                to={`/tasks/${category.id}`}
                                onClick={() => onClick(category)}>
                                <div className="sidebar-category-card__head">
                                    <div className="sidebar-category-card__title">
                                        <div className="sidebar-category-card__icon" style={{backgroundColor: category?.color}}></div>
                                        <div className="sidebar-category-card__name" >
                                            {category.title}
                                        </div>
                                    </div>
                                    <div className="sidebar-category-card__count">
                                        {tasksActiveInCategory.length === 0
                                            ? ""
                                            : tasksActiveInCategory?.length}
                                    </div>
                                </div>
                                <div className="sidebar-category-card__body">
                                </div>
                            </Link>
                        </div>
                    )
                })}
                {isEditing &&
                    <div className="sidebar-category__item">
                        <div className={"sidebar-category-card current"} >
                            <div className="sidebar-category-card__head">
                                <div className="sidebar-category-card__title">
                                    <div className="sidebar-category-card__icon" style={{backgroundColor: "rgba(206, 205, 202, 0.5)"}}></div>
                                    <div className="sidebar-category-card__name" >
                                        <input
                                            type="text"
                                            className={'c-input'}
                                            autoFocus={true}
                                            onBlur={blurTitleHandler}
                                            onFocus={handleFocus}
                                            onChange={changeTitleHandler}
                                            value={categoryTitleValue}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-category-card__body">
                            </div>
                        </div>
                    </div>
                }

                <div className="sidebar-category-card sidebar-category-add" onClick={addCategoryHandler}>
                    <div className="sidebar-category-add__icon"><IconPlusSVG /></div>
                    <div className="sidebar-category-add__text">Добавить категорию</div>
                </div>
            </div>
        </div>
    );
};

export default SidebarCategoryUser;