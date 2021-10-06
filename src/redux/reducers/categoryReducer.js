const ADD_CATEGORY = "ADD_CATEGORY";
const PUSH_TASK_IN_CATEGORY = "PUSH_TASK_IN_CATEGORY";
const DELETE_TASK_IN_CATEGORY = "DELETE_TASK_IN_CATEGORY";
const ADD_COLOR_CATEGORY = "ADD_COLOR_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const ADD_CURRENT_CATEGORY = "ADD_CURRENT_CATEGORY";

const initialState = {
    categories: [
        {
            id: 1, 
            name: "Текущий день",
            text: "Задачи хранятся только текущий день, далее они переносятся в папку с невыполненные задачи", 
            tasksId: [],
            default: true,
            color: ""
        },
        {
            id: 2, 
            name: "Важное", 
            text: "Задачи хранятся 3 дня. С каждым днем их важность снижается",
            tasksId: [],
            default: true,
            color: ""
        },
        {
            id: 3, 
            name: "Не выполнено", 
            text: "Задачи пропадают навсегда через 7 дней, потому что они либо выполнены либо выполнять их уже не надо",
            tasksId: [],
            default: true,
            color: ""
        },
        {
            id: 4, 
            name: "Моя категория",
            default: false,
            userId: "",
            text: "",
            tasksId: [],
            color: ""
        },
        
    ],
    currentCategory: null

}

const categoryReducer = function (state = initialState, action) {
    switch(action.type){
        case ADD_CATEGORY: return { ...state, categories: [...state.categories, action.payload] }
        case PUSH_TASK_IN_CATEGORY: 
            return { 
                ...state, 
                categories: state.categories.map(category => {
                    
                    return category.id === +action.payload.category[0]
                    ? {...category, tasksId: [...category.tasksId, action.payload.id]}
                    : category 
                })
            } 

        case ADD_COLOR_CATEGORY: 
            return { 
                ...state, 
                categories: state.categories.map(category => {
                    
                    return category.id === +action.payload.id
                    ? {...category, color: action.payload.color}
                    : category 
                })
            } 

        case ADD_CURRENT_CATEGORY: 
            return { 
                ...state, 
                currentCategory: action.payload
            }
            
        case DELETE_TASK_IN_CATEGORY: 
            return { 
                ...state, 
                categories: state.categories.map(category => {
                    return {...category, tasksId: category.tasksId.filter(item => item !== action.id) }
                })
            } 

        default:
            return state;
    }
};

export const addCategory = (category) => ({type: ADD_CATEGORY, payload: category})
export const pushTaskInCategory = (payload) => ({type: PUSH_TASK_IN_CATEGORY, payload})
export const addColorCategory = (payload) => ({type: ADD_COLOR_CATEGORY, payload})
export const deleteTaskInCategory = (id) => ({type: DELETE_TASK_IN_CATEGORY, id})
export const deleteCategory = (id) => ({type: DELETE_CATEGORY, id})
export const addCurrentCategory = (payload) => ({type: ADD_CURRENT_CATEGORY, payload})

export default categoryReducer;