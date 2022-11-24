import {createAction, handleActions} from "redux-actions";

const SET_CURRENT_SHOW = "SET_CURRENT_SHOW";

export const R_setCurrentShow = createAction(SET_CURRENT_SHOW);

const initialState = {
    quizPlay:{
        userInfo:{},
        currentShow: 0,
        answer:'',
        result:{},
    }
}

export const quizPlayReducer = handleActions({
    [SET_CURRENT_SHOW]: (state, action) => {
        console.log(action.payload);
        return {
            quizPlay: {
                ...state.quizPlay,
                currentShow: action.payload
            }
        }
    }
}, initialState);
