import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentTask, toggleModal } from '../../redux/reducers/taskReducer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';

export default function Modal({task}) {
    const dispatch = useDispatch();
    const toggleModalValue = useSelector(({tasksPage}) => tasksPage.toggleModal);
    const currentTask = useSelector(({tasksPage}) => tasksPage.currentTask);

    console.log("currentTask", currentTask);

    const [state, setstate] = useState()

    const toggleModalHandler = (e) => {
        console.log("toggleModalValue", toggleModalValue);
        dispatch(toggleModal())
    }

    const changeNoteTaskHandler = (value) => {
        // dispatch(changeTaskNote())
        console.log("value", value);
        dispatch(addCurrentTask({...currentTask, note: value}))
    }
    const changeTitleTaskHandler = (value) => {
        // dispatch(changeTaskNote())
        console.log("value", value);
        dispatch(addCurrentTask({...currentTask, text: value}))
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
                            <div className="modal-head">
                                <div
                                    className="modal-head__title"
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    onBlur={e => changeTitleTaskHandler(e.target.textContent)}
                                >{currentTask.text}</div>
                                <div className="modal-close">

                                </div>
                            </div>
                            <div className="modal-body">
                                <div 
                                    className={currentTask.note !== "" ? "modal-editor" : "modal-editor start-blank"} 
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    data-placeholder="Заметки и мысли"
                                    onBlur={e => changeNoteTaskHandler(e.target.textContent)}
                                >
                                    {currentTask.note}
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
