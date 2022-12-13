import * as React from "react";
import {Gauge} from "./Gauge";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "./Outputs/ImageShow";
import {AudioShow} from "./Outputs/AudioShow";
import {YoutubeShow} from "./Outputs/YoutubeShow";
import {VolumeControlButton} from "../VolumeControlButton";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Card, Item, Item_r} from "../../LayOuts/LayOuts"

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
                return (<Item sx={{place:'center'}}></Item>);
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
                    <Item sx={{place: 'center', height: '50%', width:'100%'}}>
                        <Gauge
                            quizPlay={quizPlay}
                            Qnum={currentQuiz.num}
                            TotalQcnt={"N"}
                            timeprogress={10}
                            timeleft={currentQuiz.time}
                        />
                    </Item>
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'flex'}} sm={{display: 'block', height: '50%'}}>
                    <Card sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%'}} sm={{minWidth:'100%',minHeight:'50%'}}>{currentQuiz.question}</Card>
                    <Card sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%',overflow:'hidden'}} sm={{minWidth:'100%',minHeight:'50%'}}><Media/></Card>
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'block'}} sm={{height: '35%'}}>
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
