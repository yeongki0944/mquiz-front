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
import {Card, Content, Item, Item_c, Item_l, Item_r, Page_Default, Page_Gradiant} from "../LayOuts/LayOuts";

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


export const QuizView = (props) => {
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
                return (<div></div>);
        }
    }

    useEffect(() => {
        console.log(currentQuiz.media);
    }, [])

    const View = () => {
        return (
            <Item sx={{place: 'center', display: 'block', height: '90%', background: '#fff'}}>
                <Item sx={{place: 'center', display: 'block', height: '20%'}} sm={{height: '10%'}}>
                    <Item sx={{
                        place: 'center',
                        height: '50%',
                        fontSize: '2em',
                        fontWeight: 'bold'
                    }}>PIN: {quizPlay.pinNum}</Item>
                    <Item sx={{place: 'center', height: '50%'}}>PIN: {quizPlay.pinNum}
                        {/*<Gauge*/}
                        {/*    quizPlay={quizPlay}*/}
                        {/*    Qnum={currentQuiz.num}*/}
                        {/*    TotalQcnt={10}*/}
                        {/*    timeprogress={10}*/}
                        {/*    timeleft={currentQuiz.time}*/}
                        {/*/>*/}
                    </Item>
                </Item>
                <Item sx={{place: 'center', height: '30%', display: 'flex'}} sm={{display: 'block', height: '45%'}}>
                    <Card sx={{place: 'center', minWidth:'400px',minHeight:'200px',margin:'auto'}} sm={{minWidth:'300px',minHeight:'150px'}}>{currentQuiz.question}</Card>
                    <Card sx={{place: 'center', minWidth:'400px',minHeight:'200px',margin:'auto'}} sm={{minWidth:'300px',minHeight:'150px'}}><Media/></Card>
                </Item>
                <Item sx={{place: 'center', height: '50%', display: 'block'}} sm={{height: '45%'}}>
                    <AnswerSheet/>
                </Item>
            </Item>


        )
    }

    switch (props.state) {
        case "play":
            return (
                <Item sx={{place:'center',display:'block',maxWidth:'1200px',margin:'auto'}}>
                    <VolumeControlButton sx={{place: 'top-right', height: '5vh'}}/>
                    <View/>
                </Item>
            );
            break;
        case "create":
            return (
                <Item sx={props.sx}>
                    <View/>
                </Item>
            );
            break;
    }

}
