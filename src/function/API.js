import CustomAxios, {CustomAxios_PLAY, CustomAxios_SHOW} from "./CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import store from "../redux/store";
import {R_setCurrentShow, R_setId, R_setQuiz} from "../redux/reducers/quizInfoReducer";
import {R_setData} from "../redux/reducers/quizplayReducer";
import {setPinNum} from "./localStorage";
import {redirectPage} from "./common";

/**
 * 로그인 처리
 * type : POST
 * Input:{hostEmail,password}
 * Output: true/false
 */
export const loginAPI = async (data) => {
    return await CustomAxios_SHOW.post("/v1/hostauth/login", data);
};

/**
 * 회원가입 처리
 * type: POST
 * Input:{hostEmail,password}
 * Output: true/false
 */
export const registerAPI = async (data) => {
    return await CustomAxios_SHOW.post("/v1/hostauth/join", data);
};

/**
 * Play 접속
 * type: POST
 * Input:{pinNum}
 * Output: true/false
 */
export const enterRoomAPI = async (pinNum) => {
    return await CustomAxios_PLAY.post("/joinroom", {pinNum: pinNum});
};

/**
 * Show 목록 Fetch
 * type: GET
 * Input: email
 */

export const setShowListAPI = async (email) => {
    await CustomAxios_SHOW.get("/v1/show/List?email=" + email)
        .then((res) => {
            if (res.status === 200) {
                store.dispatch(R_setQuizList(res.data.data))
            } else {
            }
        }).catch((err) => {
        })
}

/**
 * Show 생성 API
 * type: POST
 * Input: {quizInfo,quizData}
 * Output: true/false
 */

export const createShowAPI = async (data) => {
    return await CustomAxios_SHOW.post("/v1/show", data);
}

/**
 * Show 정보 Fetch
 * type: GET
 * Input: quizId
 * Output: null
 */

export const getShowInfoAPI = async (quizId) => {
    await CustomAxios_SHOW.get("/v1/show?showId=" + quizId)
        .then((res) => {
            console.log(res.data.data);
            store.dispatch(R_setId(quizId));
            store.dispatch(R_setQuiz(res.data.data));
            store.dispatch(R_setCurrentShow(1));
        }).catch((err) => {
            console.log(err);
        })
}

/** Show 편집저장 API
 * type: POST
 * Input: {quiz}
 * Output: true/false
 */
export const saveShowAPI = async (quiz) => {
    return await CustomAxios_SHOW.post('/v1/show', quiz);
}

/**
 * Show 삭제 API
 * type: DELETEe
 * Input: quizId
 * Output: true/false
 */
export const deleteShowAPI = async (quizId) => {
    return await CustomAxios_SHOW.delete("/v1/show?showId=" + quizId);
}

/**
 * Play 생성
 * type: POST
 * Input: {quizId}
 * Output: true/false
 */
export const createPlayAPI = async (quizId) => {
    return await CustomAxios_PLAY.post("/v1/host/createPlay", {id: quizId})
}
