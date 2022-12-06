import * as React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {PinNum} from "../../components/PinNum";
import {ClientTotalCount} from "../../components/quizClient/ClientTotalCount";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {useSelector} from "react-redux";
import {stompSend} from "../../function/WebSocket";
import {Item_b, Item_c, Item_r, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import QRCode from "react-qr-code";
import styled from "styled-components";
import {useState} from "react";
import {HostCountOutModal, UserList} from "../../components/quizClient/ClientJoinList";
import Modal from "@mui/material/Modal";
import {QR_Modal} from "../../components/QR_Modal";

const Item_r_Volume = styled(Item_r)`
    @media (min-width: 300px) and (max-width: 767px) {
        position: absolute;
        right: 0;
        top: 0;
        width: 40%;
    }
    @media (min-width: 767px) {
        position: absolute;
        right: 0;
        top: 0;
    }
`;
const Item_c_Content = styled(Item_c)`
    margin-top: 10vh;
    display: block;
    @media (min-width: 300px) and (max-width: 767px) {
        height: 80vh;
    }
    @media (min-width: 767px) {
        height: 80vh;
    }
`;
const Item_c_PlayerList = styled(Item_c)`
    display: block;
    height: 40vh; 
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #fff;
    opacity: .3;
    border-radius: 10px;
    @media (min-width: 300px) and (max-width: 767px) {
        width: 100%;
    }
    @media (min-width: 767px) {
        width: 70%;
    }
`;

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
        <Page_Gradiant>
            <Item_r_Volume><VolumeControlButton/></Item_r_Volume>
            <Item_c_Content>
                <Item_c><h2>~~~~/p 접속해 주세요.</h2></Item_c>
                <Item_c>
                    <Btn onClick={()=>{setOpenQR(true)}}>QR code</Btn>
                    <Btn onClick={handleCopy}>URL copy</Btn>
                </Item_c>
                <Item_c><PinNum pinNum={quizPlay.pinNum}/></Item_c>
                <Item_c><ClientTotalCount ClientTotalCount={quizPlay.userList.length}/></Item_c>
                <Item_c_PlayerList><UserList pinNum={quizPlay.pinNum} setOpen={setOpenBan}/></Item_c_PlayerList>
            </Item_c_Content>
            <Item_c>
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
            </Item_c>
            <HostCountOutModal open={openBan} setOpen={setOpenBan}></HostCountOutModal>
            <QR_Modal open={openQR} setOpen={setOpenQR} url={URL}></QR_Modal>
        </Page_Gradiant>
    );
}


