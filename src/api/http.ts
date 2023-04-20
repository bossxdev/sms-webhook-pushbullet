import axios from 'axios'
import Config from '../config/config'

const { BASE_API, API_KEY } = Config

export const pushbulletHttp = axios.create({
    baseURL: BASE_API,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'dp-x-nvsl-api-key': API_KEY,
    },
})
