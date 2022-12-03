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
import {useSelector} from "react-redux";
import {Item_c, Item_l, Item_r, Page_Default, Page_Gradiant} from "../LayOuts/LayOuts";


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


const Item_r_Volume = styled(Item_r)`
    @media (min-width: 300px) and (max-width: 767px) {
        position: absolute;
        right: 0;
        top: 0;
        width: 40%;
    }
    @media (min-width: 767px) {
        position: absolute;
        right: 0;
        top: 0;
    }
`;
const Item_c_Content = styled(Item_c)`
    display: block;
    @media (min-width: 300px) and (max-width: 767px) {
        margin-top: 5vh;
        height: 90vh;
    }
    @media (min-width: 767px) {
        height: 95vh;
    }
`;

const Item_c_Info = styled(Item_c)`
    display: block;
    @media (min-width: 300px) and (max-width: 767px) {
        margin-top: 5vh;
        height: 10%;
    }
    @media (min-width: 767px) {
        height: 20%;
    }
`;
const Item_c_Question = styled(Item_c)`
    @media (min-width: 300px) and (max-width: 767px) {
        display: block;
        margin-top: 5vh;
        height: 45%;
    }
    @media (min-width: 767px) {
        height: 30%;
    }
`;
const Item_c_QBox = styled(Item_c)`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    @media (min-width: 300px) and (max-width: 767px) {
        margin-bottom: 5px;
        width: 90%;
        height: 50%;
    }
    @media (min-width: 767px) {
        width: 45%;
        height: 100%;
    }
`;

const Item_c_Answer = styled(Item_c)`
    display: block;
    margin-top: 5%;
    @media (min-width: 300px) and (max-width: 767px) {
        height: 45%;
    }
    @media (min-width: 767px) {
        height: 50%;
    }
`;

export const QuizView = (props) => {
    const currentQuiz = props.currentQuiz;
    const {quizPlay} = useSelector(state => state.quizPlay);

    const AnswerSheet = () => {
        switch (currentQuiz.type) {
            case "선택형":
                return (<Type_Select currentQuiz = {currentQuiz}/>);
                break;
            case "OX":
                return (<Type_OX currentQuiz = {currentQuiz}/>);
                break;
            case "단답형":
                return (<Type_Reply currentQuiz = {currentQuiz}/>);
                break;
        }
    }

    const Media = () => {
        switch (currentQuiz.media.type) {
            case "Image":
                return (<ImageShow currentQuiz = {currentQuiz}/>);
                break;
            case "Youtube":
                return (<YoutubeShow currentQuiz = {currentQuiz}/>);
                break;
            case "Audio":
                return (<AudioShow currentQuiz = {currentQuiz}/>);
                break;
            default:
                return (<div></div>);
        }
    }

    useEffect(() => {
        console.log(currentQuiz.media);
    }, [])

    const Content = () => {
        return (
            <div>
                <Item_c_Content>
                    <Item_c_Info>
                        <Item_c><PinNum pinNum={quizPlay.pinNum}/></Item_c>
                        <Item_c>
                            <Gauge
                                Qnum={currentQuiz.num}
                                TotalQcnt={10}
                                timeprogress={10}
                                timeleft={currentQuiz.time}
                            />
                        </Item_c>
                    </Item_c_Info>
                    <Item_c_Question>
                        <Item_c_QBox><QuizQuestion question={currentQuiz.question}/></Item_c_QBox>
                        <Item_c_QBox><Media/></Item_c_QBox>
                    </Item_c_Question>
                    <Item_c_Answer>
                        <AnswerSheet/>
                    </Item_c_Answer>
                </Item_c_Content>
            </div>

        )
    }

    switch (props.state) {
        case "play":
            return (
                <Page_Default>
                    <Item_r_Volume><VolumeControlButton/></Item_r_Volume>
                    <Content/>
                </Page_Default>
            );
            break;
        case "create":
            return (
                <View>
                    <Content/>
                </View>
            );
            break;
    }

}
