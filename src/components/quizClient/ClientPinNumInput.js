import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useHistory} from "react-router-dom";
import {useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";

export const PinNumCheck = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [pinNum, setPinNum] = useState('');
    const [error, setError] = useState('');

    const handleInput = (e) => {
        setPinNum(e.target.value);
    }

    const handleSubmit = () => {
        // console.log(pinNum);
        // pin 번호 유효성 체크
        const pinNumRegex = /^[0-9]{6,6}$/g;
        if (!pinNumRegex.test(pinNum)) {
            setError('전달받은 6자리 번호 입력해주세요!');
        } else {
            setError('');
            handleEnter();
        }
    };


    const handleEnter = () => {
        /**
         * [참고]
         * 여기 핀 감별 및 이동 코드 넣으시면 됩니다.
         * success는 임시 값
         * 1.핀 감별(방번호 존재 여부 확인)
         * 2. 존재하면 dispatch ~~~ 하고 history.push
         * 2-1. 방번호 존재하면 그에 해당하는 quiz id 받아와서 quizdata 세팅해야함
         * 3. 존재안하면 틀림 출력
         */

        const success = true;
        // if(success){
        //     //핀번호가 맞으면
        //     //여기서 핀에 따라 퀴즈 정보 세팅 후 퀴즈 페이지로 이동
        //     //아래는 임시 세팅
        //     let id = "637f4c8d9fee5769ac5026f2";
        //     CustomAxios.get('/v1/show?showId=' + id)
        //         .then(res => {
        //             console.log(res.data);
        //             dispatch(R_setId(id));
        //             dispatch(R_setQuiz(res.data.data));
        //             dispatch(R_setCurrentShow(1));
        //             dispatch(setData({key: 'pinNum', value: pinNum}));
        //             dispatch(setData({key: 'command', value: 'nickName'}));
        //             // history.push({
        //             //     pathname: '/QClient/play',})
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // }else{
        //     //핀번호가 틀리면
        //     //핀번호가 틀렸다는 메시지 출력
        //     setError('핀번호가 틀렸습니다.');
        // }

        /**
         * [참고]
         * 임시로 성공부분만 출력해둔 상태
         * 작성 완료 시 윗부분 주석 풀고 아래 삭제
         */
        dispatch(R_setData({key: 'pinNum', value: pinNum}));
        dispatch(R_setData({key: 'command', value: 'nickName'}));
        history.push({
            pathname: '/QClient/play',
        })


    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }
    return (
        <Box align='center' sx={{minWidth: 275}}>
            <Typography variant="h5" component="div" align='center'>
                PIN 번호를 입력한다면
            </Typography>
            <Typography variant="h5" component="div" align='center'>
                퀴즈를 드리지요
            </Typography>
            <TextField id="pinNum" name="pinNum" type="pinNum" label="PIN 번호 입력(숫자 6자리)"
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
