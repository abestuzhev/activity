import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import {deleteTask, toggleDetail, updateTask} from "../../../redux/reducers/taskReducer";
import {ReactComponent as IconCloseSVG} from "../../../img/close.svg";
import {ReactComponent as IconDeleteSVG} from "../../../img/delete.svg";
import {ReactComponent as IconStarOutlineSVG} from "../../../img/star-outline.svg";
import {ReactComponent as IconStarFillSVG} from "../../../img/star-fill.svg";
import TextareaAutosize from 'react-textarea-autosize';
import { registerLocale } from  "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import TaskServices from "../../../api/services/TaskServices";
import {canObjectValues, convertStringToDate} from "../../../helpers/helpers";
registerLocale('ru', ru);

const TodoDetail = () => {
    const dispatch = useDispatch();
    const {currentTask} = useSelector((state) => state.tasksPage);
    const [startDate, setStartDate] = useState(new Date());
    const [taskTitle, setTaskTitle] = useState("");
    const [taskText, setTaskText] = useState("");
    const [isImportant, setIsImportant] = useState(false);

    const closeHandler = () => {
        dispatch(toggleDetail(false))
    }

    useEffect(() => {
        setTaskTitle(currentTask.title)
        setTaskText(currentTask.text || "")
        setIsImportant(currentTask.isImportant)
        setStartDate(convertStringToDate(currentTask.start))
    }, [currentTask])

    console.log("taskText", taskText)
    const updateTaskHandler = async (task) => {
        console.log("task", task)
        const response = await TaskServices.updateTask(task);
        if(canObjectValues(response)) {
            dispatch(updateTask(task));
        }
    }

    const removeTaskHandler = async (id) => {
        const response = await TaskServices.removeTask(id);
        if(canObjectValues(response)) {
            dispatch(deleteTask(id));
        }
    }

    return (
        <div className={classNames(styles.todoDetail, {
            [styles.todoDetailCompleted]: currentTask.status
        })}>
            <div className={styles.todoDetailSection}>
                <div className={styles.todoDetailTop}>
                    <div className={styles.todoDetailTopTitle}></div>
                    <div className={styles.todoDetailClose} onClick={closeHandler}>
                        <span>закрыть</span>
                        <IconCloseSVG />
                    </div>
                </div>
                <div className={styles.todoDetailHead}>
                    <label htmlFor="" className={'c-label'}>Заголовок задачи</label>
                    <TextareaAutosize
                        className={'c-textarea c-textarea--title'}
                        placeholder={''}
                        value={taskTitle}
                        onBlur={() => {
                            updateTaskHandler({...currentTask, title: taskTitle})
                        }}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <div
                        className={styles.todoDetailImportant}
                        onClick={() => updateTaskHandler({...currentTask, isImportant: !currentTask?.isImportant})}
                    >
                        {isImportant ? <IconStarFillSVG /> : <IconStarOutlineSVG />}
                    </div>

                </div>

                <div className={styles.todoDetailBody}>

                    <div className={styles.todoDetailForm}>
                        <div className={styles.todoDetailFormItem}>
                            <label htmlFor="" className={'c-label'}>Заметка</label>
                            <TextareaAutosize
                                className={'c-textarea'}
                                placeholder={''}
                                value={taskText}
                                onBlur={() => {
                                    updateTaskHandler({...currentTask, text: taskText})
                                }}
                                onChange={(e) => setTaskText(e.target.value)}
                            />
                        </div>
                        <div className={styles.todoDetailFormItem}>
                            <label htmlFor="" className={'c-label'}>Дата события</label>
                            <DatePicker
                                locale="ru"
                                className={'c-datepicker'}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                onBlur={() => {
                                    updateTaskHandler({...currentTask, start: moment(startDate).format("DD.MM.YYYY HH:mm")})
                                }}
                                dateFormat="dd.MM.yyyy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.todoDetailFooter}>
                <div className={styles.todoDetailFooterDate}>Создано: {moment(currentTask.created).format("DD.MM.YYYY")}</div>
                <div className={styles.todoDetailFooterIcon} onClick={() => removeTaskHandler(currentTask.id)}><IconDeleteSVG /></div>
            </div>
        </div>
    );
};

export default TodoDetail;