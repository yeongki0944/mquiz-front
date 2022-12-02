import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {playFunction} from "./PlayFunction";


const URL = process.env.REACT_APP_BACKEND_SERVER;
let stomp = Stomp.over(()=>{ return new SockJS(URL+"/connect") });

/**
 * Stomp 연결
 * Stomp 연결 후, subscribe를 통해 메시지를 받는다.
 */
export const stompInit = (pinNum) => {
    stomp.connect({}, () => {
        console.log("STOMP Connection");
        stompSubscribe(pinNum);
    },(error)=>{
        console.log("실패");
    });
}

/**
 * Stomp subscribe
 * 받은 메시지를 처리
 */
const stompSubscribe = (pinNum) => {
    stomp.subscribe("/pin/" + pinNum, (msg) => {
        console.log(msg);
        playFunction(JSON.parse(msg.body));
    });
}

/**
 * Stomp send
 * 서버로 메시지를 보낸다.
 */
export const stompSend = (path, data) => {
    console.log(data);
    stomp.send("/quiz/" + path, {}, JSON.stringify(data));
}

/**
 * Stomp disconnect
 * Stomp 연결을 끊는다.
 */
export const stompDisconnect = () => {
    stomp.disconnect(() => {
        console.log("소켓 연결 해제");
    }, {});
}
