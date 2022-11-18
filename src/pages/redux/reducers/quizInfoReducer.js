import {createAction, handleActions} from "redux-actions";

const SET_CURRENT_SHOW = 'SET_CURRENT_SHOW';
const SET_QUIZ_INFO = 'SET_QUIZ_INFO';
const ADD_QUIZ = 'ADD_QUIZ';
const DELETE_QUIZ = 'DELETE_QUIZ';
const COPY_QUIZ = 'COPY_QUIZ';
const RENUMBER_QUIZ = 'RENUMBER_QUIZ';
const MODIFY_QUIZ = 'MODIFY_QUIZ';
const MODIFY_QUIZ_ANSWER = 'MODIFY_QUIZ_ANSWER';

export const setCurrentShow = createAction(SET_CURRENT_SHOW);
export const setQuizInfo = createAction(SET_QUIZ_INFO);
export const addQuiz = createAction(ADD_QUIZ);
export const deleteQuiz = createAction(DELETE_QUIZ);
export const copyQuiz = createAction(COPY_QUIZ);
export const renumberQuiz = createAction(RENUMBER_QUIZ);
export const modifyQuiz = createAction(MODIFY_QUIZ);
export const modifyQuizAnswer = createAction(MODIFY_QUIZ_ANSWER);

const initialState = {
    quiz: {
        _id: "637440e817bb6d42edbf3927",
        quizInfo: {
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
        currentShow: 1,
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
    }

}


const quizInfoReducer = handleActions({
    [SET_CURRENT_SHOW]: (state, action) => {
        return {
            ...state,
            quiz: {
                ...state.quiz,
                currentShow: action.payload
            }
        }
    },
    [SET_QUIZ_INFO]: (state, action) => {
        return {
            ...state,
            quiz: {
                ...state.quiz,
                quizInfo: action.payload
            }
        }
    },
    [ADD_QUIZ]: (state, action) => {
        return {
            ...state,
            quiz: {
                ...state.quiz,
                quizData: [
                    ...state.quiz.quizData, {
                        "num": state.quiz.quizData.length + 1,
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
        }
    },
    [DELETE_QUIZ]: (state, action) => {
        // let index = state.quizData.findIndex(quiz => quiz.num === action.payload.quizNum);
        // state.quizData.splice(index, 1);

        let index = state.quiz.quizData.findIndex(quiz => quiz.num === action.payload.quizNum);
        state.quiz.quizData.splice(index, 1);
        return {
            ...state,
            quiz: {
                ...state.quiz,
                quizData: [
                    ...state.quiz.quizData
                ]
            }
        }
    },
    [COPY_QUIZ]: (state, action) => {
        console.log("COPY_QUIZ");
        return {
            ...state,
            quiz: {
                ...state.quiz,
                quizData: [...state.quiz.quizData, {
                    ...state.quiz.quizData[action.payload - 1],
                    num: state.quiz.quizData.length + 1
                }]
            }
        }
    },
    [RENUMBER_QUIZ]: (state, action) => {
        return {
            ...state,
            quizData: state.quizData.map((quiz, index) => {
                quiz.num = index + 1;
                return quiz;
            })
        }
    },
    [MODIFY_QUIZ]: (state, action) => {
        let quizIndex = state.quiz.quizData.findIndex(quiz => quiz.num === state.quiz.currentShow);
        switch (action.payload.keytype)
        {
            case "base":
                state.quiz.quizData[quizIndex][action.payload.key] = action.payload.value;
                return {
                    ...state,
                    quiz: {
                        ...state.quiz,
                        quizData: [
                            ...state.quiz.quizData
                        ]
                    }
                }
            case "media":
                state.quiz.quizData[quizIndex].media[action.payload.key] = action.payload.value;
                return {
                    ...state,
                    quiz: {
                        ...state.quiz,
                        quizData: state.quiz.quizData
                    }
                }
            case "choiceList":
                state.quiz.quizData[quizIndex].choiceList[action.payload.key] = action.payload.value;
                return {
                    ...state,
                    quiz: {
                        ...state.quiz,
                        quizData: state.quiz.quizData
                    }
                }
        }
    },
    [MODIFY_QUIZ_ANSWER]: (state, action) => {
        let quizIndex2 = state.quiz.quizData.findIndex(quiz => quiz.num === state.quiz.currentShow);
        state.quiz.quizData[quizIndex2].answer = action.payload;
        return {
            ...state,
            quiz: {
                ...state.quiz,
                quizData: state.quiz.quizData
            }
        }
    },
//     case "MAKE_QUIZ_INFO":
// console.log(action.payload);
// return{
//     ...state,
//     quizInfo: {
//         ...state,
//         title: action.payload.title,
//         category:action.payload.category,
//         tags:action.payload.tags,
//         titleimg_origin:action.payload.titleimg_origin,
//         titleimg_thumb:action.payload.titleimg_thumb,
//         createDate:action.payload.createDate,
//         lastModifyDate:action.payload.lastModifyDate,
//         state:action.payload.state,
//         pulic:action.payload.pulic
//     }
// }

}, initialState);
export default quizInfoReducer;
