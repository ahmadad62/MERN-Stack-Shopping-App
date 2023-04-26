import axios from 'axios'

// const BASE_URL = 'http://localhost:5000/api/';
const BASE_URL = 'https://mern-stack-shopping-app-api.onrender.com/api/';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjY3MzA2ZjA1OTkyM2MzNGMzMzk0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjUyMDU0OCwiZXhwIjoxNjgyNzc5NzQ4fQ.8w6SSkFV6lZsK9eYGi60GawS37NQXJ0u9Y3-OP-AMe0'
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})

