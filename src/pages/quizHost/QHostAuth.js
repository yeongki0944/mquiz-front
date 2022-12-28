import {Btn, Card_panel, Content, Item, Page, Text} from "../../layouts/LayOuts";
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
import {chk_nickname} from "../../function/RegularExpression";
import {setRole} from "../../function/localStorage";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const QHostAuth = () => {
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userInfo);
    const [pageState, setPageState] = useState(true);
    const [email, chkEmail] = useState('');
    const [emailAuthNum, chkEmailAuthNum] = useState('');
    const [password, setPasswdError] = useState('');
    const [passwordStatus, setPasswdStatusError] = useState('');
    const [passwdChkError, setPasswdChkError] = useState('');
    const [nickName, setNickNameError] = useState('');

    const [chkDup, setChkDup] = useState(false);
    const [chkAuth, setChkAuth] = useState(false);
    const [chkPssword, setChkPssword] = useState(false);

    const handleSuccess = () => {
        setRole('HOST');
        // 여기 호스트 닉네임 넣으면됨. 로컬스토리지로
        redirectPage("QHOST");
    }
    const handleLogin = () => {
        loginAPI({hostEmail: userInfo.hostEmail, password: userInfo.password}).then(res => {
            if (res.data.statusCode === 200) {
                handleSuccess();
            } else {
                MySwal.fire({
                    title: <strong>로그인 실패</strong>,
                    icon: 'error'
                });
            }
        })
    }

    const handleReg = () => {
        if (chkDup && chkAuth) {
            registerAPI({
                hostEmail: userInfo.hostEmail,
                password: userInfo.password,
                nickName: userInfo.nickName
            }).then(res => {
                if (res.data.statusCode === 200) {
                    setPageState(true);
                } else {
                    MySwal.fire({
                        title: <strong>회원가입 실패</strong>,
                        icon: 'error'
                    });
                }
            })
        }else{
            if(!chkDup){
                MySwal.fire({
                    title: <strong>이메일 중복확인을 해주세요.</strong>,
                    icon: 'warning'
                });
            }else if(!chkAuth){
                MySwal.fire({
                    title: <strong>이메일 인증을 해주세요.</strong>,
                    icon: 'warning'
                });
            }
        }

    }

    const handleEmailAuth = () => {
        emailSendAuthNumAPI({hostEmail: userInfo.hostEmail}).then(res => {
            if (res.data.statusCode === 200) {
                MySwal.fire({
                    title: <strong>이메일에 전송된 인증번호를 확인해 주세요.</strong>,
                    icon: 'info'
                });
            } else {
                MySwal.fire({
                    title: <strong>이메일 인증 번호 전송 실패</strong>,
                    icon: 'error'
                });
            }
        }).catch(res => {
        });
    }

    const handleCheckEmailAuthNum = () => {
        checkEmailAuthNumAPI({authNum: userInfo.hostEmail +":"+userInfo.authNum}).then(res => {
            console.log(userInfo.authNum);
            if (res.data.statusCode === 200) {
                MySwal.fire({
                    title: <strong>이메일 인증 성공</strong>,
                    icon: 'success'
                });
                setChkAuth(true);
            }else {
                MySwal.fire({
                    title: <strong>유효하지 않은 인증 번호</strong>,
                    icon: 'error'
                });
                setChkAuth(false);
            }
        }).catch(res => {
        });
    }

    const handleCheckEmailAuth = () => {
        checkEmailAPI({hostEmail: userInfo.hostEmail}).then(res => {
            if (res.data.statusCode === 200) {
                MySwal.fire({
                    title: <strong>이메일 사용 가능</strong>,
                    icon: 'success'
                });
                setChkDup(true);
            }else {
                MySwal.fire({
                    title: <strong>이메일 중복</strong>,
                    icon: 'error'
                });
                setChkDup(false);
            }
            //console.log(res.data.statusCode)
        }).catch(res => {
            console.log(res)
        });
    }

    const handleLoginIdInput = (e) => {
        dispatch(editUserInfo({key: "hostEmail", value: e.target.value}));
    }

    const handleLoginPasswdInput = (e) => {
        dispatch(editUserInfo({key: "password", value: e.target.value}));
    }

    const handleIdInput = (e) => {
        dispatch(editUserInfo({key: "hostEmail", value: e.target.value}));
    }
    const handlePwInput = (e) => {

        // 8~16자리 영문자,숫자,특수문자(!@#$%) 조합 패턴 검사
        var lengthRegex = /^[A-Za-z0-9!@#$%]{5,16}$/im;
        var engUpperCaseRegex = /[A-Z]/im;
        var engLowerCaseRegex = /[a-z]/im;
        var digitRegex = /[0-9]/im;
        var specRegex = /[!@#$%]/im;

        // 패스워드 구성요소에 대한 길이 및 종류 체크
        if(lengthRegex.exec(e.target.value)) {
//	          element.innerHTML = '길이 체크 통과!';
            // 각 요소별 체크를 통해 카운팅 결과에 따른 안전,보통,위험,사용불가 로 출력
            var safetyCount = 0;
            if (engUpperCaseRegex.exec(e.target.value)) safetyCount++;
            if (engLowerCaseRegex.exec(e.target.value)) safetyCount++;
            if (digitRegex.exec(e.target.value)) safetyCount++;
            if (specRegex.exec(e.target.value)) safetyCount++;

            switch (safetyCount) {
                case 4:
                    setPasswdError('');
                    setPasswdStatusError('안전합니다.');
                    break;
                case 3:
                    setPasswdError('');
                    setPasswdStatusError('보통입니다.');
                    break;
                case 2:
                    setPasswdError('');
                    setPasswdStatusError('위험합니다.');
                    break;
                case 1:
                    setPasswdError('');
                    setPasswdStatusError('권장하지 않습니다');
                    break;
            }
        }else if(e.target.value===null){
            setPasswdError('');
        }else{
            setPasswdError('5~16자리 영문자,숫자,특수문자(!@#$%) 입력');
        }

        // if(chk_passwd(e.target.value)){
        //     setPasswdError('');
        // }else{
        //     setPasswdError('5~16자리 영문자,숫자,특수문자(!@#$%) 입력');
        //     return;
        // }
        dispatch(editUserInfo({key: "password", value: e.target.value}));
    }
    const handleCheckPwInput = (e) => {
        console.log(userInfo.password);
        if (userInfo.password != e.target.value) {
            setPasswdChkError('비밀번호가 일치하지 않습니다.');
            setChkPssword(false);
            return;
        } else {
            setPasswdChkError('');
            setChkPssword(true);
            return;
        }
    }
    const handleNickNameInput = (e) => {
        if (chk_nickname(e.target.value)) {
            setNickNameError('');
        } else{
            setNickNameError('사용 할 수 없습니다.');
            return;
        }
        dispatch(editUserInfo({key: "nickName", value: e.target.value}));
    }
    const handleAuthNumInput = (e) => {
        // var authMail = userInfo.hostEmail;
        // console.log(authMail);
        // dispatch(editUserInfo({key: "AUTHNUM", value: e.target.value+":"+authMail}));
        dispatch(editUserInfo({key: "authNum", value: e.target.value}));
    }


    return (
        <Page sx={{bg: 'img', img: '/img/background_1.jpg'}}>
            <HomeButton sx={{position: 'absolute', top: 5, left: 5, zIndex: 100, width: '5vh', height: '5vh'}}/>
            <Item sx={{place: 'center'}}>
                <Content>
                    <Card_panel sx={{backgroundColor: 'rgba(255,255,255,0.8)', border: '5px solid #FFC107'}}>
                        <Item sx={{place: 'center', display: 'block'}}>
                            {pageState ? (
                                <Text sx={{color: '#000', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>로그인</Text>
                            ) : (
                                <Text sx={{color: '#000', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>회원가입</Text>
                            )}

                            {pageState ? (
                                <Item sx={{place: 'center', display: 'block'}}>
                                    <Item sx={{place: 'center'}}>
                                        <TextField id="id" name="id" type="id" label="아이디"
                                                   variant="outlined"
                                            // helperText={error}
                                            // error={error !== '' || false} required autoFocus
                                                   onBlur={handleLoginIdInput}
                                            // onKeyPress={handleEnterKey}
                                        />
                                    </Item>
                                    <Item sx={{place: 'center'}}>
                                        <TextField id="password" name="password" type="password" label="비밀번호"
                                                   variant="outlined"
                                            // helperText={error}
                                            // error={error !== '' || false} required autoFocus
                                                   onBlur={handleLoginPasswdInput}
                                            // onKeyPress={handleEnterKey}
                                        />
                                    </Item>
                                    <Btn onClick={handleLogin}><Text>로그인</Text></Btn>
                                    <Text sx={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}
                                          onClick={() => setPageState(false)}>회원가입하기</Text>
                                </Item>
                            ) : (
                                <Item sx={{place: 'center', display: 'block'}}>
                                    <Item sx={{place: 'left', margin: '10px'}}>
                                        <TextField id="id" name="id" type="email" label="이메일 입력"
                                                   variant="outlined"
                                                   helperText={email}
                                                   error={email !== '' || false} required autoFocus
                                                   onBlur={handleIdInput}
                                            // onKeyPress={handleEnterKey}
                                        />
                                        <Btn onClick={handleCheckEmailAuth}><Text>중복 확인</Text></Btn>
                                    </Item>

                                    <Btn onClick={handleEmailAuth}><Text>인증 번호 전송</Text></Btn>


                                    <Item sx={{place: 'left', margin: '10px'}}>
                                        <TextField id="authNumInput" name="authNumInput" type="authNumInput"
                                                   label="인증 번호 입력"
                                                   variant="outlined"
                                                   helperText={emailAuthNum}
                                                   error={emailAuthNum !== '' || false} required
                                                   onBlur={handleAuthNumInput}
                                            // onKeyPress={handleEnterKey}
                                        />
                                        <Btn onClick={handleCheckEmailAuthNum}><Text>인증 번호 확인</Text></Btn>
                                    </Item>

                                    <Item sx={{place: 'left', margin: '10px'}}>
                                        <TextField sx={{width: '100%'}} id="id" name="id" type="password"
                                                   label="5~16자리 영문자,숫자,특수문자(!@#$%) 입력"
                                                   variant="outlined"
                                            //helperText={password}
                                                   helperText={passwordStatus}
                                                   error={password !== '' || false} required
                                                   onBlur={handlePwInput}
                                                   color={password === '위험' ? 'error' : password === '안전' ? 'primary' : password === '보통' ? 'success' : password === '권장하지 않습니다' ? 'warning' : 'error'}

                                            // label={password}
                                            // variant="outlined"
                                            // helperText="5~16자리 영문자,숫자,특수문자(!@#$%) 입력"
                                            //  error={password === '5~16자리 영문자,숫자,특수문자(!@#$%) 입력'} required
                                            // onBlur={handlePwInput}
                                            // color={password === '위험' ? 'error' : password === '안전' ? 'primary' : password === '보통' ? 'success' : password === '권장하지 않습니다' ? 'warning' : 'error'}

                                            //pri : 파랑 sec : '보라 info : '하늘' error : '빨강' warning: '주황'

                                            //onKeyPress={handleEnterKey}
                                        />
                                    </Item>

                                    <Item sx={{place: 'left', margin: '10px'}}>
                                        <TextField sx={{width: '100%'}} id="outlined-basic"
                                                   label="비밀번호 확인"
                                                   type="password"
                                                   variant="outlined"
                                                   helperText={passwdChkError}
                                                   error={passwdChkError !== '' || false} required
                                                   onBlur={handleCheckPwInput}
                                        />

                                    </Item>
                                    <Item sx={{place: 'left', margin: '10px'}}>
                                        <TextField sx={{width: '100%'}} id="nickName" name="nickName" type="text"
                                                   label="닉네임 3~15자리 숫자,한글,영어 대소문자 입력"
                                                   variant="outlined"
                                                   helperText={nickName}
                                                   error={nickName !== '' || false} required
                                                   onBlur={handleNickNameInput}
                                            // onKeyPress={handleEnterKey}
                                        />
                                    </Item>
                                    <Item sx={{place: 'center'}}>
                                        <Btn onClick={handleReg}><Text>회원가입</Text></Btn>
                                    </Item>
                                    <Text sx={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}
                                          onClick={() => setPageState(true)}>로그인하기
                                    </Text>
                                </Item>
                            )}

                            <Item sx={{place:'right',position:'absolute',right:'0',top:'0',width:'5%',height:'5%'}}
                                  onClick={()=>{
                                      dispatch(editUserInfo({key: "hostEmail", value: "test@gmail.com"}));
                                      handleSuccess();
                                  }}>
                                바로 로그인
                            </Item>
                        </Item>
                    </Card_panel>
                </Content>
            </Item>
        </Page>
    )
}
