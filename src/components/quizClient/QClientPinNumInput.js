import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Btn, Content, Item, Text} from "../../layouts/LayOuts";
import {getPinNum, setPinNum, setRole} from "../../function/localStorage";
import {enterRoomAPI} from "../../function/API";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import store from "../../redux/store";
import {redirectPage} from "../../function/common";
import {setCommand} from "../../function/reduxFunction";

/**
 * 핀 번호 입력 component
 */
export const PinNumCheck = () => {
    const [pin_Num, setPin_Num] = useState('');
    const [error, setError] = useState('');

    /**
     * blur 이벤트 발생시 Pin set
     */
    const handleInput = (e) => {
        setPin_Num(e.target.value);
    }

    /**
     * 엔터키 입력 시 handleSubmit 실행
     */
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e.target.value);
        }
    }

    /**
     * 핀번호 유효성 체크
     */
    const handleSubmit = (pin) => {
        // pin 번호 유효성 체크
        const pinNumRegex = /^[0-9]{6,6}$/g;
        if (!pinNumRegex.test(pin)) {
            setError('전달받은 6자리 번호 입력해주세요!');
        } else {
            setError('');
            handleEnter(pin);
        }
    };

    /**
     * 핀번호 입력 후 존재여부 확인
     * 방 존재 시 setQuiz 실행
     */
    const handleEnter = async (pin) => {
        enterRoomAPI(pin).then((res) => {
            if (res.data.statusCode === 200) {
                setCommand('NICK');
                setPinNum(pin);
            } else {
                setError('존재하지 않는 방입니다.');
            }
        });
    }

    /**
     * URL 접속 방법 www.mquiz.com/QClient/555555
     */
    useEffect(() => {
        if (window.location.pathname.startsWith('/p/')) {
            let pinNum = window.location.pathname.substring(3);
            if(pinNum){
                if (pinNum.length === 6) {
                    enterRoomAPI(pinNum).then((res) => {
                        if (res.data.statusCode === 200) {
                            setCommand('NICK');
                            setPin_Num(pinNum);
                            setPinNum(pinNum);
                        } else {
                            setError('존재하지 않는 방입니다.');
                        }
                    });
                }else{
                    setError('핀번호는 6자리여야 합니다.');
                }
            }
        }

    }, []);

    return (
        <Content>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                    Pin 번호를 입력한다면
                </Text>
            </Item>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                    퀴즈를 드리지요
                </Text>
            </Item>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <TextField id="pinNum" name="pinNum" type="pinNum" label="PIN 번호 입력(숫자 6자리)"
                           variant="outlined"
                           helperText={error}
                           error={error !== '' || false} required autoFocus
                           onBlur={handleInput}
                           onKeyPress={handleEnterKey}
                />
            </Item>
            <Item sx={{place: 'center', marginTop: 5}} sm={{place: 'center'}}>
                <Btn sx={{place: 'center'}} onClick={() => handleSubmit(pin_Num)}>참여확인</Btn>
            </Item>
        </Content>
    );
}
