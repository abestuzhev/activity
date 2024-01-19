import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/reducers/taskReducer';
import Dropdown from '../Dropdown/Dropdown';
import moment from 'moment';
import {canArrayValues} from "../../helpers/helpers";
import TaskServices from "../../api/services/TaskServices";
import TodoCard from "./TodoCard";
import TodoDetail from "./TodoDetail/TodoDetail";

const Todo = () => {

    const [item, setItem] = useState("");
    const dispatch = useDispatch();


    const {user} = useSelector((state) => state.auth);
    const {tasks, toggleDetail} = useSelector((state) => state.tasksPage);
    const completedMode = useSelector((state) => state.tasksPage.completedMode);
    const {categories, currentCategory} = useSelector((state) => state.sidebar);

    const listByCategory = canArrayValues(tasks) ? tasks.filter(task => task?.categories?.includes(currentCategory?.id)) : [];
    let listActiveByCategory = canArrayValues(listByCategory) ? listByCategory.filter(task => !task?.status): []
    let listCompletedByCategory = canArrayValues(listByCategory) ? listByCategory.filter(task => task?.status): []

    if(currentCategory?.id === 998) {
        console.log("currentCategory", currentCategory)
        listActiveByCategory = canArrayValues(tasks) ? tasks.filter(task => !task?.status && task.isImportant): []
        listCompletedByCategory = canArrayValues(tasks) ? tasks.filter(task => task?.status && task.isImportant): []
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await TaskServices.addTask({
            // id: uuidv4(),
            title: item,
            status: false,
            start: moment().format("DD.MM.YYYY HH:mm"),
            end: "",
            categories: currentCategory?.id !== 1 ? [1, currentCategory?.id] : [currentCategory?.id],
            text: "",
            user: user.id
        })
        if(response) {
            console.log("newTask", response)
            dispatch(addTask({...response,
                start: moment(response.start).format("DD.MM.YYYY HH:mm"),
                end: moment(response.end).format("DD.MM.YYYY HH:mm")
            }))
        }
        setItem("");
    }


    const handlerSetItem = (e) => {
        setItem(e.target.value)
    }

    return (
        <div className={'frame-area-grid'}>
            <div className="frame-area">
                <div className="frame-head">
                    <div className="frame-head__title">
                        <h2 className="frame-title c-title" style={{backgroundColor: currentCategory?.color}}>{currentCategory?.title}</h2>
                        {
                            currentCategory?.type === 'user' &&
                            <div className="frame-title-menu">
                                <Dropdown currentCategory = {currentCategory} conf = {{width:30, height:30, side: "left"}} />
                            </div>
                        }
                    </div>
                    <div className="frame-title__text">{currentCategory?.text}</div>
                </div>


                <form onSubmit={handleSubmit} className="frame-form">
                    <div className="frame-add">
                        <div className="frame-add__icon"></div>
                        <input value={item} onChange={handlerSetItem} type="text" placeholder="Добавить задачу"/>
                        {item && <button className="frame-add__btn">Добавить задачу</button>}
                    </div>
                </form>

                <div className="frame-list">
                    {
                        listActiveByCategory.map(item => {
                            return (

                                <div className="frame-list__item" >
                                    <TodoCard item={item}/>
                                </div>

                            )
                        })
                    }
                </div>
                {listCompletedByCategory.length > 0 && <div className="frame-list__title">Завершенные</div>}
                <div className="frame-list">
                    {
                        listCompletedByCategory.map(item => {
                            return (

                                <div className="frame-list__item" >
                                    <TodoCard item={item}/>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            {toggleDetail && <TodoDetail />}

        </div>
    );
};

export default Todo;