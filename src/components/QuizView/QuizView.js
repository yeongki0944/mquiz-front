import * as React from "react";
import {Gauge} from "./Gauge";
import {QuizQuestion} from "./QuizQuestion";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "./Outputs/ImageShow";
import {AudioShow} from "./Outputs/AudioShow";
import {YoutubeShow} from "./Outputs/YoutubeShow";
import {PinNum} from "../PinNum";
import {VolumeControlButton} from "../VolumeControlButton";
import {useEffect} from "react";
import styled from "styled-components";


const View = styled.div`
    display: block;
    background-color: #ffffff;
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 5%;
    padding: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

`;

const Volume = styled.div`
    width: 20%;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const QArea = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    float: left;
`;

const AArea = styled.div`
    width: 100%;
    height: 40%;
    margin : auto;
`;

const QBox = styled.div`
    width: 50%;
    height: 90%;
    margin : 5px;
    padding: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

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
                return (<></>);
        }
    }

    useEffect(() => {
        console.log(currentQuiz.media);
    }, [])

    return (
        <View>
            <Volume><VolumeControlButton/></Volume>
            <PinNum pinNum={55555}/>
            <Gauge
                Qnum={currentQuiz.num}
                TotalQcnt={10}
                timeprogress={10}
                timeleft={currentQuiz.time}
            />

            <QArea>
                <QBox><QuizQuestion question={currentQuiz.question}/></QBox>
                <QBox><Media/></QBox>
            </QArea>
            <AArea>
                <AnswerSheet/>
            </AArea>
        </View>

    )
}
