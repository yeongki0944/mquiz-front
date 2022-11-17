import { combineReducers } from 'redux'
import quizInfoReducer from './reducers/quizInfoReducer'
import quizListReducer from "./reducers/quizListReducer";
import mongodbReducer from "./reducers/mongodbReducer";

const Reducer = combineReducers({
    quizInfo : quizInfoReducer,
    quizData : quizInfoReducer,
    currentShow : quizInfoReducer,
    currentQuiz : quizInfoReducer,
    quizList : quizListReducer,
    mongodbUrl : mongodbReducer
})

export default Reducer
