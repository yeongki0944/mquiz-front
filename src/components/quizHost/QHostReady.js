import * as React from 'react';
import {useSelector} from "react-redux";
import {stompSend} from "../../function/WebSocket";
import {Btn, Content, Item, Text} from "../../layouts/LayOuts";
import {useEffect, useState} from "react";
import {HostCountOutModal, UserList} from "./QHostPlayUserList";
import {createSvgIcon} from "@mui/material/utils";
import {QRModal} from "../QRModal";
import {getPinNum} from "../../function/localStorage";
import {disableBackPage, disableRefresh, redirectPage} from "../../function/common";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
    'Home',
);

export const QHostReady = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [openBan, setOpenBan] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const URL = "http://www.mquiz.site/p/"+ getPinNum();

    const handleCopy = () => {
        navigator.clipboard.writeText(URL).then(function () {
            alert("복사되었습니다.");
        }, function (err) {
            alert("복사에 실패하였습니다.");
        });
    }

    const handleStart = () => {
        stompSend("start", {
            pinNum: getPinNum(),
            command: "START",
        })
    }

    return (
        <Content sx={{width: '100vw', height: '100vh'}}>
            <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                mquiz.site 접속해주세요
            </Text>
            <Item sx={{place: 'center', height: '10vh',display:'space-between'}}>
                <Btn sx={{place:'center'}}onClick={() => {
                    setOpenQR(true)
                }}>QR code</Btn>
                <Btn sx={{place:'center'}}onClick={handleCopy}>URL copy</Btn>
            </Item>
            <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                PIN: {getPinNum()}
            </Text>
            <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                <HomeIcon/>총 참여자 수 {quizPlay.userList.length} 명
            </Text>
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
                      pinNum={getPinNum()}
                      setOpen={setOpenBan}
            />
            <Item sx={{place: 'center', height:'10vh',margin: 'auto'}}>
                <Btn sx={{place:'center'}} onClick={handleStart}>시작</Btn>
            </Item>
            <HostCountOutModal open={openBan} setOpen={setOpenBan}></HostCountOutModal>
            <QRModal open={openQR} setOpen={setOpenQR} url={URL}></QRModal>
        </Content>
    );
}


