import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 1000
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage['accessToken'];
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const res = await axiosInstance.post('token', { token: localStorage['refreshToken'] });
            localStorage.setItem('accessToken', res.data.accessToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage['accessToken']}`;
            return axiosInstance(originalConfig);
        }
        return Promise.reject(error);
    }
);
