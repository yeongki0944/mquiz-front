import {Btn, Card_panel, Content, Item, Page, Text} from "../../LayOuts/LayOuts";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {editUserInfo} from "../../redux/reducers/userInfoReducer";
import {loginAPI, registerAPI} from "../../function/API";

export const Auth = () => {
    const usehistory = useHistory();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userInfo);
    const [pageState, setPageState] = useState(true);

    const handleSuccess = () => {
        localStorage.setItem('role','HOST');
        // 여기 호스트 닉네임 넣으면됨. 로컬스토리지로
        usehistory.push("/QHost");
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

    const handleIdInput = (e) => {
        dispatch(editUserInfo({key: "hostEmail", value: e.target.value}));
    }
    const handlePwInput = (e) => {
        dispatch(editUserInfo({key: "password", value: e.target.value}));
    }
    const handleNickNameInput = (e) => {
        dispatch(editUserInfo({key: "nickName", value: e.target.value}));
    }

    return (
        <Page sx={{bg: 'img', img: '/img/background_1.jpg'}}>
            <Item sx={{place: 'center'}}>
                <Content>
                    <Card_panel sx={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
                        <Item sx={{place: 'center', display: 'block'}}>
                            {pageState ? (
                                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>로그인</Text>
                            ) : (
                                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>회원가입</Text>
                            )}
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
                            {pageState ? (
                                <Btn onClick={handleLogin}>로그인</Btn>
                            ) : (
                                <>
                                    <TextField id="nickName" name="nickName" type="nickName" label="닉네임"
                                               variant="outlined"
                                        // helperText={error}
                                        // error={error !== '' || false} required autoFocus
                                               onBlur={handleNickNameInput}
                                        // onKeyPress={handleEnterKey}
                                    />
                                    <TextField sx={{width: '100%'}} id="outlined-basic" label="비밀번호 확인"
                                               variant="outlined"/>
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
