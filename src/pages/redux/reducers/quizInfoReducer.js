const initialState = {
    quizInfo: {
        _id: "quizId01",
        showInfo: {
            owner: "User Email",
            title: "쇼 제목",
            category: "일단",
            tags: ["1번", "2번", "3번"],
            titleImg_origin: "url",
            titleImg_thumb: "url",
            createDate: "생성시간",
            lastModifyDate: "최근수정시간",
            isPublic: true,
            state: "작성중, 완성"
        }
    },
    quizData: [
        {
            "num": 1,
            "type": "선택형",
            "question": " ",
            "media": {
                "type": "image",
                "url": "",
                "startTime": "",
                "endTime": "",
            },
            "choiceList": {
                "1": "답을 입력해 주세요",
                "2": "답을 입력해 주세요",
                "3": "",
                "4": ""
            },
            "answer": [],
            "time": 0,
            "useScore": true,
            "rate": 0
        }
    ],
    currentShow: 1,

}

export default function quizInfoReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_QUIZ_INFO":
            console.log(action.payload.title);
            return {
                ...state,
                quizInfo: {
                    ...state.quizInfo,
                    showInfo: action.payload
                }
            };
        case "DELETE_QUIZ":
            //delete quiz where quiz.num = action.payload.quizNum
            let index = state.quizList.findIndex(quiz => quiz.num === action.payload.quizNum);
            state.quizList.splice(index, 1);
            return {
                ...state,
                quizList: state.quizList
            };


        case "ADD_QUIZ":
            return {
                ...state,
                quizList: [...state.quizList, {
                    "num": state.quizList.length + 1,
                    "type": "선택형",
                    "question": " ",
                    "media": {
                        "type": "image",
                        "url": "",
                        "startTime": "",
                        "endTime": "",
                    },
                    "choiceList": {
                        "1": "답을 입력해 주세요",
                        "2": "답을 입력해 주세요",
                        "3": "",
                        "4": ""
                    },
                    "answer": [],
                    "time": 0,
                    "useScore": true,
                    "rate": 0
                }]
            }
        case "RENUMBER_QUIZ":
            return {
                ...state,
                quizList: state.quizList.map((quiz, index) => {
                    quiz.num = index + 1;
                    return quiz;
                })
            }
        case "COPY_QUIZ":
            return {
                ...state,
                quizList: [...state.quizList, {
                    ...state.quizList[action.payload.quizNum - 1],
                    num: state.quizList.length + 1
                }]
            }
        case "SET_CURRENT_SHOW":
            return {
                ...state,
                currentShow: action.payload
            }
        case "SET_CURRENT_QUIZ":
            //set currentquiz as quiz where quiz.num = status.currentShow
            return {
                ...state,
                currentQuiz: state.quizList.find(quiz => quiz.num === state.currentShow)
            }
        case "MODIFY_QUIZ":
            // console.log(action.payload.keytype+" "+action.payload.key+" "+action.payload.value);
            let quizIndex = state.quizList.findIndex(quiz => quiz.num === state.currentShow);
            // console.log(state.quizList[quizIndex].media[action.payload.key]);
            switch (action.payload.keytype) {
                case "base":
                    state.quizList[quizIndex][action.payload.key] = action.payload.value;
                    return {
                        ...state,
                        quizList: state.quizList
                    }
                case "media":
                    state.quizList[quizIndex].media[action.payload.key] = action.payload.value;
                    return {
                        ...state,
                        quizList: state.quizList
                    }
                case "choice":
                    state.quizList[quizIndex].choiceList[action.payload.key] = action.payload.value;
                    return {
                        ...state,
                        quizList: state.quizList
                    }
            }
        default:
            return state;
    }
}
