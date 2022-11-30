import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

//let sockJs = new SockJS("http://localhost:8080/connect");
//let sockJs = new SockJS("http://15.152.42.217:8888/connect");
let stomp = Stomp.over(()=>{ return new SockJS("http://localhost:8080/connect") });

export const stompInit = (pinNum) => {
    console.log("test");
    stomp.connect({}, () => {
        console.log("STOMP Connection");

        // 나중에 destination 변경되면 바뀌야됨.
        stomp.subscribe("/pin/" + pinNum, (msg) => {
            console.log(msg);
        });
    },(error)=>{
        console.log("실패");
    });
}

export const stompSubscribe = (pinNum) => {
    stomp.subscribe("/pin/" + pinNum, (msg) => {
        console.log(msg);
    });
}

export const stompSend = (pinNum, data) => {
    console.log(data);
    stomp.send("/quiz/" + pinNum, {}, JSON.stringify(data));
}

export const stompDisconnect = () => {
    stomp.disconnect(() => {
        console.log("소켓 연결 해제");
    }, {});
}
