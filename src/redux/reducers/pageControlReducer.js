import {createAction, handleActions} from "redux-actions";

const SET_PAGE = "SET_PAGE";


export const R_setPage = createAction(SET_PAGE);
const initialState = {
    page: {
        page:'MAIN'
    }
}


export const pageControlReducer = handleActions({
    [SET_PAGE]: (state, action) => {
        return {
            ...state,
            page: {
                page: action.payload
            }
        }
    },

}, initialState);
