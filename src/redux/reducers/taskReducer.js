const ADD_TASK = "ADD_TASK";
const CHECK_TASK = "CHECK_TASK";
const GET_TASKS = "GET_TASKS";
const ADD_CURRENT_TASK = "ADD_CURRENT_TASK";
const TOGGLE_TASK_INFO = "TOGGLE_TASK_INFO";
const DELETE_TASK = "DELETE_TASK";

const initialState = {
    tasks: [],
    currentTask: {},
    toggleTaskInfo: false,
    isLoaded: false,
    count: 0
}

const taskReducer = function (state = initialState, action) {
    switch(action.type){
        case ADD_TASK: {
            return  { ...state, tasks: [action.payload, ...state.tasks] }
        }

        case CHECK_TASK: {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    return item.id === action.id
                    ? {...item, complete: true}
                    : item
                })
            }
        }

        case ADD_CURRENT_TASK: {
            return {...state, currentTask: action.payload}
        }

        case TOGGLE_TASK_INFO: {
            return {...state, toggleTaskInfo: action.payload}
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
export const getTasks = () => ({type: GET_TASKS})
export const checkTask = (id) => ({type: CHECK_TASK, id})
export const deleteTask = (id) => ({type: DELETE_TASK, id})

export const addCurrentTask = (task) => ({type: ADD_CURRENT_TASK, payload: task})
export const changeToggleTaskInfo = (payload) => ({type: TOGGLE_TASK_INFO, payload})

export default taskReducer;