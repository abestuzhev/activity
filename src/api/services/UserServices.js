import $api, {API_URL} from "../index";
import axios from "axios";

export default class UserServices {

    /**
     *
     * @param username - string
     * @param password - string
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    static async login(username, password) {
        try {
            const response = await $api.post('/user/token/', {username, password})
            localStorage.setItem('token', response.data.access)
            return response

        } catch(e) {
            console.log("apiLogin Error:", e?.response?.data?.message)
        }

    }

    /**
     *
     * @param id - number
     * @returns {Promise<any>}
     */
    static async getUser(id) {
        try {
            const response = await axios.get(`${API_URL}user/${id}/`)
            return response.data
        }catch(e) {
            console.log("TaskServices Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param username - string
     * @param password - string
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    static async registration(username, password) {
        return $api.post('/user/create', {username, password})
    }

    /**
     *
     * @returns {Promise<void>}
     */
    static async logout() {
        localStorage.removeItem('token')
    }

}