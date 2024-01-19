import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Modal from '../Modal/Modal';
import Todo from "./Todo";
import {getTasks} from "../../redux/reducers/taskReducer";
import TaskServices from "../../api/services/TaskServices";
import {addCurrentCategory, getCategories} from "../../redux/reducers/categoryReducer";
import CategoryServices from "../../api/services/CategoryServices";
import {canArrayValues} from "../../helpers/helpers";

export default function Tasks() {

    const dispatch = useDispatch();
    const currentTask = useSelector(({tasksPage}) => tasksPage.currentTask);
    const {isAuth} = useSelector((state) => state.auth);

    useEffect( () => {
        async function startFetching() {
            if(isAuth) {
                const response = await TaskServices.getTasks()
                if(canArrayValues(response)) {
                    dispatch(getTasks(response.map(task => {
                        return {
                            ...task,
                            start: task.start ? moment(task.start).format("DD.MM.YYYY HH:mm") : "",
                            end: task.end ? moment(task.end).format("DD.MM.YYYY HH:mm") : ""
                        }
                    })));
                }

                const responseCategories = await CategoryServices.getCategories()
                dispatch(getCategories(responseCategories));
                dispatch(addCurrentCategory(responseCategories.find(category => category.id === 1)));
            }
        }
        startFetching()

    }, [isAuth])

    return (
        <>
        <div className="frame">
            <Todo />
            <Modal task={currentTask}/>
        </div>
        </>
    )
}
