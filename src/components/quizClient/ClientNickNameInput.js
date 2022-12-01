import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useState} from 'react';
import styled from 'styled-components';
import {Container, FormControl, FormHelperText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompSend} from "../../function/WebSocket";
import CustomAxios from "../../function/CustomAxios";


export const NickNameCheck = () => {
    const dispatch = useDispatch();

    const {quizPlay} = useSelector(state => state.quizPlay);
    const [nickName, setNickName] = useState('');
    const [error, setError] = useState('');

    const handleInput = (e) => {
        setNickName(e.target.value);
    }

    const handleSubmit = () => {
        // 닉네임 번호 유효성 체크
        // const nickNameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/;
        // if (!nickNameRegex.test(nickName)) {
        //     setError('특수문자는 입력할 수 없습니다.');
        // } else {
        //     setError('');
            handleEnter();
        // }
    };

    const handleEnter = () => {

        stompSend('setnickname', {
            pinNum: quizPlay.pinNum,
            sender: nickName
        });
        //닉네임 중복 관련 기능 필요(반환값)
        dispatch(R_setData({key:'sender', value:nickName}));
        dispatch(R_setData({key:'command', value:'WAIT'}));
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <Box align='center' sx={{minWidth: 275}}>
            <Typography variant="h5" component="div" align='center'>
                취향저격 닉네임을 만들어 주세요
            </Typography>
            <TextField id="nickName" name="nickName" type="nickName" label="닉네임 입력"
                       variant="outlined"
                       helperText={error}
                       error={error !== '' || false} required autoFocus
                       onBlur={handleInput}
                       onKeyPress={handleEnterKey}
            />
            <Typography>
                <Button variant="contained" onClick={handleSubmit}>참여확인</Button>
            </Typography>
        </Box>
    );
}

