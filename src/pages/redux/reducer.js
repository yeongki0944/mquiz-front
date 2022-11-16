import { combineReducers } from 'redux'
import quizInfoReducer from './reducers/quizInfoReducer'

const Reducer = combineReducers({
    quizInfo : quizInfoReducer,
    quizList : quizInfoReducer,
    currentShow : quizInfoReducer,
    currentQuiz : quizInfoReducer,
})

export default Reducer
