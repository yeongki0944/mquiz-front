import axios from 'axios'
import {R_setCurrentShow, R_setId, R_setQuiz} from "../redux/reducers/quizInfoReducer";
import {useDispatch} from "react-redux";

const session = window.sessionStorage

export const URL = 'http://localhost:8080'; //'http://13.39.86.114:8888/'

const CustomAxios = axios.create({
    baseURL: URL,
    headers: {
        // 'Authorization': session.getItem('access-token-jwt'),
        // 'Refresh': session.getItem('refresh-token-jwt'),
    }
})
export default CustomAxios

