import {createAction, handleActions} from "redux-actions";


const SET_DATA = "SET_DATA";
const SET_CONTENT = "SET_CONTENT";
const SET_ANSWER = "SET_ANSWER";

export const R_setData = createAction(SET_DATA);
export const R_setContent = createAction(SET_CONTENT);
export const R_setAnswer = createAction(SET_ANSWER);


// 사용법
// setData({key:'~', value:'~'})
// setContent({key:'~', value:'~'})

const initialState = {
    quizPlay:{
        pinNum:null,
        command: null,
        nickName: null,
        quiz : null,
        rank : [
            {
                nickName: "test1",
                score: 100,
                rank: 1
            },
            {
                nickName: "test2",
                score: 90,
                rank: 2
            },
            {
                nickName: "test3",
                score: 70,
                rank: 3
            }
        ]

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
        console.log(action.payload.value);
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
        console.log(action.payload);
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
}, initialState);
