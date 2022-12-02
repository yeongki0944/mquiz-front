import * as React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {PinNum} from "../../components/PinNum";
import {ClientTotalCount} from "../../components/quizClient/ClientTotalCount";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {useDispatch, useSelector} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompSend} from "../../function/WebSocket";
import {Item_c} from "../../components/LayOuts/LayOuts";
import QRCode from "react-qr-code";
import styled from "styled-components";
import {useState} from "react";
import {HostCountOutModal, UserList} from "../../components/quizClient/ClientJoinList";

const ClientList = styled.div`
    background-color: #f5f5f5;
    border : 1px solid #red;
    height: 30vh;
    width: 90%;
    margin: auto;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export const QuizHostReady = (props) => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [open, setOpen] = useState(false);

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e.target.innerText).then(function() {
            alert("복사되었습니다.");
        }, function(err) {
            alert("복사에 실패하였습니다.");
        });
    }

    return (
        <div>
            <Item_c><VolumeControlButton/></Item_c>
            <Item_c>MegaQuiz.show/p 접속해 주세요</Item_c>
            <Item_c>
                <QRCode
                    size={256}
                    style={{height: "auto", maxWidth: "20%", width: "20%"}}
                    value={"localhost:3000/QClient?pinNum=" + quizPlay.quizNum}
                    viewBox={`0 0 256 256`}
                />
            </Item_c>
            <Item_c>
                <div onClick={handleCopy}>localhost:3000/QClient?pinNum={quizPlay.pinNum}</div>
            </Item_c>

            <Item_c><PinNum pinNum={quizPlay.pinNum}/></Item_c>
            <Item_c><ClientTotalCount ClientTotalCount={"2"}/></Item_c>
            <ClientList><UserList pinNum={quizPlay.pinNum} setOpen={setOpen}/></ClientList>
            <Item_c>
                <Link to="/QHost/play">
                    <Button variant="contained" onClick={
                        () => {
                            stompSend("start", {
                                pinNum: quizPlay.pinNum,
                                command: "START",
                            })
                        }
                    }>
                        시작
                    </Button>
                </Link>
            </Item_c>
            <HostCountOutModal open={open} setOpen={setOpen}></HostCountOutModal>
        </div>
    );
}

