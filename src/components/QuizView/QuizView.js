import * as React from "react";
import {Gauge} from "./Gauge";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "./Outputs/ImageShow";
import {AudioShow} from "./Outputs/AudioShow";
import {YoutubeShow} from "./Outputs/YoutubeShow";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Btn, Card_panel, Item, Text} from "../../LayOuts/LayOuts"
import {getPinNum, getQuizTime} from "../../function/localStorage";

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
                <Item sx={{place: 'center', display: 'block', height: '20%'}} sm={{height: '20%'}}>
                    <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                        PIN: {getPinNum()}
                    </Text>
                    <Item sx={{place: 'center', height: '50%', width:'100%'}}>
                        <Gauge
                            quizPlay={quizPlay}
                            Qnum={currentQuiz.num}
                            TotalQcnt={"N"}
                        />
                    </Item>
                </Item>
                <Item sx={{place: 'center', height: '40%', display: 'flex'}} sm={{display: 'block', height: '40%'}}>
                    {props.state === "play" ?
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}>{currentQuiz.question}</Card_panel>
                        :
                        <Card_panel sx={{place: 'center', minWidth:'45%',minHeight:'90%',margin:'auto',maxHeight:'90%'}} sm={{minWidth:'95%',minHeight:'45%',margin:'10px'}}>{currentQuiz.question}</Card_panel>
                    }
                    {props.state === "play" ?
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}><Media/></Card_panel>
                        :
                        <Card_panel sx={{place: 'center', width:'45%',height:'90%',margin:'auto',overflow:'hidden'}} sm={{width:'95%',height:'45%',margin:'10px'}}><Media/></Card_panel>
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
                    <Card_panel sx={{height:'100vh',backgroundColor:'rgba(0,0,0,0.4)'}}>
                        <View/>
                    </Card_panel>
                </Item>
            );
            break;
        case "create":
            return (
                <Item sx={props.sx}>
                    <Card_panel sx={{height:'90%',width:'90%',backgroundColor:'#fff'}} sm={{height:'100%'}}>
                        <View/>
                    </Card_panel>
                </Item>
            );
            break;
    }

}
