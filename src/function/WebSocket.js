import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import store from "../redux/store";
import {R_setData} from "../redux/reducers/quizplayReducer";

//let sockJs = new SockJS("http://localhost:8080/connect");
// let sockJs = new SockJS("http://15.152.42.217:8888/connect");
let stomp = Stomp.over(()=>{ return new SockJS("http://localhost:8080/connect") }); // stomp를 통해 보다 편리하게 소켓 활용, sockJS(연결하고자 하는 경로 설정)
// let stomp = Stomp.over(()=>{ return new SockJS("http://15.152.42.217:8888/connect") });

export const stompInit = (pinNum) => {
    // console.log("test");
    stomp.connect({}, () => {
        console.log("STOMP Connection");

        // 나중에 destination 변경되면 바뀌야됨.
        stomp.subscribe("/pin/" + pinNum, (msg) => {
            console.log(msg.body);
            let data = JSON.parse(msg.body);
            store.dispatch(R_setData({key: "command", value: data.command}));
            console.log(data.command);
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

export const stompSend = (path, data) => {
    console.log(data);
    stomp.send("/quiz/" + path, {}, JSON.stringify(data));
}

export const stompDisconnect = () => {
    stomp.disconnect(() => {
        console.log("소켓 연결 해제");
    }, {});
}
