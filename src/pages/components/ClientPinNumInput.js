import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import { useState } from 'react';
import style from '../quizClient/Style/layoutstyle.css';

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Container,
} from '@mui/material/';

import styled from 'styled-components';

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

export const PinNumCheck = (props) => {
    const [pinNumState, setPinNumState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // form 전송

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            pinNum: data.get('pinNum'),
            //rePassword: data.get('rePassword'),
        };
        const {pinNum} = joinData;

        // pin 번호 유효성 체크
        const pinNumRegex = /^[0-9]{0,6}$/g;
        if (!pinNumRegex.test(pinNum)) {
            setPinNumState('전달받은 6자리 번호 입력해주세요!');
        } else {
            setPinNumState('');
        }

        // 모두 통과하면 post되는 코드 실행 (axios나 fecth등)
        if (
            pinNumRegex.test(pinNum)
            //     password === rePassword
        ) {
            return;
            //onhandlePost(joinData);
        }
    };


    // const onhandlePost = async (data) => {
    //     const { password } = data;
    //     const postData = { password };

    //     // post
    //     await axios
    //       .post('/member/join', postData)
    //       .then(function (response) {
    //         console.log(response, '성공');
    //         history.push('/login');
    //       })
    //       .catch(function (err) {
    //         console.log(err);
    //         setRegisterError('실패하였습니다. 다시한번 확인해 주세요.');
    //       });
    //   };

    return(
        <>
            <div className="clientLayout">
                <>
                    <Container component="main" maxWidth="xs">
                        <Box align='center' sx={{ minWidth: 275}} component="form" noValidate onSubmit={handleSubmit}>

                            <Typography variant="h5" component="div" align='center'>
                                PIN 번호를 입력한다면
                            </Typography>

                            <Typography variant="h5" component="div" align='center'>
                                퀴즈를 드리지요
                            </Typography>

                            <FormControl component="fieldset" variant="standard">
                                <Typography variant="h5" component="div" align='center'>
                                    <TextField id="pinNum" name="pinNum" type="pinNum" label="PIN 번호 입력(숫자 6자리)" helperText={setPinNumState} variant="outlined" error={pinNumState !== '' || false} required autoFocus/>
                                </Typography>

                                <FormHelperText>{pinNumState}</FormHelperText>

                                <Link to="/QClient/createNickName">
                                    <Typography variant="h5" component="div" align='center'>
                                        <Button type="submit" variant="contained">참여확인</Button>
                                    </Typography>
                                </Link>
                            </FormControl>

                        </Box>
                    </Container>
                </>
            </div>
        </>
    );
}
