import store from "../redux/store";
import {R_setData, R_setBan, R_setUserlist} from "../redux/reducers/quizplayReducer";
import {useSelector} from "react-redux";
import {getNickname, setQuizTime} from "./localStorage";
import {stompDisconnect} from "./WebSocket";

/**
 * 게임 진행을 위한 데이터를 가져오고, action에 따라 처리
 */


export const playFunction = (data) => {
    switch (data.action){
        case "COMMAND":
            command(data);
            store.dispatch(R_setData({key: "command", value: data.command}));
            break;
        case "ROBBY":
            store.dispatch(R_setData({key: "userList", value: data.userList}))
            break;
        case "BAN":
            if(getNickname() === data.nickName){
                store.dispatch(R_setData({key: "command", value: data.command}));
            }
            store.dispatch(R_setBan({key: "bannedNickName", value: data.nickName}));
            store.dispatch(R_setData({key: "userList", value: data.userList}));
            break;
        case "END":
            stompDisconnect();
            window.confirm("게임세션이 종료되었습니다.");
            break;
        default:
            break;
    }
}

/**
 * command에 따라 처리
 */
const command = (props) => {
    let data = props;
    switch (props.command){
        case "START":
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            setQuizTime();
            break;
        case "RESULT":
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            store.dispatch(R_setData({key: "rank", value: props.rank}));
            break;
        case "FINAL":
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            store.dispatch(R_setData({key: "rank", value: props.rank}));
        default:
            break;
    }
}
