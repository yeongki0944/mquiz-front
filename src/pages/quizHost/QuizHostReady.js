import * as React from 'react';
import {Link} from "react-router-dom";
import {PinNum} from "../../components/PinNum";
import {ClientTotalCount} from "../../components/quizClient/ClientTotalCount";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {useSelector} from "react-redux";
import {stompSend} from "../../function/WebSocket";
import {Item, Item_c, Page} from "../../components/LayOuts/LayOuts";
import QRCode from "react-qr-code";
import styled from "styled-components";
import {useState} from "react";
import {HostCountOutModal, UserList} from "../../components/quizClient/ClientJoinList";
import {QR_Modal} from "../../components/QR_Modal";


const Btn = styled.button`
    background-color: #a84ba6;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    margin: 0 10px;
    cursor: pointer;
    outline: none;
    &:hover {
        opacity: .5;
    }
`;


export const QuizHostReady = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [openBan, setOpenBan] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const URL = "localhost:3000/QClient?pinNum=" + quizPlay.pinNum;

    const handleCopy = (e) => {
        navigator.clipboard.writeText(URL).then(function () {
            alert("복사되었습니다.");
        }, function (err) {
            alert("복사에 실패하였습니다.");
        });
    }

    return (
        <Page sx={{bg: 'grad-right', grad1: 'rebeccapurple', grad2: 'salmon'}}>
            <VolumeControlButton sx={{position: 'absolute', right: '0', top: '0', width: '40%'}}/>
            <Item sx={{place: 'center', display: 'block', marginTop: '10vh', height: '80vh'}}>
                <Item sx={{place: 'center'}}><h2>~~~~/p 접속해 주세요.</h2></Item>
                <Item sx={{place: 'center'}}>
                    <Btn onClick={() => {
                        setOpenQR(true)
                    }}>QR code</Btn>
                    <Btn onClick={handleCopy}>URL copy</Btn>
                </Item>
                <Item sx={{place: 'center'}}><PinNum pinNum={quizPlay.pinNum}/></Item>
                <Item sx={{place: 'center'}}><ClientTotalCount ClientTotalCount={"2"}/></Item>
                <Item
                    sx={{
                        place: 'center',
                        display: 'block',
                        height: '40vh',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        background: '#fff',
                        opacity: '0.3',
                        borderRadius: '10px',
                        width: '70%'
                    }}
                    sm={{width: '100%'}}
                >
                    <UserList pinNum={quizPlay.pinNum} setOpen={setOpenBan}/>
                </Item>
            </Item>
            <Item sx={{place: 'center'}}>
                <Link to="/QHost/play">
                    <Btn variant="contained" onClick={
                        () => {
                            stompSend("start", {
                                pinNum: quizPlay.pinNum,
                                command: "START",
                            })
                        }
                    }>
                        시작
                    </Btn>
                </Link>
            </Item>
            <HostCountOutModal open={openBan} setOpen={setOpenBan}></HostCountOutModal>
            <QR_Modal open={openQR} setOpen={setOpenQR} url={URL}></QR_Modal>
        </Page>
    );
}


