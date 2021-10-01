import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { v4 as uuidv4 } from "uuid";
import { deleteTaskInCategory, pushTaskInCategory } from '../../redux/reducers/categoryReducer';
import { addCurrentTask, addTask, checkTask, deleteTask, changeToggleTaskInfo } from '../../redux/reducers/taskReducer';
import Dropdown from '../Dropdown/Dropdown';
import {ReactComponent as IconDeteleSVG} from '../../img/delete.svg';

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
        note: ""
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
        dispatch(addCurrentTask(task))
        dispatch(changeToggleTaskInfo(true))
        console.log("changeTaskHandler");
        console.log("task", task);
    }


    return (
        <>
        <div className="frame-area">

        
            <div className="frame-head">
                <div className="frame-head__title">
                    <h2 className="frame-title c-title" style={{backgroundColor: currentCategory.color}}>{currentCategory.name}</h2>
                    <div className="frame-title-menu">
                        <Dropdown conf = {{width:30, height:30}} />
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
                {
                    list.map(item => {
                        
                        return (
                            <div className="frame-list__item" key={item.id}>                                
                                <div className={item.complete ? "frame-card complete" : "frame-card"} >
                                    <div className="frame-card__body">
                                        <div className="frame-card__icon" onClick={() => checkHandler(item.id)}></div>
                                        <div className="frame-card__text" onClick={() => changeTaskHandler(item)}>{item.text}</div>
                                    </div>
                                    <div className="frame-card-menu">
                                        <div className="frame-card-menu__list">
                                            <div className="frame-card-menu__item" onClick={() => deleteTaskHandler(item.id)}><IconDeteleSVG /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        </>
    );
};

export default Todo;