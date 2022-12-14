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
import {Card_panel, Item, Text} from "../../LayOuts/LayOuts"
import {getPinNum} from "../../function/localStorage";

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
            <Item sx={{place: 'center', display: 'block', height: '100%'}}>
                <Item sx={{place: 'center', display: 'block', height: '20%'}} sm={{height: '10%'}}>
                    <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                        PIN: {getPinNum()}
                    </Text>
                    <Item sx={{place: 'center', height: '50%', width:'100%'}}>
                        {/*<Gauge*/}
                        {/*    quizPlay={quizPlay}*/}
                        {/*    Qnum={currentQuiz.num}*/}
                        {/*    TotalQcnt={"N"}*/}
                        {/*    timeprogress={10}*/}
                        {/*    timeleft={currentQuiz.time}*/}
                        {/*/>*/}
                    </Item>
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'flex'}} sm={{display: 'block', height: '50%'}}>
                    {props.state === "play" ?
                        <Card_panel sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%'}} sm={{minWidth:'100%',minHeight:'50%'}}>{currentQuiz.question}</Card_panel>
                        :
                        <Card_panel sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%'}} sm={{minWidth:'100%',minHeight:'50%'}}>{currentQuiz.question}</Card_panel>
                    }
                    {props.state === "play" ?
                        <Card_panel sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%',overflow:'hidden'}} sm={{minWidth:'100%',minHeight:'50%'}}><Media/></Card_panel>
                        :
                        <Card_panel sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%',overflow:'hidden'}} sm={{minWidth:'100%',minHeight:'50%'}}><Media/></Card_panel>
                    }
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'block'}} sm={{height: '40%'}}>
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
                    <Card_panel sx={{height:'95vh',backgroundColor:'rgba(0,0,0,0.4)'}}>
                        <View/>
                    </Card_panel>
                </Item>
            );
            break;
        case "create":
            return (
                <Item sx={props.sx}>
                    <Card_panel sx={{height:'90%',width:'100%',backgroundColor:'#fff'}}>
                        <View/>
                    </Card_panel>
                </Item>
            );
            break;
    }

}
