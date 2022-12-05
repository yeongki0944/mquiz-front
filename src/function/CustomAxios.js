import axios from 'axios'

const session = window.sessionStorage
const URL = process.env.REACT_APP_BACKEND_SERVER;

const CustomAxios = axios.create({
    baseURL: URL,
    headers: {
        // 'Authorization': session.getItem('access-token-jwt'),
        // 'Refresh': session.getItem('refresh-token-jwt'),
    }
})
export default CustomAxios

