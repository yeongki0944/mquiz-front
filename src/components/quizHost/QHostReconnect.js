import * as React from 'react';
import {Btn, Content, Img, Item, Text} from "../../layouts/LayOuts";
import {useEffect} from "react";
import {stompInit, stompSend} from "../../function/WebSocket";
import {flushLocalStorage, getPinNum} from "../../function/localStorage";
import {checkConnected} from "../../function/common";

/**
 * 대기방 component
 */
export function QHostReconnect() {

    useEffect(() => {
        stompInit(getPinNum());
    }, [])

    const handleReconnect = () => {
        stompSend("start", {
            pinNum: getPinNum(),
            action: "COMMAND",
            command: "START"
        });
    }

    return (
        <Content>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Img
                    alt="complex"
                    src="/img/Spaceman.png"
                    sx={{width: '20vw', height: '20vw'}}
                    sm={{width: '50vw', height: '50vw'}}
                />
            </Item>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                    진행중인 퀴즈가 있습니다. 재개하시겠습니까?
                </Text>
            </Item>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Item sx={{place: 'center'}}>
                    <Btn onClick={handleReconnect}>
                        다음
                    </Btn>
                    <Btn onClick={() => {
                        console.log("메인으로");
                        if(checkConnected(null)){
                            stompSend("end", {
                                pinNum: getPinNum(),
                                action: "END"
                            });
                            setTimeout(()=>{
                                window.location.href = "/";
                                flushLocalStorage();
                            },100);
                        }
                    }}>
                        메인으로
                    </Btn>
                </Item>
            </Item>
        </Content>
    );
}
