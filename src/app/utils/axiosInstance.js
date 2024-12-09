import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'https://codebreakers.online',
    baseURL: 'http://localhost:3000'
});

export default axiosInstance;