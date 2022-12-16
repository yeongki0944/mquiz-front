import {Btn, Card, Card_panel, Content, Item, Text} from "../../layouts/LayOuts";
import {Type_Select} from "../QuizView/QuizViewTypes/Type_Select";
import {Type_OX} from "../QuizView/QuizViewTypes/Type_OX";
import {Type_Reply} from "../QuizView/QuizViewTypes/Type_Reply";
import {ImageShow} from "../QuizView/Outputs/ImageShow";
import {YoutubeShow} from "../QuizView/Outputs/YoutubeShow";
import {AudioShow} from "../QuizView/Outputs/AudioShow";
import * as React from "react";
import {stompSend} from "../../function/WebSocket";
import {getPinNum, getRole} from "../../function/localStorage";

export const Answer = (props) => {
    const currentQuiz = props.currentQuiz;
    const AnswerSheet = () => {
        switch (currentQuiz.type) {
            case "선택형":
                return (<Type_Select currentQuiz={currentQuiz}/>);
                break;
            case "OX":
                return (<Type_OX currentQuiz={currentQuiz}/>);
                break;
            case "단답형":
                return (<Type_Reply currentQuiz={currentQuiz}/>);
                break;
        }
    }

    const Media = () => {
        switch (currentQuiz.media.type) {
            case "Image":
                return (<ImageShow currentQuiz={currentQuiz}/>);
                break;
            case "Youtube":
                return (<YoutubeShow currentQuiz={currentQuiz}/>);
                break;
            case "Audio":
                return (<AudioShow currentQuiz={currentQuiz}/>);
                break;
            default:
                return (<div></div>);
        }
    }

    return (
        <Card_panel sx={{width:'100%',height: '95vh', maxWidth:'1200px', backgroundColor: 'rgba(0,0,0,0.4)'}}>
            <Item sx={{place: 'center', display: 'block', height: '100%'}}>
                <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                    Answer
                </Text>
                <Item sx={{place: 'center', height: '40%', display: 'flex'}} sm={{display: 'block', height: '50%'}}>
                    {props.state === "play" ?
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}>{currentQuiz.question}</Card_panel>
                        :
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}>{currentQuiz.question}</Card_panel>
                    }
                    {props.state === "play" ?
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}><Media/></Card_panel>
                        :
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}><Media/></Card_panel>
                    }
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'block'}} sm={{height: '40%'}}>
                    <AnswerSheet/>
                </Item>
                <Item sx={{place:'center',height:'10%'}}>
                    <Btn onClick={()=>{props.setView('rank')}}>점수보기</Btn>
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
        </Card_panel>

    )
}
