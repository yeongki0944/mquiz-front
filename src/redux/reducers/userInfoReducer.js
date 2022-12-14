import {createAction,handleActions} from "redux-actions";

const SET_USERINFO = "SET_USERINFO";
const EDIT_USERINFO = "EDIT_USERINFO";

export const setUserInfo = createAction(SET_USERINFO);
export const editUserInfo = createAction(EDIT_USERINFO);

const initialState = {
    userInfo:{
        id : null,
        password : null,
        hostEmail : null,
        nickName: null,
        role: null,
    }
}

export const userInfoReducer = handleActions({
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
