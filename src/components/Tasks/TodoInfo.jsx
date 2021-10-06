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
        </>
        
    )
}
