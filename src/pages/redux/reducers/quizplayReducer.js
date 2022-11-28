import {createAction, handleActions} from "redux-actions";

const SET_CURRENT_SHOW_PLAY = "SET_CURRENT_SHOW_PLAY";

export const R_setCurrentShow_play = createAction(SET_CURRENT_SHOW_PLAY);

const initialState = {
    quizPlay:{
        userInfo:{},
        currentShow: 1,
        answer:'',
        result:{},
    }
}

export const quizPlayReducer = handleActions({
    [SET_CURRENT_SHOW_PLAY]: (state, action) => {
        console.log(action.payload);
        return {
            quizPlay: {
                ...state.quizPlay,
                currentShow: action.payload
            }
        }
    }
}, initialState);
