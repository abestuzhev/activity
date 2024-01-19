
import $api from "../index";

export default class CategoryServices {

    /**
     *
     * @returns {Promise<any>}
     */
    static async getCategories() {
        try {
            const response = await $api.get('category/', )
            return response.data
        }catch(e) {
            console.log("CategoryService Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param category - object
     * @returns {Promise<any>}
     */
    static async addCategory(category) {
        try {
            const response = await $api.post('category/', category)
            return response.data
        }catch(e) {
            console.log("CategoryService Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param category - object
     * @returns {Promise<any>}
     */
    static async updateCategory(category) {
        try {
            const response = await $api.patch(`category/${category.id}/`, category)
            return response.data;
        }catch(e) {
            console.log("CategoryService Error:", e?.response?.data?.message)
        }
    }

    /**
     *
     * @param id - number
     * @returns {Promise<any>}
     */
    static async removeCategory(id) {
        try {
            const response = await $api.delete(`category/${id}/`)
            return response.data;
        }catch(e) {
            console.log("CategoryService Error:", e?.response?.data?.message)
        }
    }
}