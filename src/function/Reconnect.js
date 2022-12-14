import {stompInit} from "./WebSocket";
import {R_setData} from "../redux/reducers/quizplayReducer";
import store from "../redux/store";
import {getPinNum} from "./localStorage";

export const checkConnected = () => {
    console.log(getPinNum());
    if(localStorage.getItem('pinNum') != null){
        // 재접속 만들기
        if(localStorage.getItem('role')==="HOST"){

        }
        else{
            window.location.href="/QClient/reconnect";
        }
    }
}
