import {Btn, Card_panel, Content, Img, Item, Text} from "../../layouts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useEffect, useState} from "react";
import {stompSend} from "../../function/WebSocket";
import * as React from "react";
import {useHistory} from "react-router-dom";
import html2canvas from "html2canvas";
import {flushLocalStorage, getNickname, getPinNum, getRole} from "../../function/localStorage";
import {redirectPage} from "../../function/common";

export const FinalRankPage = () => {
    const history = useHistory();
    const {quizPlay} = useSelector(state => state.quizPlay);

    const [rank, setRank] = useState();
    const [rankScore, setRankScore] = useState();

    useEffect(() => {
        quizPlay.rank.map((item) => {
            if (item.nickName === getNickname()) {
                setRank(item.rank);
                setRankScore(item.rankScore);
            }
        })
    }, []);

    return (
        <Content>
            <Card_panel sx={{backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%'}}>
                <Item sx={{place: "center", borderBottom: "1px solid black", height: "5%"}}>
                    <Text sx={{color: '#FFC107', fontSize: '2vw'}} sm={{fontSize: '5vw'}}>
                        PIN : {getPinNum()}
                    </Text>
                </Item>

                {
                    getRole() === "CLIENT" ? (
                        <Item sx={{height: "40%", place: "center", display: 'block'}}>
                            <Item sx={{place: 'center', width: '100%', height: '100%'}}>
                                <Img
                                    alt="complex"
                                    src="/img/Spaceman_star.png"
                                    sx={{width: '50%', height: '50%', margin: 'auto'}}
                                    sm={{width: '70%', height: '70%', margin: 'auto'}}
                                />
                            </Item>
                            <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '10vw'}}>
                                {getNickname()}
                            </Text>
                        </Item>
                    ) : (
                        <Item sx={{height: "80vh", place: "center", display: 'block', margin: 'auto'}}>
                            <Text sx={{color: '#FFC107', fontSize: '5vw'}} sm={{fontSize: '10vw'}}>
                                최종 결과
                            </Text>
                            {quizPlay.rank.map(
                                (item, index) => {
                                    if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                                        return (
                                            <Item sx={{place: "center",height:'20%'}} key={index}>
                                                <Item sx={{place: "center", height: '100%', width: '50%'}} sm={{width:'90%'}} >
                                                    <Rank
                                                        sx={{place: "top", height: '100%', width: '100%'}}
                                                        rank={item.rank}
                                                        nickName={item.nickName}
                                                        score={Math.floor(item.rankScore)}
                                                    />
                                                </Item>
                                            </Item>
                                        )
                                    }
                                }
                            )}
                        </Item>
                    )
                }

                {getRole() === "CLIENT" &&
                    <Item sx={{place: 'center', display: 'block'}}>
                        <Text sx={{color: '#FFC107', fontSize: '2vw'}}
                              sm={{fontSize: '5vw'}}>당신은 <b>{rank}위</b> 입니다.</Text>
                        <Text sx={{color: '#FFC107', fontSize: '2vw'}} sm={{fontSize: '5vw'}}>({Math.floor(rankScore)} 점)</Text>
                        <Card_panel>
                            <Text sx={{fontSize: '2vw'}} sm={{fontSize: '5vw'}}>총 참가자
                                : {quizPlay.userList.length}명</Text>
                            <Text sx={{fontSize: '2vw'}} sm={{fontSize: '5vw'}}>총 {quizPlay.quiz.num}문제 중, N문제 정답 / N문제
                                오답 </Text>
                        </Card_panel>
                    </Item>
                }

                <Item sx={{place: 'center', height: "10%"}}>
                    <Item sx={{place: 'center'}}>
                        {getRole() === "CLIENT" &&
                            <Btn sx={{place: 'center', display: 'flex', margin: 'auto'}} onClick={() => {
                                html2canvas(document.querySelector("#capture")).then(canvas => {
                                    let link = document.createElement('a');
                                    if (typeof link.download === 'string') {
                                        link.href = canvas.toDataURL('image/png');
                                        link.download = "capture-test.png";
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    } else {
                                        window.open(canvas.toDataURL('image/png'));
                                    }
                                })
                            }}>
                                화면 캡처
                            </Btn>
                        }

                        <Btn sx={{place: 'center', display: 'flex', margin: 'auto'}} onClick={() => {
                            /**
                             * Host일 경우에만 방을 삭제한다. 레디스로
                             */
                            if(getRole() === "HOST")
                            {
                                stompSend("end", {
                                    pinNum: getPinNum(),
                                    action: "END"
                                });
                            }
                            flushLocalStorage();
                            redirectPage("MAIN");
                            history.go(0);
                        }}>
                            확인
                        </Btn>
                    </Item>
                </Item>
            </Card_panel>
        </Content>
    )
}
