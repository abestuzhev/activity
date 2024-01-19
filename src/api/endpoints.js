import $api from "./index";
import AuthService from "./services/UserServices";
import axios from "axios";
import TaskService from "./services/TaskServices";


export const apiLogin = async (username, password) => {

    try {
        const response = await AuthService.login(username, password)
        localStorage.setItem('token', response.data.access)
        return response
    } catch(e) {
        console.log("apiLogin Error:", e?.response?.data?.message)
    }

}

export const apiLogout = () => {
    try {
        localStorage.removeItem('token')
    } catch(e) {
        console.log("apiLogout Error:", e?.response?.data?.message)
    }

}


