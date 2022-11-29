import {createAction, handleActions} from "redux-actions";

const SET_DATA = "SET_DATA";
const SET_CONTENT = "SET_CONTENT";

export const setData = createAction(SET_DATA);
export const setContent = createAction(SET_CONTENT);

// 사용법
// setData({key:'~', value:'~'})
// setContent({key:'~', value:'~'})

const initialState = {
    quizPlay:{
        command: '',
        sender: '',
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
        console.log(action.payload);
        return {
            quizPlay: {
                ...state.quizPlay,
                [action.payload.key]: action.payload.value
            }
        }
    },
    [SET_CONTENT]: (state, action) => {
        console.log(action.payload);
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
