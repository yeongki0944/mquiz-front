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
        command: '',
        sender: '',
        quizNum : 1,
        content : {
            selected: '',
            totalElapsedTime:0,
            ans: '',
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
