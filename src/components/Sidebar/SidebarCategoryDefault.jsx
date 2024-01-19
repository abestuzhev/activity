import React from 'react';
import {useSelector} from "react-redux";
import {Constants} from "../../helpers/constants";
import {Link} from "react-router-dom";
import {ReactComponent as IconHomeSVG} from "../../img/home.svg";
import {ReactComponent as IconSunSVG} from "../../img/sun.svg";
import {ReactComponent as IconStarSVG} from "../../img/star.svg";
import {canArrayValues} from "../../helpers/helpers";

const SidebarCategoryDefault = ({onClick}) => {
    const {tasks} = useSelector((state) => state.tasksPage);
    const {categories, currentCategory} = useSelector((state) => state.sidebar);
    const defaultCategories = canArrayValues(categories)
        ? categories.filter(category => !!category && category?.type === 'default')
        : []

    const generateIcon = (category) => {
        switch(category.icon){
            case "icon-sun": return <IconSunSVG style={{fill:category.iconColor }}/>
            case "icon-star": return <IconStarSVG style={{fill:category.iconColor }}/>
            default: return ""
        }
    }
    const tasksActive = canArrayValues(tasks) ? tasks.filter(task => !task.status) : []
    const tasksImportant = canArrayValues(tasks) ? tasks.filter(task => task.status && task.isImportant) : []

    return (
        <div className="sidebar-category-default">
            {Object.keys(Constants.CATEGORY).map(KEY => {
                return (
                    <div className="sidebar-category__item" key={Constants.CATEGORY[KEY].id}>
                        <Link
                            className={currentCategory && currentCategory.id === Constants.CATEGORY[KEY].id ? "sidebar-category-card current" : "sidebar-category-card"}
                            to={`/tasks/${Constants.CATEGORY[KEY].id}`}
                            onClick={() => onClick(Constants.CATEGORY[KEY])}>
                            <div className="sidebar-category-card__head">
                                <div className="sidebar-category-card__title">
                                    <div className="sidebar-category-card__icon">{generateIcon(Constants.CATEGORY[KEY])}</div>
                                    <div className="sidebar-category-card__name" >
                                        {Constants.CATEGORY[KEY].title}
                                    </div>
                                </div>
                                <div className="sidebar-category-card__count">{tasksImportant.length}</div>
                            </div>
                            <div className="sidebar-category-card__body">
                            </div>
                        </Link>
                    </div>
                )
            })}

            {defaultCategories.map(category => {
                return (
                    <div className="sidebar-category__item" key={category.id}>
                        <Link
                            className={currentCategory && currentCategory.id === category.id ? "sidebar-category-card current" : "sidebar-category-card"}
                            to={`/tasks/${category.id}`}
                            onClick={() => onClick(category)}>
                            <div className="sidebar-category-card__head">
                                <div className="sidebar-category-card__title">
                                    <div className="sidebar-category-card__icon" ><IconHomeSVG style={{fill:"#5c70be" }} /></div>
                                    <div className="sidebar-category-card__name" >
                                        {category?.title}
                                    </div>
                                </div>
                                <div className="sidebar-category-card__count">{tasksActive?.length === 0 ? "" : tasksActive?.length}</div>
                            </div>
                            <div className="sidebar-category-card__body">
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
};

export default SidebarCategoryDefault;