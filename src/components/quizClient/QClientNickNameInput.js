import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';
import {stompSend} from "../../function/WebSocket";
import {chk_space, chk_special} from "../../function/RegularExpression";
import {Btn, Content, Item, Text} from "../../layouts/LayOuts";
import {getPinNum, setNickname, setRole, setScore} from "../../function/localStorage";

/**
 * 닉네임 입력 component
 */
export const NickNameCheck = () => {
    const [nick_Name, setNick_Name] = useState('');
    const [error, setError] = useState('');

    /**
     * blur 이벤트 발생시 닉네임 set
     */
    const handleInput = (e) => {
        setNick_Name(e.target.value);
    }

    /**
     * 엔터키 입력시 handleSubmit 실행
     */
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e.target.value);
        }
    }

    /**
     * 닉네임 유효성 체크
     */
    const handleSubmit = (nick) => {
        if (chk_special(nick)) {
            setError('특수문자는 사용할 수 없습니다.');
            return;
        } else if (nick_Name === '') {
            setError('닉네임을 입력해주세요!');
            return;
        } else if (chk_space(nick)){
            setError('공백은 사용할 수 없습니다.');
        } else{
            setError('');
            handleEnter(nick);
        }
    };

    /**
     * 유효성 통과된 닉네임 입력 후 입장
     */
    const handleEnter = (nick) => {
        nick = nick.replace(/^\s+|\s+$/g,"");
        console.log(nick);
        setRole("CLIENT");
        setNickname(nick);
        stompSend('setnickname', {
            pinNum: getPinNum(),
            nickName: nick.trim(),
        });
    }

    useEffect(
        () => {
            setScore(0);
        }, []
    )

    return (
        <Content>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                    취향저격 닉네임을 만들어 주세요
                </Text>
            </Item>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <TextField id="nickName" name="nickName" type="nickName" label="닉네임 입력"
                           variant="outlined"
                           helperText={error}
                           error={error !== '' || false} required autoFocus
                           onBlur={handleInput}
                           onKeyPress={handleEnterKey}
                />
            </Item>
            <Item sx={{place: 'center'}} sm={{place: 'center'}}>
                <Btn sx={{place: 'center'}} onClick={() => handleSubmit(nick_Name)}>참여확인</Btn>
            </Item>
        </Content>
    );
}

