import CustomAxios from "./CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import store from "../redux/store";
import {R_setCurrentShow, R_setId, R_setQuiz} from "../redux/reducers/quizInfoReducer";
import {R_setData} from "../redux/reducers/quizplayReducer";
import {setPinNum} from "./localStorage";

/**
 * 로그인 처리
 * type : POST
 * Input:{hostEmail,password}
 * Output: true/false
 */
export const loginAPI = async (data) => {
    return await CustomAxios.post("/v1/hostauth/login", data);
};

/**
 * 회원가입 처리
 * type: POST
 * Input:{hostEmail,password}
 * Output: true/false
 */
export const registerAPI = async(data) => {
     return await CustomAxios.post("/v1/hostauth/join", data);
};

/**
 * Play 접속
 * type: POST
 * Input:{pinNum}
 * Output: true/false
 */
export const enterRoomAPI = async (pinNum) => {
    return await CustomAxios.post("/joinroom",{pinNum : pinNum});
};

/**
 * Show 목록 Fetch
 * type: GET
 * Input: email
 */

export const setShowListAPI = async (email) => {
    await CustomAxios.get("/v1/show/List?email=" + email)
        .then((res) => {
            if(res.status === 200){
                store.dispatch(R_setQuizList(res.data.data))
            }else{
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
    await CustomAxios.post("/v1/show", data
    ).then((res) => {
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    }).catch((err) => {
        return false;
    })
}

/**
 * Show 정보 Fetch
 * type: GET
 * Input: quizId
 * Output: null
 */

export const getShowInfoAPI = async (quizId) => {
    await CustomAxios.get("/v1/show?showId=" + quizId)
        .then((res) => {
            if(res.status === 200){
                store.dispatch(R_setId(quizId));
                store.dispatch(R_setQuiz(res.data.data));
                store.dispatch(R_setCurrentShow(1));
                return null;
            }else{
                return null;
            }
        }).catch((err) => {
            return null;
        })
}
/** Show 편집저장 API
 * type: POST
 * Input: {quiz}
 * Output: true/false
 */
export const saveShowAPI = async(quiz) =>{
    return await CustomAxios.post('/v1/show', quiz);
}

/**
 * Show 삭제 API
 * type: DELETEe
 * Input: quizId
 * Output: true/false
 */
export const deleteShowAPI = async (quizId) => {
    await CustomAxios.delete("/v1/show?showId=" + quizId
    ).then((res) => {
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    }).catch((err) => {
        return false;
    })
}

/**
 * Play 생성
 * type: POST
 * Input: {quizId}
 * Output: true/false
 */
export const createPlayAPI = async (quizId) => {
    await CustomAxios.post("/v1/host/createPlay", {id: quizId}
    ).then((res) => {
        if(res.status === 200){
            store.dispatch(R_setData({key: "command", value: "READY"}));
            setPinNum(res.data.data);
            return true;
        }else{
            return false;
        }
    }).catch((err) => {
        return false;
    })
}
