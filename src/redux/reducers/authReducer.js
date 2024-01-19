const SET_USER = "auth/SET_USER";
const SET_IS_AUTH = "auth/SET_IS_AUTH";

const initialState = {
    user: {},
    isAuth: false,
    isLoaded: false,
}

const authReducer = function (state = initialState, action) {
    switch(action.type){

        case SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }

        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.payload
            }
        }



        default:
            return state;
    }
};

export const setUser = (user) => ({type: SET_USER, payload: user})
export const setIsAuth = (value) => ({type: SET_IS_AUTH, payload: value})

export default authReducer;