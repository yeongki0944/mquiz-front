import {CustomAxios_LAMDA, CustomAxios_PLAY, CustomAxios_SHOW} from "./CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import store from "../redux/store";
import {R_setCurrentShow, R_setId, R_setQuiz} from "../redux/reducers/quizInfoReducer";
import {R_setReportInfo, R_setReportList} from "../redux/reducers/reportInfoReducer";

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
 * 회원가입 이메일 중복 확인
 * type: POST
 * Input:{hostEmail}
 * Output: true/false
 */
export const checkEmailAPI = async(data) => {
    return await CustomAxios_SHOW.post("/v1/hostauth/join/checkHostEmail", data);
};

/**
 * 회원가입 이메일 인증번호 전송
 * type: POST
 * Input:{hostEmail}
 * Output: true(ePw)/false
 */
export const emailSendAuthNumAPI = async(data) => {
    return await CustomAxios_SHOW.post("/v1/hostauth/join/mailConfirm", data);
};

/**
 * 회원가입 이메일 인증번호 확인
 * type: POST
 * Input:{authNum}
 * Output: true/false
 */
export const checkEmailAuthNumAPI = async(data) => {
    return await CustomAxios_SHOW.post("/v1/hostauth/join/verifyEmail", data);
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
    await CustomAxios_LAMDA.get("/show/list/" + email)
        .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                store.dispatch(R_setQuizList(res.data.Items))
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
    return await CustomAxios_LAMDA.post("/show", data);
}

/**
 * Show 정보 Fetch
 * type: GET
 * Input: quizId
 * Output: null
 */

export const getShowInfoAPI = async (quizId) => {
    console.log("/show/" + quizId);
    await CustomAxios_LAMDA.get("/show/" + quizId)
        .then((res) => {
            console.log(res)
            store.dispatch(R_setId(quizId));
            store.dispatch(R_setQuiz(res.data.Item));
            store.dispatch(R_setCurrentShow(1));
        }).catch((err) => {
            console.log(err);
        })
}

/** Show 저장 API
 * type: PUT
 * Input: {quiz}
 * Output: true/false
 */
export const saveShowAPI = async (quiz) => {
    // console.log(quiz);
    return await CustomAxios_LAMDA.put('/show', quiz);
}


/**
 * Show 삭제 API
 * type: DELETE
 * Input: quizId
 */
export const deleteShowAPI = async (quizId) => {
    return await CustomAxios_LAMDA.delete("/show/" + quizId);
}

/**
 * Play 생성
 * type: POST
 * Input: {quizId}
 */
export const createPlayAPI = async (quizId) => {
    return await CustomAxios_PLAY.post("/v1/host/createPlay", {id: quizId})
}

/**
 * Log 저장
 * type: POST
 * Input: {showid,showtitle,playdate,quizcount,usercount,userdata}
 */
export const saveLogAPI = async (data) => {
    return await CustomAxios_LAMDA.post("/log", data);
}

/**
 * Log 목록 Fetch
 * type: GET
 * Input: email
 */
export const getLogListAPI = async (email) => {
    return await CustomAxios_LAMDA.get("/log/list/" + email)
        .then((res) => {
            if (res.status === 200) {
                store.dispatch(R_setReportList(res.data.Items))
            } else {

            }
        }).catch((err) => {
            console.log(err);
        })
}

/**
 * Log 정보 Fetch
 * type: GET
 * Input: logId
 */
export const getLogInfoAPI = async (logId) => {
    return await CustomAxios_LAMDA.get("/log/" + logId)
        .then((res) => {
            // console.log(res.data);
            if (res.status === 200) {
                store.dispatch(R_setReportInfo(res.data.Item))
            } else {
            }
        }).catch((err) => {
        })
}

/**
 * Log 삭제 API
 * type: DELETE
 * Input: logId
 */
export const deleteLogAPI = async (logId) => {
    return await CustomAxios_LAMDA.delete("/log/" + logId);
}
