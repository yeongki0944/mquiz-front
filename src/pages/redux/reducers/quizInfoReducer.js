const initialState = {
    quizInfo: {
        "_id": "637440e817bb6d42edbf3927",
        "showInfo": {
            "email": "dudrl0944@gmail.com",
            "title": "쇼 제목",
            "category": "일단",
            "tags": [
                "1번",
                "2번",
                "3번"
            ],
            "titleImg_origin": "url",
            "titleImg_thumb": "url",
            "createDate": "2022-11-11T00:00:00.000+00:00",
            "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
            "state": "작성중",
            "pulic": false
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
        case "SET_CURRENT_SHOW": //현재 조회중인 쇼 num
            return {
                ...state,
                currentShow: action.payload
            }

        case "SET_QUIZ_INFO": //쇼 정보 설정
            return {
                ...state,
                quizInfo: action.payload
            }

        case "ADD_QUIZ": //퀴즈 추가
            return {
                ...state,
                quizData: [...state.quizData, {
                    "num": state.quizData.length + 1,
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

        case "DELETE_QUIZ": //선택된 퀴즈 삭제
            //delete quiz where quiz.num = action.payload.quizNum
            let index = state.quizData.findIndex(quiz => quiz.num === action.payload.quizNum);
            state.quizData.splice(index, 1);
            return {
                ...state,
                quizData: state.quizData
            };

        case "COPY_QUIZ": //선택된 퀴즈 복사
            return {
                ...state,
                quizData: [...state.quizData, {
                    ...state.quizData[action.payload.quizNum - 1],
                    num: state.quizData.length + 1
                }]
            }

        case "RENUMBER_QUIZ": //퀴즈 번호 재정렬
            return {
                ...state,
                quizData: state.quizData.map((quiz, index) => {
                    quiz.num = index + 1;
                    return quiz;
                })
            }


        case "MODIFY_QUIZ": //퀴즈 수정
            // console.log(action.payload.keytype+" "+action.payload.key+" "+action.payload.value);
            let quizIndex = state.quizData.findIndex(quiz => quiz.num === state.currentShow);
            // console.log(state.quizData[quizIndex].media[action.payload.key]);
            switch (action.payload.keytype) {
                case "base":
                    state.quizData[quizIndex][action.payload.key] = action.payload.value;
                    return {
                        ...state,
                        quizData: state.quizData
                    }
                case "media":
                    state.quizData[quizIndex].media[action.payload.key] = action.payload.value;
                    return {
                        ...state,
                        quizData: state.quizData
                    }
                case "choice":
                    state.quizData[quizIndex].choiceList[action.payload.key] = action.payload.value;
                    return {
                        ...state,
                        quizData: state.quizData
                    }
            }

        default:
            return state;
    }
}
