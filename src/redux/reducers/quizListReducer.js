import {createAction,handleActions} from "redux-actions";

const FLUSH_QUIZ_LIST = "FLUSH_QUIZ_LIST";
const SET_QUIZ_LIST = "SET_QUIZ_LIST";

export const R_flushQuizList = createAction(FLUSH_QUIZ_LIST);
export const R_setQuizList = createAction(SET_QUIZ_LIST);

const initialState = {
    quizList: []
}

export const quizListReducer = handleActions({
    [FLUSH_QUIZ_LIST]: (state, action) => {
        return {
            quizList: initialState.quizList
        }
    },
    [SET_QUIZ_LIST]: (state,action) => {
        return {
            ...state,
            quizList: action.payload
        }
    }
},initialState)
