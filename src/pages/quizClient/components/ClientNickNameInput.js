import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useState} from 'react';
import styled from 'styled-components';
import {Container, FormControl, FormHelperText} from "@mui/material";
import {useDispatch} from "react-redux";
import {setData} from "../../redux/reducers/quizplayReducer";


export const NickNameCheck = (props) => {
    const dispatch = useDispatch();;

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
        /**
         * [참고]
         * 여기 닉네임 중복 확인 코드 넣으시면 됩니다.
         * success는 임시 값
         */
        const success = true;
        if(success){
            //아이디 중복 아니면
            dispatch(setData({key: 'nickName', value: nickName}));
            dispatch(setData({key:'command', value:'wait'}));
        }else{
            //아이디 중복이면
            setError('이미 존재하는 닉네임입니다.');
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
            />
            <Typography>
                <Button variant="contained" onClick={handleSubmit}>참여확인</Button>
            </Typography>
        </Box>
    );
}

