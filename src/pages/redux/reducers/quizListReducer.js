import {createAction,handleActions} from "redux-actions";

const SET_QUIZ_LIST = "SET_QUIZ_LIST";

export const setQuizList = createAction(SET_QUIZ_LIST);

const initialState = {
    quizList: []
}

export const quizListReducer = handleActions({
    [SET_QUIZ_LIST]: (state,action) => {
        return {
            ...state,
            quizList: action.payload
        }
    }
},initialState)
