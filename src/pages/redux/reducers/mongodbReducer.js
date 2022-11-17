const initialState = {
    mongodbUrl: {
        url : "http://13.39.86.114:8888",
        getQuizList : "/v1/Qready/getQuizList",
   }

}

export default function mongodbReducer(state = initialState, action) {
    switch (action.type) {
        case "Mongodb_Data":
            console.log("Mongodb_Data")
            //set print quiz as /v1/Qready/quiz
            return {
                ...state,
                mongodbUrl: {
                    ...state.mongodbUrl,
                    printquiz: action.payload
                }
            }

        default:
            return state;
    }
}
