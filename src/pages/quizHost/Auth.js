import {Btn, Card_panel, Content, Item, Page, Text} from "../../LayOuts/LayOuts";
import {useHistory} from "react-router-dom";
import CustomAxios from "../../function/CustomAxios";
import {useState} from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import * as React from "react";

export const Auth = () => {
    const usehistory = useHistory();
    const [pageState, setPageState] = useState(true);

    const handleSuccess = () => {
        usehistory.push("/QHost");
    }
    const handleLogin = () => {
        CustomAxios.post("/api", {}).then((res) => {
            console.log(res);
            if (true) {
                handleSuccess();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleReg = () => {
        CustomAxios.post("/api", {}).then((res) => {
            console.log(res);
            if (true) {
                handleSuccess();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Page sx={{bg: 'img', img: '/img/background_1.jpg'}}>
            <Item sx={{place: 'center'}}>
                <Content>
                    <Card_panel sx={{backgroundColor:'rgba(0,0,0,0.3)'}}>
                        {pageState ? (
                            <Item sx={{place: 'center', display: 'block'}}>
                                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                                    로그인
                                </Text>
                                <TextField sx={{width: '100%'}} id="outlined-basic" label="아이디" variant="outlined"/>
                                <TextField sx={{width: '100%'}} id="outlined-basic" label="비밀번호" variant="outlined"/>
                                <Btn onClick={handleLogin}>로그인</Btn>
                            </Item>
                        ) : (
                            <Item sx={{place: 'center', display: 'block'}}>
                                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                                    회원가입
                                </Text>
                                <TextField sx={{width: '100%'}} id="outlined-basic" label="아이디" variant="outlined"/>
                                <TextField sx={{width: '100%'}} id="outlined-basic" label="비밀번호" variant="outlined"/>
                                <TextField sx={{width: '100%'}} id="outlined-basic" label="비밀번호 확인" variant="outlined"/>
                                <Btn onClick={handleReg}>회원가입</Btn>
                            </Item>
                        )}
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
