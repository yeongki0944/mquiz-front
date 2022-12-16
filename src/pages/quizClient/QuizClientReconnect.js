import * as React from 'react';
import {Btn, Content, Img, Item, Text} from "../../LayOuts/LayOuts";
import {useEffect} from "react";
import {stompInit} from "../../function/WebSocket";
import {useDispatch} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useHistory} from "react-router-dom";
import {getNickname, getPinNum} from "../../function/localStorage";

/**
 * 대기방 component
 */
export function QuizClientReconnect() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log(getPinNum());
        stompInit(getPinNum());
    }, [])

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
                        <b>{getNickname()}</b>님이 입장했습니다.
                        진행하던 게임이 있습니다. 참가하시겠습니까?
                    </Text>
                </Item>
                <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                    <Item sx={{place: 'center'}}>
                        <Btn onClick={() => {
                            dispatch(R_setData({key: 'command', value: 'WAIT'}));
                            history.push('/QClient');
                        }}>
                            참가
                        </Btn>
                        <Btn onClick={() => {
                            localStorage.removeItem('pinNum');
                            localStorage.removeItem('nickName');
                            localStorage.removeItem('role');
                            history.push('/');
                            history.go(0);
                        }}>
                            메인으로
                        </Btn>
                    </Item>
                </Item>
            </Content>
    );
}
