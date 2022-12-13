import styled from "styled-components";
import {Card, Card_panel, Content, Item, Text} from "../../LayOuts/LayOuts";
import {Type_Select} from "../QuizView/QuizViewTypes/Type_Select";
import {Type_OX} from "../QuizView/QuizViewTypes/Type_OX";
import {Type_Reply} from "../QuizView/QuizViewTypes/Type_Reply";
import {ImageShow} from "../QuizView/Outputs/ImageShow";
import {YoutubeShow} from "../QuizView/Outputs/YoutubeShow";
import {AudioShow} from "../QuizView/Outputs/AudioShow";
import * as React from "react";
import {QuizQuestion} from "../QuizView/QuizQuestion";

export const Answer = (props) => {
    const currentQuiz = props.currentQuiz;
    // console.log(currentQuiz);
    // console.log(currentQuiz.question);
    // console.log(currentQuiz.num);
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
                        <Card_panel
                            sx={{place: 'center', minWidth: '45%', minHeight: '90%', margin: 'auto', maxHeight: '90%'}}
                            sm={{minWidth: '100%', minHeight: '50%'}}>{currentQuiz.question}</Card_panel>
                        :
                        <Card_panel
                            sx={{place: 'center', minWidth: '45%', minHeight: '90%', margin: 'auto', maxHeight: '90%'}}
                            sm={{minWidth: '100%', minHeight: '50%'}}>{currentQuiz.question}</Card_panel>
                    }
                    {props.state === "play" ?
                        <Card_panel sx={{
                            place: 'center',
                            minWidth: '45%',
                            minHeight: '90%',
                            margin: 'auto',
                            maxHeight: '90%',
                            overflow: 'hidden'
                        }} sm={{minWidth: '100%', minHeight: '50%'}}><Media/></Card_panel>
                        :
                        <Card_panel sx={{
                            place: 'center',
                            minWidth: '45%',
                            minHeight: '90%',
                            margin: 'auto',
                            maxHeight: '90%',
                            overflow: 'hidden'
                        }} sm={{minWidth: '100%', minHeight: '50%'}}><Media/></Card_panel>
                    }
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'block'}} sm={{height: '40%'}}>
                    <AnswerSheet/>
                </Item>
            </Item>
        </Card_panel>

    )
}
