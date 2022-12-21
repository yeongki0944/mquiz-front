import { combineReducers } from 'redux'
import {quizInfoReducer} from "./reducers/quizInfoReducer";
import {quizListReducer} from "./reducers/quizListReducer";
import {mongodbReducer} from "./reducers/mongodbReducer";
import {quizPlayReducer} from "./reducers/quizplayReducer";
import {userInfoReducer} from "./reducers/userInfoReducer";
import {pageControlReducer} from "./reducers/pageControlReducer";
import {reportInfoReducer} from "./reducers/reportInfoReducer";

export default combineReducers({
    quiz: quizInfoReducer,
    quizList: quizListReducer,
    quizPlay: quizPlayReducer,
    mongodbUrl : mongodbReducer,
    userInfo: userInfoReducer,
    page : pageControlReducer,
    reportInfo : reportInfoReducer,
    reportList : reportInfoReducer
})

