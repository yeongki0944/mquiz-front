import * as React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {PinNum} from "../../components/PinNum";
import {ClientTotalCount} from "../../components/quizClient/ClientTotalCount";
import {ClientJoinList} from "../../components/quizClient/ClientJoinList";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {useDispatch, useSelector} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompSend} from "../../function/WebSocket";
import {Item_c, Item_c_basic} from "../../components/LayOuts/LayOuts";

export const QuizHostReady = (props) => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);

    return (
        <div>
            <VolumeControlButton/>
            <Item_c_basic>MegaQuiz.show/p 접속해 주세요</Item_c_basic>
            <Item_c_basic><Button variant="contained">QR code</Button></Item_c_basic>
            <Item_c_basic>
                localhost:3000/QClient?quizNum={quizPlay.pinNum}
            </Item_c_basic>

            <Item_c><PinNum pinNum={quizPlay.pinNum}/></Item_c>
            <Item_c><ClientTotalCount ClientTotalCount={"2"}/></Item_c>

            <ClientJoinList pinNum={quizPlay.pinNum}></ClientJoinList>

            <Link to="/QHost/play">
                <Button variant="contained" onClick={
                    () => {
                        dispatch(R_setData({key: "command", value: "START"}))
                        stompSend("start", {
                            pinNum: quizPlay.pinNum,
                            command: "START",
                            quizId: quizPlay.quizId,
                            quizNum: quizPlay.quizNum,
                            nickName: "tester",
                            content: {}
                        })
                    }
                }>
                    시작
                </Button>
            </Link>

        </div>
    );
}

