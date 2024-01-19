const ADD_TASK = "ADD_TASK";
const CHECK_TASK = "CHECK_TASK";
const GET_TASKS = "GET_TASKS";
const UPDATE_TASK = "UPDATE_TASK";
const TOGGLE_TASK_INFO = "TOGGLE_TASK_INFO";
const DELETE_TASK = "DELETE_TASK";
const CHANGE_TITLE_TASK = "CHANGE_TITLE_TASK";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const CHANGE_TITLE_NOTE = "CHANGE_TITLE_NOTE";
const SET_CURRENT_TASK = "SET_CURRENT_TASK";
const TOGGLE_DETAIL = "TOGGLE_DETAIL";

const initialState = {
    tasks: [],
    currentTask: {},
    isLoaded: false,
    count: 0,
    toggleModal: false,
    toggleDetail: false,
    completedMode: false
}

const taskReducer = function (state = initialState, action) {
    switch(action.type){
        case ADD_TASK: {
            return  { ...state, tasks: [action.payload, ...state.tasks] }
        }

        case GET_TASKS: {
            return {
                ...state,
                tasks: action.payload
            }
        }

        case CHECK_TASK: {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    return item.id === action.id
                    ? {...item, status: !item.status}
                    : item
                })
            }
        }

        case UPDATE_TASK: {
            return {...state, 
                
                tasks: state.tasks.map(item => {
                    return item.id === action.payload.id
                    ? {...action.payload}
                    : item
                }),
                currentTask: action.payload}
        }

        case SET_CURRENT_TASK: {
            return {...state,
                currentTask: action.payload}
        }

        case CHANGE_TITLE_TASK: {
            return {...state, tasks: state.tasks.map(item => {
                return item.id === action.payload.id
                ? {...item, text: action.payload.title}
                : item
            })}
        }

        case TOGGLE_TASK_INFO: {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    return item.id === action.payload.id
                    ? {...item, toggleTaskInfo: !item.toggleTaskInfo}
                    : item
                })
            }
        }

        // case TOGGLE_TASK_NOTE: {
        //     return {
        //         ...state,
        //         tasks: state.tasks.map(item => {
        //             return item.id === action.payload.id
        //             ? {...item, note: action.payload.note}
        //             : item
        //         })
        //     }
            
        // }

        case TOGGLE_MODAL: {
            return {
                ...state,
                toggleModal: !state.toggleModal
            }
        }
        case TOGGLE_DETAIL: {
            return {
                ...state,
                toggleDetail: action.payload
            }
        }

        case DELETE_TASK: {
            
            return {
                ...state,
                tasks: [...state.tasks.filter(item => item.id !== action.id)]
            }
        }

        default:
            return state;
    }
};

export const addTask = (task) => ({type: ADD_TASK, payload: task})
export const getTasks = (tasks) => ({type: GET_TASKS, payload: tasks})
export const checkTask = (id) => ({type: CHECK_TASK, id})
export const deleteTask = (id) => ({type: DELETE_TASK, id})

export const changeTaskTitle = (payload) => ({type: CHANGE_TITLE_TASK, payload})

// export const changeTaskNote = (note) => ({type: CHANGE_TITLE_NOTE, payload: {id, note}})
export const toggleModal = () => ({type: TOGGLE_MODAL})
export const toggleDetail = (check) => ({type: TOGGLE_DETAIL, payload: check})

export const updateTask = (task) => ({type: UPDATE_TASK, payload: task})
export const setCurrentTask = (task) => ({type: SET_CURRENT_TASK, payload: task})
export const changeToggleTaskInfo = (payload) => ({type: TOGGLE_TASK_INFO, payload})

export default taskReducer;