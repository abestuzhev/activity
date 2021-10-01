import {combineReducers, createStore} from "redux";
import categoryReducer from "./reducers/categoryReducer";
import taskReducer from "./reducers/taskReducer";

const rootReducers = combineReducers({
    tasksPage: taskReducer,
    sidebar: categoryReducer
})

const persistedState = localStorage.getItem('reduxState') 
                        ? JSON.parse(localStorage.getItem('reduxState'))
                        : {}

const store = createStore(rootReducers, persistedState)
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})




window.s = store.getState();

export default store;

