import {combineReducers, createStore} from "redux";
import categoryReducer from "./reducers/categoryReducer";
import taskReducer from "./reducers/taskReducer";
import authReducer from "./reducers/authReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    tasksPage: taskReducer,
    sidebar: categoryReducer
})

const persistedState = localStorage.getItem('reduxState') 
                        ? JSON.parse(localStorage.getItem('reduxState'))
                        : {}

const store = createStore(rootReducers,
    // persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})


// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch



window.s = store.getState();

export default store;

