import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { v4 as uuidv4 } from "uuid";
import { deleteTaskInCategory, pushTaskInCategory } from '../../redux/reducers/categoryReducer';
import { addCurrentTask, addTask, checkTask, deleteTask, changeToggleTaskInfo, changeTaskTitle, toggleModal } from '../../redux/reducers/taskReducer';
import Dropdown from '../Dropdown/Dropdown';
import {ReactComponent as IconDeteleSVG} from '../../img/delete.svg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Todo = () => {

    const [item, setItem] = useState("");
    const dispatch = useDispatch();
    const allTasks = useSelector((state) => state.tasksPage.tasks);
    const allCategories = useSelector((state) => state.sidebar.categories);
    const {idCategory} = useParams();

    const list = allTasks.filter(item => item.category[0] === idCategory);
    
    const currentCategoryArray = allCategories.filter(category => category.id === +idCategory);
    const currentCategory = currentCategoryArray[0] || allCategories[0];

    const newTask = {
        id: uuidv4(),
        text: item,
        complete: false,
        date: "", 
        category: [idCategory || "1"],
        note: "",
        toggleTaskInfo: false,
    }

    const handleSubmit = (e) => {
        e.preventDefault();        
        dispatch(addTask(newTask))
        dispatch(pushTaskInCategory(newTask));

        setItem("");
    }


    const handlerSetItem = (e) => {
        setItem(e.target.value)
    }

    const checkHandler = (id) => {

        dispatch(checkTask(id))
        console.log(list);
    }

    const deleteTaskHandler = (id) => {
        dispatch(deleteTask(id));
        dispatch(deleteTaskInCategory(id));
    }

    const changeTaskHandler = (task) => {
        //открыть окно и поместить туда нужную информацию
        dispatch(addCurrentTask(task));
        // dispatch(changeToggleTaskInfo(task))
        dispatch(toggleModal())
        // console.log("changeTaskHandler");
        // console.log("task", task);
    }

    const changeTaskTitleHandlet = (item) => {
        dispatch(changeTaskTitle(item));
        console.log("changeTaskTitleHandlet", item)
    }


    return (
        <>
        <div className="frame-area">

        
            <div className="frame-head">
                <div className="frame-head__title">
                    <h2 className="frame-title c-title" style={{backgroundColor: currentCategory.color}}>{currentCategory.name}</h2>
                    <div className="frame-title-menu">
                        <Dropdown conf = {{width:30, height:30, side: "left"}} />
                    </div>
                </div>
                <div className="frame-title__text">{currentCategory.text}</div>
            </div>
            

            {
                idCategory !== "3" 
                ? <form onSubmit={handleSubmit} className="frame-form">
                    <div className="frame-add">
                        <div className="frame-add__icon"></div>
                        <input value={item} onChange={handlerSetItem} type="text" placeholder="Добавить задачу"/>
                        {item && <button className="frame-add__btn">Добавить задачу</button>}
                    </div>
                </form>
                : ""
            }
            

            <div className="frame-list">
                <TransitionGroup>

                {
                    list.map(item => {
                        
                        return (
                            < CSSTransition
                            key={item.id}
                            timeout={100}
                            classNames="item"
                            >
                            <div className="frame-list__item" >                                
                                <div className={
                                    item.complete 
                                    ? item.toggleTaskInfo ? "frame-card complete is-show" : "frame-card complete" 
                                    : item.toggleTaskInfo ? "frame-card is-show" : "frame-card"} >
                                    <div className="frame-card__body">
                                        <div className="frame-card-check">
                                            <div className="frame-card-check__icon" onClick={() => checkHandler(item.id)}></div>
                                        </div>

                                        <div 
                                            className="frame-card__text" 
                                            onClick={() => changeTaskHandler(item)}
                                            >
                                                {item.text}
                                            </div>
                                        
                                        {/* {
                                            !item.toggleTaskInfo 
                                            ? <div 
                                            className="frame-card__text" 
                                            onClick={() => changeTaskHandler(item)}
                                            >
                                                {item.text}
                                            </div>
                                            : <div 
                                            className="frame-card__text" 
                                            contentEditable={true}
                                            onChange={(e) => changeTaskTitleHandlet({id: item.id, title: e.target.value})}
                                            >
                                                {item.text}
                                            </div>
                                        } */}
                                        
                                    </div>
                                    <div className="frame-card-menu">
                                        <div className="frame-card-menu__list">
                                            <div className="frame-card-menu__item" onClick={() => deleteTaskHandler(item.id)}><IconDeteleSVG /></div>
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
                            </div>
                            </ CSSTransition>
                        )
                    })
                }
                </TransitionGroup>
            </div>
        </div>

        </>
    );
};

export default Todo;