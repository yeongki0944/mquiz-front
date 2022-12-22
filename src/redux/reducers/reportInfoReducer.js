import {createAction,handleActions} from "redux-actions";

const FLUSH_REPORT = "FLUSH_REPORT";
const SET_REPORTINFO = "SET_REPORTINFO";
const SET_REPORTLIST = "SET_REPORTLIST";

export const R_flushReport = createAction(FLUSH_REPORT);
export const R_setReportInfo = createAction(SET_REPORTINFO);
export const R_setReportList = createAction(SET_REPORTLIST);

const initialState = {
    reportInfo:{
        id:""
    },
    reportList:{
        id:""
    }
}

export const reportInfoReducer = handleActions({
    [FLUSH_REPORT]: (state, action) => {
        return {
            reportInfo: initialState.reportInfo,
            reportList: initialState.reportList
        }
    },
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
