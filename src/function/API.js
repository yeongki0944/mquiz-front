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
    await CustomAxios.post("/v1/hostauth/login", data
    ).then((res) => {
        if(res.status === 200){
            console.log("로그인 성공");
            /**
             * 성공시 localstorage 설정하기
             */
            return true;
        }else{
            console.log("로그인 실패");
            return false;
        }
    }).catch((err) => {
        console.log(err);
        return false;
    })
};

/**
 * 회원가입 처리
 * type: POST
 * Input:{hostEmail,password}
 * Output: true/false
 */
export const registerAPI = async (data) => {
    await CustomAxios.post("/v1/hostauth/join", data
    ).then((res) => {
        if(res.status === 200){
            console.log("회원가입 성공");
            return true;
        }else{
            console.log("회원가입 실패");
            return false;
        }
    }).catch((err) => {
        console.log(err);
        return false;
    })
};

/**
 * Play 접속
 * type: POST
 * Input:{pinNum}
 * Output: true/false
 */
export const enterRoomAPI = async (data) => {
    await CustomAxios.post("/joinroom", data
    ).then((res) => {
        if(res.status === 200){
            console.log("게임방 접속 성공");
            return true;
        }else{
            console.log("게임방 접속 실패");
            return false;
        }
    }).catch((err) => {
        console.log(err);
        return false;
    })
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
                console.log("퀴즈 목록 가져오기 성공");
                store.dispatch(R_setQuizList(res.data.data))
            }else{
                console.log("퀴즈 목록 가져오기 실패");
            }
        }).catch((err) => {
            console.log(err)
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
        console.log(res.data)
        if(res.status === 200){
            console.log("퀴즈 생성 성공");
            return true;
        }else{
            console.log("퀴즈 생성 실패");
            return false;
        }
    }).catch((err) => {
        console.log(err)
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
                console.log("퀴즈 정보 가져오기 성공");
                store.dispatch(R_setId(quizId));
                store.dispatch(R_setQuiz(res.data.data));
                store.dispatch(R_setCurrentShow(1));
                return null;
            }else{
                console.log("퀴즈 정보 가져오기 실패");
                return null;
            }
        }).catch((err) => {
            console.log(err)
            return null;
        })
}
/** Show 편집저장 API
 * type: POST
 * Input: {quiz}
 * Output: true/false
 */
export const saveShowAPI = async(quiz) =>{
    await CustomAxios.post('/v1/show', quiz)
        .then(res => {
            console.log(res.data)
            if(res.status === 200){
                console.log("퀴즈 저장 성공");
                return true;
            }else{
                console.log("퀴즈 저장 실패");
                return false;
            }
        })
        .catch(err => {
            console.log(err)
            return false;
        })
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
            console.log("퀴즈 삭제 성공");
            return true;
        }else{
            console.log("퀴즈 삭제 실패");
            return false;
        }
    }).catch((err) => {
        console.log(err)
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
            console.log("플레이 생성 성공");
            store.dispatch(R_setData({key: "command", value: "READY"}));
            setPinNum(res.data.data);
            return true;
        }else{
            console.log("플레이 생성 실패");
            return false;
        }
    }).catch((err) => {
        console.log(err)
        return false;
    })
}
