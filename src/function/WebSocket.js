import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import store from "../redux/store";
import {R_setData} from "../redux/reducers/quizplayReducer";


const URL = process.env.REACT_APP_BACKEND_SERVER;
let stomp = Stomp.over(()=>{ return new SockJS(URL+"/connect") });

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
