import {Btn, Content, Item} from "../../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useState} from "react";
import {Answer} from "./Answer";
import {VolumeControlButton} from "../VolumeControlButton";
import * as React from "react";
import {getNickname, getRole} from "../../function/localStorage";


const RankBox = (props) => {
    // const {quizPlay} = useSelector(state => state.quizPlay);

    return (
        <div>
            {
                getRole() === "CLIENT"
                && <Item sx={{
                    place: 'left',
                    display: 'block',
                    width: '90%',
                    height: '100%',
                    fontSize: '4vw',
                    fontWeight: '600',
                    lineHeight: '2.5rem',
                }}>
                    내 점수
                </Item>
                && props.quizPlay.rank.map(
                    (item, index) => {
                        if (item.nickName === getNickname()) {
                            return (
                                <Rank
                                    key={index}
                                    rank={item.rank}
                                    nickName={item.nickName}
                                    score={item.rankScore}
                                />
                            )
                        }
                    }
                )
            }
            <Item sx={{
                place: 'left',
                display: 'block',
                width: '90%',
                height: '100%',
                // font-size: 4vw;
                fontWeight: '600',
                lineHeight: '2.5rem',
            }}>
                참여자 점수
            </Item>
            {props.quizPlay.rank.map(
                (item, index) => {
                    //if rank == 1 or 2 or 3
                    if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                        return (
                            <Rank
                                key={index}
                                rank={item.rank}
                                nickName={item.nickName}
                                score={item.rankScore}
                            />
                        )
                    }
                }
            )}
        </div>
    )

}

export const Rank_Page = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [view, setView] = useState('answer');

    return (
        <Content>
            <VolumeControlButton sx={{place: 'top-right', height: '5vh'}}/>
            <Item sx={{place: 'center', height: '85vh',width:'100vw'}}>
                {view === 'rank' && <RankBox quizPlay={quizPlay}/>}
                {view === 'answer' && <Answer currentQuiz={quizPlay.quiz}/>}
            </Item>
            <Item sx={{place: 'center', height: '10vh'}}>
                {view === 'rank' && <Btn sx={{place: 'center'}} onClick={() => {
                    setView("answer");
                }}>정답보기</Btn>
                }
                {view === 'answer' &&
                    <Btn sx={{place: 'center'}}
                         onClick={() => {
                             setView("rank");
                         }}>결과보기</Btn>
                }
            </Item>
        </Content>
    )
}
