import * as React from 'react';
import {Link} from "react-router-dom";
import {PinNum} from "../../components/PinNum";
import {ClientTotalCount} from "../../components/quizClient/ClientTotalCount";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {useSelector} from "react-redux";
import {stompSend} from "../../function/WebSocket";
import {Btn, Content, Item, Item_b, Item_c, Item_r, Page, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import styled from "styled-components";
import {useState} from "react";
import {HostCountOutModal, UserList} from "../../components/quizClient/ClientJoinList";
import {createSvgIcon} from "@mui/material/utils";
import {QR_Modal} from "../../components/QR_Modal";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
    'Home',
);




export const QuizHostReady = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [openBan, setOpenBan] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const URL = "localhost:3000/QClient?pinNum=" + quizPlay.pinNum;

    const handleCopy = () => {
        navigator.clipboard.writeText(URL).then(function () {
            alert("복사되었습니다.");
        }, function (err) {
            alert("복사에 실패하였습니다.");
        });
    }

    const handleStart = () => {
        stompSend("start", {
            pinNum: quizPlay.pinNum,
            command: "START",
        })
    }

    return (
        <Content sx={{width: '100vw', height: '100vh'}}>
            <VolumeControlButton sx={{place: 'top-right', height: '5vh'}}/>
            <Item sx={{place: 'top', height: '10vh', fontSize: '3em', fontWeight: 'bold', color: 'yellow'}}
                  sm={{fontSize: '2em'}}>mquiz.site/p 접속해주세요.</Item>
            <Item sx={{place: 'center', height: '10vh'}}>
                <Btn sx={{place:'center'}}onClick={() => {
                    setOpenQR(true)
                }}>QR code</Btn>
                <Btn sx={{place:'center'}}onClick={handleCopy}>URL copy</Btn>
            </Item>
            <Item sx={{place: 'center', height: '10vh', fontSize: '3em', fontWeight: 'bold'}}
                  sm={{fontSize: '2em'}}>PIN: {quizPlay.pinNum}</Item>
            <Item sx={{place: 'center', height: '5vh', fontSize: '2em', fontWeight: 'bold'}}
                  sm={{fontSize: '1em'}}><HomeIcon/>총 참여자 수 {quizPlay.userList.length} 명</Item>
            <UserList sx={{
                place: 'center',
                height: '50vh',
                width: '80%',
                margin: 'auto',
                overflowY: 'auto',
                overflowX: 'hidden',
                background: '#fff',
                opacity: '0.3',
                borderRadius: '10px'
            }}
                      pinNum={quizPlay.pinNum}
                      setOpen={setOpenBan}
            />
            <Item sx={{place: 'center', height:'10vh',margin: 'auto'}}>
                <Link to="/QHost/play">
                    <Btn sx={{place:'center'}} onClick={handleStart}>시작</Btn>
                </Link>
            </Item>
            <HostCountOutModal open={openBan} setOpen={setOpenBan}></HostCountOutModal>
            <QR_Modal open={openQR} setOpen={setOpenQR} url={URL}></QR_Modal>
        </Content>
    );
}


