import {createAction, handleActions} from "redux-actions";


const SET_DATA = "SET_DATA";
const SET_CONTENT = "SET_CONTENT";

export const R_setData = createAction(SET_DATA);
export const R_setContent = createAction(SET_CONTENT);

// 사용법
// setData({key:'~', value:'~'})
// setContent({key:'~', value:'~'})

const initialState = {
    quizPlay:{
        pinNum:0,
        command: null,
        sender: '',
        quizId: '',
        quizNum : 1,
        content : {
            answer: '',
            solved_time: 0,
        }
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
}, initialState);
