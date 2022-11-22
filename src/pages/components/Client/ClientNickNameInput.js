import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useState} from 'react';
import style from '../../quizClient/Style/layoutstyle.css';
import styled from 'styled-components';
import {Container, FormControl, FormHelperText} from "@mui/material";

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

export const NickNameCheck = (props) => {
    const [nicNameState, setNicNameState] = useState('');
    // form 전송

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            nicName: data.get('nicName'),
            //rePassword: data.get('rePassword'),
        };
        const {nicName} = joinData;

        // 닉네임 번호 유효성 체크
        const nicNameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/;
        if (!nicNameRegex.test(nicName)) {
            setNicNameState('전달받은 6자리 번호 입력해주세요!');
        } else {
            setNicNameState('');
        }

        // 모두 통과하면 post되는 코드 실행 (axios나 fecth등)
        if (
            nicNameRegex.test(nicName)
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

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box align='center' sx={{minWidth: 275}} component="form" noValidate onSubmit={handleSubmit}>

                    <Typography variant="h5" component="div" align='center'>
                        취향저격 닉네임을 만들어 주세요
                    </Typography>

                    <FormControl component="fieldset" variant="standard">
                        <Typography variant="h5" component="div" align='center'>
                            <TextField id="nicName" name="nicName" type="nicName" label="닉네임 입력"
                                       helperText={setNicNameState} variant="outlined"
                                       error={nicNameState !== '' || false} required autoFocus/>
                        </Typography>

                        <FormHelperText>{nicNameState}</FormHelperText>

                        <Link to="/QClient/ready">
                            <Typography variant="h5" component="div" align='center'>
                                <Button variant="contained">확인</Button>
                            </Typography>
                        </Link>

                    </FormControl>

                </Box>
            </Container>
        </>
    );
}

