import {createAction,handleActions} from "redux-actions";

const SET_REPORTINFO = "SET_REPORTINFO";
const SET_REPORTLIST = "SET_REPORTLIST";

export const R_setReportInfo = createAction(SET_REPORTINFO);
export const R_setReportList = createAction(SET_REPORTLIST);

const initialState = {
    reportInfo:{},
    reportList:{}
}

export const reportInfoReducer = handleActions({
    [SET_REPORTINFO]: (state,action) => {
        return {
            ...state,
            reportInfo: action.payload
        }
    },
    [SET_REPORTLIST]: (state, action)=>{
        return {
            ...state,
            reportList: action.payload
        }
    }
},initialState);
