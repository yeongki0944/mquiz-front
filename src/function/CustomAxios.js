import axios from 'axios'

const session = window.sessionStorage
// const URL = process.env.REACT_APP_BACKEND_SERVER;
const URL = "http://15.152.42.217:8888";


const CustomAxios = axios.create({
    baseURL: URL,
    headers: {
        // 'Authorization': session.getItem('access-token-jwt'),
        // 'Refresh': session.getItem('refresh-token-jwt'),
    }
})
export default CustomAxios

