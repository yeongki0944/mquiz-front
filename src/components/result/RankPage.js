import {Btn, Content, Item, Text} from "../../layouts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useState} from "react";
import {Answer} from "./Answer";
import * as React from "react";
import {getNickname, getPinNum, getRole} from "../../function/localStorage";
import {stompSend} from "../../function/WebSocket";
import {FinalRankPage} from "./FinalRankPage";


const RankBox = (props) => {
    return (
        <Item sx={{place: 'top', display: 'block'}}>
            {getRole() === "CLIENT"
                && <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>내 점수</Text>
            }
            {
                getRole() === "CLIENT"
                && props.quizPlay.rank.map(
                    (item, index) => {
                        if (item.nickName === getNickname()) {
                            return (
                                <Item sx={{place: "center",height:'20%'}} key={index}>
                                    <Item sx={{place: "center", height: '100%', width: '50%'}} sm={{width:'90%'}}>
                                        <Rank
                                            sx={{place: "top", height: '100%', width: '100%'}}
                                            rank={item.rank}
                                            nickName={item.nickName}
                                            score={Math.floor(item.rankScore)}
                                            type={"personal"}
                                        />
                                    </Item>
                                </Item>
                            )
                        }
                    }
                )
            }
            <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>참여자 점수</Text>
            {props.quizPlay.rank.map(
                (item, index) => {
                    //if rank == 1 or 2 or 3
                    if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                        return (
                            <Item sx={{place: "center",height:'20%'}} key={index}>
                                <Item sx={{place: "center", height: '100%', width: '50%'}} sm={{width:'90%'}}>
                                    <Rank
                                        sx={{place: "top", height: '100%', width: '100%'}}
                                        rank={item.rank}
                                        nickName={item.nickName}
                                        score={Math.floor(item.rankScore)}
                                        type={"top"}
                                    />
                                </Item>
                            </Item>
                        )
                    }
                }
            )}
            <Item sx={{place:'center',height:'10%',position:'absolute',bottom:'0'}}>
                <Btn onClick={()=>{props.setView('answer')}}>정답보기</Btn>
                {getRole()==="CLIENT" && props.command ==="FINAL" && <Btn onClick={()=>{props.setView('final')}}>최종결과보기</Btn>}
                {getRole() === "HOST" &&
                    <Btn onClick={()=>{
                        stompSend("start", {
                            pinNum: getPinNum(),
                            action: "COMMAND",
                            command: "START"
                        });
                    }}>다음문제</Btn>
                }
            </Item>
        </Item>
    )

}

export const RankPage = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [view, setView] = useState('answer');

    return (
        <Content>
            <Item sx={{place: 'center', height: '90vh', width: '100vw'}}>
                {view === 'rank' && <RankBox quizPlay={quizPlay} setView={setView} command = {quizPlay.command}/>}
                {view === 'answer' && <Answer currentQuiz={quizPlay.quiz} setView={setView} command = {quizPlay.command}/>}
                {view === 'final' && <FinalRankPage/>}
            </Item>
        </Content>
    )
}
