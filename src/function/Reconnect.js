import {stompInit} from "./WebSocket";
import {R_setData} from "../redux/reducers/quizplayReducer";
import store from "../redux/store";

export const checkConnected = () => {
    console.log(localStorage.getItem('pinNum'));
    if(localStorage.getItem('pinNum') != null){
        store.dispatch(R_setData({key:'pinNum', value: localStorage.getItem('pinNum')}));
        store.dispatch(R_setData({key:'nickName', value: localStorage.getItem('nickname')}));
        // 재접속 만들기
        if(localStorage.getItem('role')==="HOST"){

        }
        else{
            window.location.href="/QClient/reconnect";
        }
    }
}