import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL + '/api/';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            await $api.request(originalRequest);
        } catch (e) {
            console.log('Not auth');
        }
    }

    throw err;
});

export default $api;
