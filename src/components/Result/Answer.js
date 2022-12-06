import styled from "styled-components";
import {Content, Item} from "../LayOuts/LayOuts";
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
    console.log(currentQuiz);
    console.log(currentQuiz.question);
    console.log(currentQuiz.num);
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
        <Content sx={{width: 800, height: 800, margin: 2, display: "block"}}>
            <Item sx={{width: 800, marginBottom: 100}}>
                <h1>Answer</h1>
            </Item>
            <Item sx={{place: "left", width: 200, display: "inline"}}>
                <h2>Quiz.{currentQuiz.num}</h2>
                <Item sx={{
                    width: 100,
                    place: "center",
                    border: "1px solid black",
                    backgroundColor: "#ffffff",
                    borderRadius: 10
                }}>
                    {currentQuiz.type}
                </Item>
            </Item>
            <Item sx={{width:360, height:300, margin:20,place: "center", border: "1px solid black", backgroundColor:"#ffffff", borderRadius:10}}>
                <QuizQuestion question={currentQuiz.question}/>
            </Item>
            {/*<Item sx={{width:360, height:300, margin:20,place: "center", border: "1px solid black", backgroundColor:"#ffffff", borderRadius:10}}>*/}
            {/*    <Media/>*/}
            {/*</Item>*/}
            <AnswerSheet/>
        </Content>
    )
}
