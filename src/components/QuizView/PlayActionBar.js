import {Btn, Item} from "../../LayOuts/LayOuts";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {stompSend} from "../../function/WebSocket";
import {R_setData} from "../../redux/reducers/quizplayReducer";

export const PlayActionBar = (props) => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const dispatch = useDispatch();
    const handleSubmit = props.handleSubmit;


    const handleSkip = () => {
        stompSend("skip", {
            pinNum: quizPlay.pinNum,
            action: "COMMAND",
            command: "START"
        });
    }
    const handleNext = () => {
        stompSend("result", {
            pinNum: quizPlay.pinNum,
            action: "COMMAND",
            command: "RESULT"
        });
    }

    return (
        <Item sx={props.sx}>
            {quizPlay.command === "RESULT" ?
                quizPlay.nickName === null ? //결과창이고 host일시
                    <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>:
                        <Btn sx={{place: 'center'}} onClick={handleNext}>다음</Btn>
                        <Btn sx={{place: 'center'}} onClick={handleSkip}>건너뛰기</Btn>
                    </Item>
                    : null
                :
                quizPlay.nickName === null ? //결과창 아니고 host 일시
                    quizPlay.command === "SHOW" || quizPlay.command==="RESULT" ?
                        <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>:
                            <Btn sx={{place: 'center'}} onClick={handleNext}>다음</Btn>
                            <Btn sx={{place: 'center'}} onClick={handleSkip}>건너뛰기</Btn>
                        </Item>
                        :
                        null
                    :
                    <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>
                        <Btn sx={{place: 'center', margin: 'auto'}}
                             onClick={handleSubmit}>정답제출</Btn>
                    </Item>
            }
        </Item>
    )
}
