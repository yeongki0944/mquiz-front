import {createAction, handleActions} from "redux-actions";


const SET_DATA = "SET_DATA";
const SET_CONTENT = "SET_CONTENT";
const SET_ANSWER = "SET_ANSWER";
const SET_BAN = "SET_BAN";
export const R_setData = createAction(SET_DATA);
export const R_setContent = createAction(SET_CONTENT);
export const R_setAnswer = createAction(SET_ANSWER);
export const R_setBan = createAction(SET_BAN);

// 사용법
// setData({key:'~', value:'~'})
// setContent({key:'~', value:'~'})

const initialState = {
    quizPlay:{
        pinNum:null,
        command: null,
        nickName: null,
        quiz : null,
        userList : [],
        bannedNickName: null,
        rank : null,
    }
}
export const quizPlayReducer = handleActions({

    //신버전
    [SET_DATA]: (state, action) => {
        return {
            quizPlay: {
                ...state.quizPlay,
                [action.payload.key]: action.payload.value
            }
        }
    },
    [SET_CONTENT]: (state, action) => {
        return {
            quizPlay: {
                ...state.quizPlay,
                content: {
                    ...state.quizPlay.content,
                    [action.payload.key]: action.payload.value
                }
            }
        }
    },
    [SET_ANSWER]: (state, action) => {
        return {
            quizPlay: {
                ...state.quizPlay,
                submit: {
                    answerTime: action.payload.answerTime,
                    answer: action.payload.answer
                }
            }
        }
    },
    [SET_BAN]: (state, action) => {
        if(state.quizPlay.nickName === action.payload.value){
            state.quizPlay.command = "KICK";
        }

        return {
            quizPlay: {
                ...state.quizPlay,
            }

        }
    },
}, initialState);
