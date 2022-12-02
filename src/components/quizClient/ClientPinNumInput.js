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
import CustomAxios from "../../function/CustomAxios";
import {R_setQuizList} from "../../redux/reducers/quizListReducer";
import {R_setCurrentShow, R_setId, R_setQuiz} from "../../redux/reducers/quizInfoReducer";

/**
 * 핀 번호 입력 component
 */
export const PinNumCheck = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [pinNum, setPinNum] = useState('');
    const [error, setError] = useState('');


    /**
     * blur 이벤트 발생시 Pin set
     */
    const handleInput = (e) => {
        setPinNum(e.target.value);
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
        //핀 검증
        await CustomAxios.post('/joinroom', {'pinNum': pin})
            .then((res) => {
                if(res.data.statusCode === 200){
                    dispatch(R_setData({key: 'pinNum', value: res.data.data.pinNum}));
                    history.push({
                        pathname: '/QClient/play',
                    })
                }else{
                    setError('핀번호가 틀렸습니다.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                <Button variant="contained" onClick={()=>handleSubmit(pinNum)}>참여확인</Button>
            </Typography>
        </Box>
    );
}
