import { combineReducers } from 'redux'
import {quizInfoReducer} from "./reducers/quizInfoReducer";
import {quizListReducer} from "./reducers/quizListReducer";
import {mongodbReducer} from "./reducers/mongodbReducer";
import {quizPlayReducer} from "./reducers/quizplayReducer";

export default combineReducers({
    quiz: quizInfoReducer,
    quizList: quizListReducer,
    quizPlay: quizPlayReducer,
    mongodbUrl : mongodbReducer,
})

