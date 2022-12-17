import axios from 'axios'

const session = window.sessionStorage


export const CustomAxios_SHOW = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER_SHOW,
    headers: {
        // 'Authorization': session.getItem('access-token-jwt'),
        // 'Refresh': session.getItem('refresh-token-jwt'),
    }
})

export const CustomAxios_PLAY = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER_PLAY,
    headers: {
        // 'Authorization': session.getItem('access-token-jwt'),
        // 'Refresh': session.getItem('refresh-token-jwt'),
    }
})

