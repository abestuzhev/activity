import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeToggleTaskInfo } from '../../redux/reducers/taskReducer';

export default function TodoInfo() {
    const dispatch = useDispatch();
    const toggleTaskInfo = useSelector(({tasksPage}) => tasksPage.toggleTaskInfo)
    const currentTask = useSelector(({tasksPage}) => tasksPage.currentTask);

    const closeTaskInfo = () => {
        dispatch(changeToggleTaskInfo(false))
    }

    return (
        <>
        {
            toggleTaskInfo && 
            
            <div className="info">
                <div className="info-head">
                    <div className="info-close" onClick={closeTaskInfo}></div>
                </div>
                <div className="info-body"></div>
                <div className="info-block">
                    {currentTask.id} <br />
                    {currentTask.text}
                </div>
                <div className="info-block"></div>
                <div className="info-block"></div>
                <div className="info-block"></div>
                <div className="info-block"></div>
            </div>
        }
        </>
        
    )
}
