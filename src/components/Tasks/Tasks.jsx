import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import Todo from "./Todo";

export default function Tasks() {
    const currentTask = useSelector(({tasksPage}) => tasksPage.currentTask);
    const toggleModal = useSelector(({tasksPage}) => tasksPage.toggleModal);
    return (
        <>
        <div className="frame">
            
            <Header />
            <Todo />
            <Modal task={currentTask}/>
                
        </div>
        </>
    )
}
