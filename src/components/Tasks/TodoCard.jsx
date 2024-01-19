import React from 'react';
import {ReactComponent as IconCheckSVG} from "../../img/check.svg";
import {ReactComponent as IconPapersSVG} from "../../img/papers.svg";
import {ReactComponent as IconStarOutlineSVG} from "../../img/star-outline.svg";
import {ReactComponent as IconStarFillSVG} from "../../img/star-fill.svg";
import {
    changeTaskTitle,
    checkTask,
    deleteTask, setCurrentTask, toggleDetail,
    updateTask
} from "../../redux/reducers/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {deleteTaskInCategory} from "../../redux/reducers/categoryReducer";
import moment from 'moment';
import {canArrayValues, canObjectValues} from "../../helpers/helpers";
import TaskServices from "../../api/services/TaskServices";

const TodoCard = ({item}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.sidebar);

    const checkHandler = async (task) => {
        const response = await TaskServices.updateTask({...task, status: !task.status});
        if(canObjectValues(response)) {
            dispatch(checkTask(response.id))
        }
    }

    const deleteTaskHandler = (id) => {
        dispatch(deleteTask(id));
        dispatch(deleteTaskInCategory(id));
    }

    const changeTaskHandler = (task) => {
        dispatch(toggleDetail(true))
        dispatch(setCurrentTask(task))
    }

    const updateTaskHandler = async (task) => {
        const response = await TaskServices.updateTask(task);
        if(canObjectValues(response)) {
            dispatch(updateTask(task));
        }
    }

    const changeTaskTitleHandler = (item) => {
        dispatch(changeTaskTitle(item));
    }

    const getCategoriesName = (categories, ids) => {
        return canArrayValues(ids)
            ? ids.reduce((result, id) => {
                const category = categories.find(category => category.id === id)
                if(canObjectValues(category) && category.id !== 1) {
                    result.push(category.title)
                }
                return result;
            }, [])
            : []
    }

    return (
        <div className={
            item.status
                ? item.status ? "frame-card complete is-show" : "frame-card complete "
                : item.status ? "frame-card is-show" : "frame-card"} >
            <div className="frame-card__body">
                <div className="frame-card-check">
                    <div className="frame-card-check__icon" onClick={() => checkHandler(item)}>
                        {item.status && <IconCheckSVG />}
                    </div>
                </div>

                <div
                    className="frame-card__text"
                    onClick={() => changeTaskHandler(item)}
                >
                    {item.title}
                    <div className="frame-card__note">
                        {item.text ? <span><IconPapersSVG /> Заметка</span> : ""}
                        {item.text && <span>|</span>}
                        {getCategoriesName(categories, item.categories).map(item => <span>{item}</span>)}
                    </div>
                </div>


            </div>
            <div className="frame-card-menu">
                <div className="frame-card-menu__list">
                    <div
                        className="frame-card-menu__item"
                        onClick={() => updateTaskHandler({...item, isImportant: !item.isImportant})}
                    >
                        {item.isImportant ? <IconStarFillSVG /> : <IconStarOutlineSVG />}
                    </div>
                    {/*<div className="frame-card-menu__item" onClick={() => deleteTaskHandler(item.id)}><IconDeteleSVG /></div>*/}
                </div>
            </div>

            {
                item.toggleTaskInfo &&
                <div className="frame-card-info">
                    {/* <div className="info-head">
                                                <div className="info-close" onClick={closeTaskInfo}></div>
                                            </div> */}
                    <div className="frame-cardinfo__body"></div>
                    <div className="frame-card-info-block">
                        <div className="frame-card-info-note" contentEditable={true}></div>
                        <div className="c-btn">Сохранить</div>
                    </div>
                </div>
            }

        </div>
    );
};

export default TodoCard;