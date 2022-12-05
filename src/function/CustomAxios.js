import axios from 'axios'
import {R_setCurrentShow, R_setId, R_setQuiz} from "../redux/reducers/quizInfoReducer";
import {useDispatch} from "react-redux";

const session = window.sessionStorage
const URL = "http://localhost:8080/"//process.env.REACT_APP_BACKEND_SERVER;

const CustomAxios = axios.create({
    baseURL: URL,
    headers: {
        // 'Authorization': session.getItem('access-token-jwt'),
        // 'Refresh': session.getItem('refresh-token-jwt'),
    }
})
export default CustomAxios

