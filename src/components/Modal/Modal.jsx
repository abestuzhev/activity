import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/reducers/taskReducer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';

export default function Modal({task}) {
    const dispatch = useDispatch();
    const toggleModalValue = useSelector(({tasksPage}) => tasksPage.toggleModal);

    const [state, setstate] = useState()

    const toggleModalHandler = (e) => {
        console.log("toggleModalValue", toggleModalValue);
        dispatch(toggleModal())
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
                                {/* <div className="modal-container"> */}
                                    <div className="modal-wrapper">
                                    <CSSTransition  
                                        in={toggleModalValue}
                                        timeout={500}
                                        unmountOnExit
                                        classNames="popup"
                                    >
                                        <div className="modal-standart"></div>
                                        </CSSTransition>
                                    </div>
                                {/* </div> */}
                                {
                                    toggleModalValue &&
                                    <div className="modal-overlay" onClick={toggleModalHandler}></div>
                                }
                            </div>
            {/* <div className={styles.Modal}>
            <div className={styles.ModalContainer}>
                <div className={styles.ModalWrapper}>
                    
                        <div className={styles.ModalStandart}>
                            <div className={styles.ModalStandartHead}>{task.text}</div>
                            <div className={styles.ModalStandartBody}></div>
                            <div className={styles.ModalStandartFooter}></div>
                        
                        </div>
                    <div className={styles.ModalOverlay} onClick={toggleModalHandler}></div>
                </div>
            </div>
        </div> */}
        </CSSTransition>
        
            
        }
        </>
        
        
    )
}
