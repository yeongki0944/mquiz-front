import {Btn, Item} from "../../layouts/LayOuts";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {stompSend} from "../../function/WebSocket";
import {getPinNum, getRole} from "../../function/localStorage";

export const PlayActionBar = (props) => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const handleSubmit = props.handleSubmit;


    const handleSkip = () => {
        stompSend("skip", {
            pinNum: getPinNum(),
            action: "COMMAND",
            command: "START",
            userList: quizPlay.userList,
            quiz:quizPlay.quiz,
            rank:quizPlay.rank
        });
    }
    const handleNext = () => {
        stompSend("result", {
            pinNum: getPinNum(),
            action: "COMMAND",
            command: "RESULT"
        });
    }

    const handleStart = () => {
        stompSend("start", {
            pinNum: getPinNum(),
            action: "COMMAND",
            command: "START"
        });
    }

    return (
        <Item sx={props.sx}>
            {quizPlay.command === "RESULT" || quizPlay.command === "FINAL" ?
                    null
                :
                getRole() === "HOST" ? //결과창 아니고 host 일시
                    quizPlay.command === "SHOW" || quizPlay.command==="RESULT" ?
                        <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>
                            <Btn sx={{place: 'center'}} onClick={handleNext}>다음</Btn>
                            <Btn sx={{place: 'center'}} onClick={handleSkip}>건너뛰기</Btn>
                        </Item>
                        : null
                    :
                    <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>
                        <Btn sx={{place: 'center', margin: 'auto'}}
                             onClick={handleSubmit}>정답제출</Btn>
                    </Item>
            }
        </Item>
    )
}
