import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjY3MzA2ZjA1OTkyM2MzNGMzMzk0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDU0MzIzMiwiZXhwIjoxNjgwODAyNDMyfQ.h-oz-_uTHzupIiVcRZALvae39EMWtnFtCU0-TkWRfXc'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
})