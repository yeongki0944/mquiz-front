import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import Paper from "@mui/material/Paper";
import {Gauge} from "./Gauge";
import {QuizQuestion} from "./QuizQuestion";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "../Outputs/ImageShow";
import {AudioShow} from "../Outputs/AudioShow";
import {YoutubeShow} from "../Outputs/YoutubeShow";
import {makeStyles} from "@material-ui/core/styles";
import './QuizView.css';
import {PinNum} from "../PinNum";
import {VolumeControlButton} from "../VolumeControlButton";
import {useEffect} from "react";
import {useSelector} from "react-redux";


export const QuizView = (props) => {
    const {quizPlay}=useSelector(state => state.quizPlay)
    const currentQuiz = props.currentQuiz;
    const AnswerSheet = () => {
        switch (currentQuiz.type) {
            case "선택형":
                return (<Type_Select/>);
                break;
            case "OX":
                return (<Type_OX/>);
                break;
            case "단답형":
                return (<Type_Reply/>);
                break;
        }
    }

    const Media = () => {
        switch (currentQuiz.media.type) {
            case "Image":
                return (<ImageShow/>);
                break;
            case "Youtube":
                return (<YoutubeShow/>);
                break;
            case "Audio":
                return (<AudioShow/>);
                break;
            default:
                return (<>media</>);
        }
    }

    useEffect(() => {
        console.log(currentQuiz.media);
    }, [])

    return (
        <div id={"content"}>
            <div id={"section1"}>
                <div id={"section1_items"}>
                    <PinNum pinNum={quizPlay.pinNum}/>
                    <VolumeControlButton/>
                </div>
                <div id={"section1_items"}>
                    <Gauge
                        Qnum={currentQuiz.num}
                        TotalQcnt={10}
                        timeprogress={10}
                        timeleft={currentQuiz.time}
                    />
                </div>
                <div id={"section1_items"}>
                    <div id={"QuestionArea"}>
                        <QuizQuestion
                            question={currentQuiz.question}
                        />
                    </div>
                    <div id={"QuestionArea"}>
                        <Media/>
                    </div>
                </div>
            </div>
            <div id={"section2"}>
                <AnswerSheet/>
            </div>
        </div>

    )
}
