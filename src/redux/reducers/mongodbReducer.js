import {createAction, handleActions} from "redux-actions";

const initialState = {
    mongodbUrl: {
        getQuizList : "v1/Qready/getQuizList",
        getShowList : "v1/Qready/showList",
        saveShow : "v1/Qready/save",//"http://13.39.86.114:8888/v1/Qready/save",
   }

}

export const mongodbReducer = handleActions({

}, initialState);

