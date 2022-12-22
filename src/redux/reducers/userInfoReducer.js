import {createAction,handleActions} from "redux-actions";

const FLUSH_USERINFO = "FLUSH_USERINFO";
const SET_USERINFO = "SET_USERINFO";
const EDIT_USERINFO = "EDIT_USERINFO";

export const R_flushUserInfo = createAction(FLUSH_USERINFO);
export const setUserInfo = createAction(SET_USERINFO);
export const editUserInfo = createAction(EDIT_USERINFO);

const initialState = {
    userInfo:{
        id : null,
        password : null,
        hostEmail : null,
        nickName: null,
        authNum : null,
        role: null,
    }
}

export const userInfoReducer = handleActions({
    [FLUSH_USERINFO] : (state,action) => {
        return {
            userInfo:initialState.userInfo
        }
    },
    [SET_USERINFO]: (state,action) => {
        return {
            ...state,
            userInfo: action.payload
        }
    },
    [EDIT_USERINFO]: (state,action) => {
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                [action.payload.key]: action.payload.value
            }
        }
    }
},initialState);
