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


export const QuizView = (props) => {
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
            case "image":
                return (<ImageShow/>);
                break;
            case "video":
                return (<YoutubeShow/>);
                break;
            case "audio":
                return (<AudioShow/>);
                break;
        }
    }


    return (
        <div id={"content"}>
            <div id={"section1"}>
                <div id={"section1_items"}>
                    <Gauge
                        Qnum={1}
                        TotalQcnt={10}
                        timeprogress={50}
                        timeleft={20}
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
            <div  id={"section2"}>
                <div id={"section2_items"}>
                    <AnswerSheet/>
                </div>
            </div>
        </div>

    )
}