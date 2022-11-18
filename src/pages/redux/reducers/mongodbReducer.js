import {createAction, handleActions} from "redux-actions";

const initialState = {
    mongodbUrl: {
        getQuizList : "http://13.39.86.114:8888/v1/Qready/getQuizList",
        getShowList : "http://13.39.86.114:8888/v1/Qready/showList",
   }

}

export const mongodbReducer = handleActions({

}, initialState);

