import { combineReducers } from 'redux'
import quizInfoReducer from './reducers/quizInfoReducer'
import quizListReducer from "./reducers/quizListReducer";

const Reducer = combineReducers({
    quizInfo : quizInfoReducer,
    quizData : quizInfoReducer,
    currentShow : quizInfoReducer,
    currentQuiz : quizInfoReducer,
    quizList : quizListReducer,
})

export default Reducer
