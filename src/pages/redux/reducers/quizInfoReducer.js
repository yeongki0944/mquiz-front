import {createAction, handleActions} from "redux-actions";

const SET_QUIZ = "SET_QUIZ";
const MAKE_QUIZ_SHOW = 'MAKE_QUIZ_SHOW';
const SET_CURRENT_SHOW = 'SET_CURRENT_SHOW';
const SET_QUIZ_INFO = 'SET_QUIZ_INFO';
const ADD_QUIZ = 'ADD_QUIZ';
const DELETE_QUIZ = 'DELETE_QUIZ';
const COPY_QUIZ = 'COPY_QUIZ';
const RENUMBER_QUIZ = 'RENUMBER_QUIZ';
const MODIFY_QUIZ = 'MODIFY_QUIZ';
const MODIFY_QUIZ_ANSWER = 'MODIFY_QUIZ_ANSWER';
const SET_ID = 'SET_ID';


export const R_setQuiz = createAction(SET_QUIZ);
export const R_makeQuizShow = createAction(MAKE_QUIZ_SHOW);
export const R_setCurrentShow = createAction(SET_CURRENT_SHOW);
export const R_setQuizInfo = createAction(SET_QUIZ_INFO);
export const R_addQuiz = createAction(ADD_QUIZ);
export const R_deleteQuiz = createAction(DELETE_QUIZ);
export const R_copyQuiz = createAction(COPY_QUIZ);
export const R_renumberQuiz = createAction(RENUMBER_QUIZ);
export const R_modifyQuiz = createAction(MODIFY_QUIZ);
export const R_modifyQuizAnswer = createAction(MODIFY_QUIZ_ANSWER);
export const R_setId = createAction(SET_ID);

const initialState = {
    quiz: {
        id: "",
        quizInfo: {
                // "email": "dudrl0944@gmail.com",
                // "title": "쇼 제목",
                // "category": "일단",
                // "tags": [
                //     "1번",
                //     "2번",
                //     "3번"
                // ],
                // "titleImg_origin": "url",
                // "titleImg_thumb": "url",
                // "createDate": "2022-11-11T00:00:00.000+00:00",
                // "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
                // "state": "작성중",
                // "pulic": false
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
                    // "startTime": "",
                    // "endTime": "",
                },
                "choiceList": {
                    "num1": "답을 입력해 주세요",
                    "num2": "답을 입력해 주세요",
                    "num3": "",
                    "num4": ""
                },
                "answer": [],
                "time": 0,
                "useScore": true,
                "rate": 0
            }
        ],
    }

}


export const quizInfoReducer = handleActions({
    [SET_QUIZ]: (state, action) => {
        console.log("SET_QUIZ");
        return {
            ...state,
            quiz: action.payload
        }
    },
    [SET_ID]: (state, action) => {
        console.log("SET_ID");
        return {
            ...state,
            quiz: {
                ...state.quiz,
                id: action.payload
            }
        }
    },
    [MAKE_QUIZ_SHOW]:(state, action)=>{

        return {
            ...state,
            quiz: {
                ...state.quiz,
                quizInfo: {
                    ...state.quiz.quizInfo,
                    [action.payload.key]: action.payload.value
                }
            }
        }
        // return {
        //     ...state,
        //     quiz: {
        //         ...state.quiz,
        //         quizInfo:action.payload
        //     }
        // }
    },
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
                        },
                        "choiceList": {
                            "num1": "답을 입력해 주세요",
                            "num2": "답을 입력해 주세요",
                            "num3": "",
                            "num4": ""
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
                // console.log(action.payload);
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
}, initialState);
