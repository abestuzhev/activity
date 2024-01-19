
import $api from "../index";

export default class TaskServices {
    /**
     *
     * @returns {Promise<any>}
     */
    static async getTasks() {
        try {
            const response = await $api.get('task/', )
            return response.data
        }catch(e) {
            console.log("TaskServices Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param task - object
     * @returns {Promise<any>}
     */
    static async addTask(task) {
        try {
            const response = await $api.post('task/create/', task)
            return response.data
        }catch(e) {
            console.log("TaskService Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param task - object
     * @returns {Promise<any>}
     */
    static async updateTask(task) {
        try {
            const response = await $api.patch(`task/update/${task.id}/`, task)
            return response.data;
        }catch(e) {
            console.log("TaskService Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param id - number - id task
     * @returns {Promise<any>}
     */
    static async removeTask(id) {
        try {
            const response = await $api.delete(`task/delete/${id}/`)
            return response.data;
        }catch(e) {
                console.log("TaskService Error:", e?.response?.data?.message)
        }
    }
}