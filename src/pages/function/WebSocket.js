import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let sockJs = new SockJS("http://localhost:8080/stomp/quiz");
let stomp = Stomp.over(sockJs);

export const stompInit = (pinNum) => {
    stomp.connect({}, () => {
        console.log("STOMP Connection");

        // 나중에 destination 변경되면 바뀌야됨.
        stomp.subscribe("/sub/quiz-play/room/" + pinNum, (msg) => {
            console.log(msg);
        });
    }, () => {

    })

}

export const stompSend = (path, data) => {
    console.log("Send보냄");
    console.log(stomp);
    stomp.send("/pub" + path, {}, JSON.stringify(data));
}

export const stompDisconnect = () => {
    stomp.disconnect(() => {
        console.log("소켓 연결 해제");
    }, {});
}
