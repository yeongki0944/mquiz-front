import styled from "styled-components";
import {Card, Content, Item} from "../../LayOuts/LayOuts";
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
        <Item sx={{place:'center',width:'100%',display:'block'}}>
            <Item sx={{
                place: 'center',
                height: '20%',
                fontSize: '2em',
                fontWeight: 'bold'
            }}>Answer</Item>
            <Item sx={{place: 'center', height: '40%', display: 'flex'}} sm={{display: 'block', height: '45%'}}>
                <Card sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%'}} sm={{minWidth:'100%',minHeight:'150px'}}>{currentQuiz.question}</Card>
                <Card sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%',overflow:'hidden'}} sm={{minWidth:'100%',minHeight:'150px'}}><Media/></Card>
            </Item>
            <Item sx={{place: 'center', height: '40%', display: 'block'}} sm={{height: '45%'}}>
                <AnswerSheet/>
            </Item>
        </Item>

    )
}
