import store from "../redux/store";
import {R_setData, R_setBan, R_setUserlist} from "../redux/reducers/quizplayReducer";
import {useSelector} from "react-redux";
import {
    getCorrectCnt, getCurrentClient,
    getNickname,
    getRole,
    getScore,
    setCorrectCnt, setCurrentClient,
    setDiffScore,
    setQuizTime,
    setScore, setSubmitCnt
} from "./localStorage";
import {stompDisconnect} from "./WebSocket";

/**
 * 게임 진행을 위한 데이터를 가져오고, action에 따라 처리
 */


export const playFunction = (data) => {
    console.log("====================================");
    console.log(data);
    switch (data.action){
        case "COMMAND":
            command(data);
            store.dispatch(R_setData({key: "command", value: data.command}));
            break;
        case "ROBBY":
            store.dispatch(R_setData({key: "userList", value: data.userList}));
            setCurrentClient(parseInt(getCurrentClient()) + 1);
            break;
        case "BAN":
            if(getNickname() === data.nickName){
                store.dispatch(R_setData({key: "command", value: data.command}));
            }
            store.dispatch(R_setBan({key: "bannedNickName", value: data.nickName}));
            store.dispatch(R_setData({key: "userList", value: data.userList}));
            break;
        case "NICKNAMERETRY":
            console.log(data.action);
            if(getNickname() === data.nickName){
                store.dispatch(R_setData({key: "action", value: data.action}));
            }
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
            setSubmitCnt(0);
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            setQuizTime();
            break;
        case "RESULT":
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            store.dispatch(R_setData({key: "rank", value: props.rank}));
            if(getRole()==="CLIENT"){ //정답갯수 세기
                let score = props.rank.filter((item) => item.nickName === getNickname())[0].rankScore;
                if(parseInt(score-getScore()) > 0){ //정답일 시
                    setCorrectCnt(parseInt(getCorrectCnt())+1);
                    setDiffScore(parseInt(score-getScore()));
                    setScore(score);
                }else{
                    setDiffScore(0);
                }

            }
            break;
        case "FINAL":
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            store.dispatch(R_setData({key: "rank", value: props.rank}));
            if(getRole()==="CLIENT"){ //정답갯수 세기
                let score = props.rank.filter((item) => item.nickName === getNickname())[0].rankScore;
                if(parseInt(score-getScore()) > 0){ //정답일 시
                    setCorrectCnt(parseInt(getCorrectCnt())+1);
                    setDiffScore(parseInt(score-getScore()));
                    setScore(score);
                }else{
                    setDiffScore(0);
                }

            }
        default:
            break;
    }
}
