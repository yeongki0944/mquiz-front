import {Btn, Card_panel, Content, Item, Page, Text} from "../../layouts/LayOuts";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {editUserInfo} from "../../redux/reducers/userInfoReducer";
import {
    checkEmailAPI,
    checkEmailAuthNumAPI,
    emailSendAuthNumAPI,
    loginAPI,
    registerAPI
} from "../../function/API";
import {redirectPage} from "../../function/common";
import {HomeButton} from "../../components/HomeButton";

export const QHostAuth = () => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userInfo);
    const [pageState, setPageState] = useState(true);

    const handleSuccess = () => {
        localStorage.setItem('role','HOST');
        // 여기 호스트 닉네임 넣으면됨. 로컬스토리지로
        redirectPage("QHOST");
    }
    const handleLogin = () => {
    loginAPI({hostEmail: userInfo.hostEmail, password: userInfo.password}).then(res => {
        if (res.data.statusCode === 200) {
            handleSuccess();
        } else {
            alert("로그인 실패");
        }
    })
    }

    const handleReg = () => {
        registerAPI({hostEmail: userInfo.hostEmail, password: userInfo.password,nickName:userInfo.nickName}).then(res => {
            if (res.data.statusCode === 200) {
                setPageState(true);
            } else {
                alert("회원가입 실패");
            }
        })
    }

    const handleEmailAuth = () => {
        emailSendAuthNumAPI({hostEmail:userInfo.hostEmail}).then(res => {
            if (res.data.statusCode === 200) {
                console.log(res.data.data);
                alert("이메일에 전송된 인증번호를 확인해 주세요");
            } else {
                alert("이메일 인증 번호 전송 실패");
            }
        });
    }

    const handleCheckEmailAuthNum = () => {
        checkEmailAuthNumAPI({authNum:userInfo.authNum}).then(res => {
            if (res.data.statusCode === 200) {
                console.log(res.data.data);
                alert("이메일 인증 성공");
            } else {
                alert("이메일 인증 실패");
            }
        });
    }

    const handleCheckEmailAuth = () => {
        checkEmailAPI({hostEmail:userInfo.hostEmail}).then(res => {
            if (res.data.statusCode === 200) {
                console.log(res.data.data);
                alert("이메일 사용 가능");
            } else {
                alert("이메일 중복입니다.");
            }
        });
    }

    const handleIdInput = (e) => {
        dispatch(editUserInfo({key: "hostEmail", value: e.target.value}));
    }
    const handlePwInput = (e) => {
        dispatch(editUserInfo({key: "password", value: e.target.value}));
    }
    const handleNickNameInput = (e) => {
        dispatch(editUserInfo({key: "nickName", value: e.target.value}));
    }
    const handleAuthNumInput = (e) => {
        dispatch(editUserInfo({key: "authNum", value: e.target.value}));
    }


    return (
        <Page sx={{bg: 'img', img: '/img/background_1.jpg'}}>
            <HomeButton sx={{position: 'absolute', top: 5, left: 5, zIndex: 100,width:'5vh',height:'5vh'}}/>
            <Item sx={{place: 'center'}}>
                <Content>
                    <Card_panel sx={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
                        <Item sx={{place: 'center', display: 'block'}}>
                            {pageState ? (
                                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>로그인</Text>
                            ) : (
                                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>회원가입</Text>
                            )}

                            {pageState ? (
                                <>
                                    <TextField id="id" name="id" type="id" label="아이디"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handleIdInput}
                                        // onKeyPress={handleEnterKey}
                                    />

                                    <TextField id="id" name="id" type="id" label="비밀번호"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handlePwInput}
                                        // onKeyPress={handleEnterKey}
                                    />
                                    <Btn onClick={handleLogin}>로그인</Btn>
                                </>
                            ) : (
                                <>
                                    <TextField id="id" name="id" type="id" label="아이디"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handleIdInput}
                                        // onKeyPress={handleEnterKey}
                                    />

                                    <Btn onClick={handleCheckEmailAuth}>이메일 중복 확인</Btn>

                                    <Btn onClick={handleEmailAuth}>인증 번호 전송</Btn>

                                    <TextField id="authNumInput" name="authNumInput" type="authNumInput" label="인증번호"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handleAuthNumInput}
                                        // onKeyPress={handleEnterKey}
                                    />
                                    <Btn onClick={handleCheckEmailAuthNum}>인증 번호 확인</Btn>

                                    <TextField id="id" name="id" type="id" label="비밀번호"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handlePwInput}
                                        // onKeyPress={handleEnterKey}
                                    />

                                    <TextField sx={{width: '100%'}} id="outlined-basic" label="비밀번호 확인"
                                               variant="outlined"/>

                                    <TextField id="nickName" name="nickName" type="nickName" label="닉네임"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handleNickNameInput}
                                        // onKeyPress={handleEnterKey}
                                    />

                                    <Btn onClick={handleReg}>회원가입</Btn>
                                </>
                            )}
                        </Item>
                        {pageState ? (
                            <Btn onClick={() => setPageState(false)}>회원가입하기</Btn>
                        ) : (
                            <Btn onClick={() => setPageState(true)}>로그인하기</Btn>
                        )}

                        <Btn onClick={handleSuccess}>로그인성공 버튼</Btn>
                    </Card_panel>
                </Content>
            </Item>
        </Page>
    )
}