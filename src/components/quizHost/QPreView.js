import * as React from "react";
import {Type_Select} from "../QuizView/QuizViewTypes/Type_Select";
import {Type_OX} from "../QuizView/QuizViewTypes/Type_OX";
import {Type_Reply} from "../QuizView/QuizViewTypes/Type_Reply";
import {ImageShow} from "../QuizView/Outputs/ImageShow";
import {AudioShow} from "../QuizView/Outputs/AudioShow";
import {YoutubeShow} from "../QuizView/Outputs/YoutubeShow";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import { Item,Text} from "../../layouts/LayOuts";


export const QPreView = (props) => {
    const currentQuiz = props.currentQuiz;
    const {quizPlay} = useSelector(state => state.quizPlay);

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
                return (<ImageShow currentQuiz={currentQuiz}/>);
        }
    }


    return (
        <Item sx={props.sx} sm={props.sm}>
            <Item sx={{place: 'left', display: 'block'}}>
                <Item sx={{place: 'center'}}>
                    <Item sx={{place: 'center'}}><Text>[퀴즈 {currentQuiz.num}]</Text></Item>
                    <Item sx={{place: 'center'}}><Text>{currentQuiz.type}</Text></Item>
                </Item>
                <Item sx={{place: 'center'}}>
                    <Item sx={{place: 'center', width: '50%'}}><Text>{currentQuiz.question}</Text></Item>
                    <Item sx={{place: 'center', width: '50%',height:'10%'}}><Media/></Item>
                </Item>
                <Item sx={{place: 'center'}}>
                    {currentQuiz.type !== "단답형" ? <AnswerSheet/> : <div></div>}
                </Item>
                <Item sx={{place:'center'}}>
                    <Item sx={{place: 'center', width: '100%'}}><Text>정답:{currentQuiz.answer}</Text></Item>
                </Item>
            </Item>
        </Item>
    )
}
