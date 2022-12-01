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

    const setQuiz = async (id) => {
        await CustomAxios.get('/v1/show?showId=' + id)
            .then(res => {
                console.log(res.data);
                dispatch(R_setId(id));
                dispatch(R_setQuiz(res.data.data));
                dispatch(R_setCurrentShow(1));
                dispatch(R_setData({key: 'pinNum', value: pinNum}));
                dispatch(R_setData({key: 'command', value: 'nickName'}));
                history.push({
                    pathname: '/QClient/play',
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEnter = async () => {

        //핀 검증
        await CustomAxios.post('/joinroom', {'pinNum': pinNum})
            .then((res) => {
                if(res.data.statusCode === 200){
                    const quizId = res.data.data.quizId.substring(1, res.data.data.quizId.length - 1);
                    setQuiz(quizId);
                }else{
                    setError('핀번호가 틀렸습니다.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
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
