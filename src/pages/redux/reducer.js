import { combineReducers } from 'redux'
import quizInfoReducer from "./reducers/quizInfoReducer";
import {quizListReducer} from "./reducers/quizListReducer";
import {mongodbReducer} from "./reducers/mongodbReducer";

export default combineReducers({
    quiz: quizInfoReducer,
    quizList: quizListReducer,
    mongodbUrl : mongodbReducer,
})

