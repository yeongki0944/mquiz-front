import * as React from 'react';
import {Btn, Content, Img, Item, Text} from "../../LayOuts/LayOuts";
import {useEffect} from "react";
import {stompInit} from "../../function/WebSocket";
import {useDispatch} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useHistory} from "react-router-dom";

/**
 * 대기방 component
 */
export function QuizClientReconnect() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log(localStorage.getItem('pinNum'));
        stompInit(localStorage.getItem('pinNum'));
    },[])

    return (
        <Content>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <Img
                    alt="complex"
                    src="/img/Spaceman.png"
                    sx={{width: '20vw', height: '20vw'}}
                    sm={{width: '50vw', height: '50vw'}}
                />
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                    <b>{localStorage.getItem('nickName')}</b>님이 입장했습니다.
                </Text>
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <Item sx={{place: 'center'}}>
                    <Btn onClick={()=>{
                        dispatch(R_setData({key:'command', value:'WAIT'}));
                        history.push('/QClient/play');
                    }}>
                        참가
                    </Btn>
                    <Btn onClick={()=>{
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
            <Btn onClick={
                ()=>{
                    localStorage.removeItem('pinNum');
                    localStorage.removeItem('nickName');
                }
            }>
                삭제
            </Btn>

        </Content>
    );
}
