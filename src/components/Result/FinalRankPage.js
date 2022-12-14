import {Btn, Item} from "../../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useEffect, useState} from "react";
import {Avatar} from "@mui/material";
import {stompDisconnect} from "../../function/WebSocket";
import {PinNum} from "../PinNum";
import * as React from "react";
import {useHistory} from "react-router-dom";
import html2canvas from "html2canvas";
import {flushLocalStorage, getNickname, getPinNum, getRole} from "../../function/localStorage";

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
        <Item
            id={"capture"}
            sx={{
                display: "block",
                maxWidth: "1200px",
                width: "100%",
                height: "100%",
                margin: "auto",
                background: "#ffffff"
            }}
        >
            <Item sx={{place: "left", borderBottom: "1px solid black", height: "5%"}}>
                <PinNum pinNum={getPinNum()}/>
            </Item>

            {
                getRole() === "CLIENT" ? (
                    <Item sx={{height: "40%", place: "center"}}>
                        <Avatar sx={{width: 300, height: 300}}><h2>{quizPlay.nickName}</h2></Avatar>
                    </Item>
                ) : (
                    <Item sx={{place: 'top',width:'100%', height:'100%', maxHeight:'85%', marginTop:'10px'}}>
                        {quizPlay.rank.map(
                            (item, index) => {
                                if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                                    return (
                                        <Item key={index} sx={{place:'center',height:'30%', margin:'5px'}}>
                                            <Rank
                                                rank={item.rank}
                                                nickName={item.nickName}
                                                score={item.rankScore}
                                            />
                                        </Item>
                                    )
                                }
                            }
                        )}
                    </Item>
                )
            }

            {getRole() === "CLIENT" &&
                <>
                    <Item sx={{place: "center", height: "10%"}}><h1>당신은 <b>{rank}위</b> 입니다.</h1></Item>
                    <Item sx={{place: "center", height: "10%"}}><h1>({rankScore} 점)</h1></Item>
                    <Item sx={{
                        height: "25%",
                        border: "1px solid #f5f5f5",
                        background: "#f5f5f5",
                        display: "flex",
                        place: "center"
                    }}>
                        <Item sx={{place: "center", width: "35%"}}>
                            <h2>총 참가자 : {quizPlay.userList.length}명</h2>
                        </Item>
                        <Item sx={{place: "center", width: "65%"}}>
                            <h2>총 {quizPlay.quiz.num}문제 중, N문제 정답 / N문제 오답 </h2>
                        </Item>
                    </Item>
                </>
            }

            <Item sx={{place: 'center', height: "10%"}}>
                <Item sx={{place:'center'}}>
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
                        stompDisconnect();
                        flushLocalStorage();
                        history.push('/');
                        history.go(0);
                    }}>
                        확인
                    </Btn>
                </Item>
            </Item>
        </Item>
    )
}
