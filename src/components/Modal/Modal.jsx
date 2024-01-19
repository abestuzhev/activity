import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addCurrentTask, toggleModal, updateTask} from '../../redux/reducers/taskReducer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from 'moment';
import styles from './Modal.module.css';
import Error from "../../widgets/Error";

export default function Modal({task}) {
    const dispatch = useDispatch();
    const toggleModalValue = useSelector(({tasksPage}) => tasksPage.toggleModal);
    const currentTask = useSelector(({tasksPage}) => tasksPage.currentTask);

    const startDateFormat = moment(currentTask.start).utc().format('DD.MM.YYYY HH:mm')
    const endDateFormat = moment(currentTask.end).utc().format('DD.MM.YYYY HH:mm')

    const toggleModalHandler = (e) => {
        dispatch(toggleModal())
    }

    const changeNoteTaskHandler = (value) => {
        dispatch(updateTask({...currentTask, note: value}))
    }
    const changeTitleTaskHandler = (value) => {
        dispatch(updateTask({...currentTask, text: value}))
    }

    return (
        <>
        {
        <CSSTransition 
            in={toggleModalValue}
            timeout={600}
            unmountOnExit
            classNames="modal"
        >
            <div className="modal" >
                    <div className="modal-wrapper">
                    <CSSTransition  
                        in={toggleModalValue}
                        timeout={500}
                        unmountOnExit
                        classNames="popup"
                    >

                        <div className="modal-standart">
                            {/*<Error />*/}
                            <div className="modal-head">
                                <div
                                    className="modal-head__title"
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    onBlur={e => changeTitleTaskHandler(e.target.textContent)}
                                >
                                    {currentTask.title}
                                </div>
                                <div className="modal-close"></div>
                            </div>
                            <div className="modal-body">
                                <div>
                                    Дата: {startDateFormat} — {endDateFormat}
                                </div>
                                <div
                                    className={currentTask.note !== "" ? "modal-editor" : "modal-editor start-blank"}
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    data-placeholder="Заметки и мысли"
                                    onBlur={e => changeNoteTaskHandler(e.target.textContent)}
                                >
                                    {currentTask.text}
                                </div>
                            </div>
                            <div className="modal-footer"></div>
                        </div>
                        </CSSTransition>
                    </div>
                {
                    toggleModalValue &&
                    <div className="modal-overlay" onClick={toggleModalHandler}></div>
                }
            </div>
        </CSSTransition>
        }
        </>
        
        
    )
}
