//https://www.youtube.com/watch?v=fN25fMQZ2v0&t=5022s&ab_channel=UlbiTV

import axios from 'axios';
export const API_URL = "http://127.0.0.1:8000/"

const $api = axios.create({
    withCredentials:true,
    baseURL: API_URL,
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;

