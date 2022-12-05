import * as React from "react";
import {Gauge} from "./Gauge";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "./Outputs/ImageShow";
import {AudioShow} from "./Outputs/AudioShow";
import {YoutubeShow} from "./Outputs/YoutubeShow";
import {VolumeControlButton} from "../VolumeControlButton";
import {useSelector} from "react-redux";
import {Content, Item} from "../LayOuts/LayOuts";






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


    const View = () => {
        return (
            <Content sx={{display: 'block', height: '95vh'}} sm={{marginTop: '5vh', height: '90vh'}}>
                <Item sx={{display:'block',height:'20%'}} sm={{marginTop:'5vh',height:'10%'}}>
                    <Item sx={{place:'center',width:'100%',margin:'auto',fontSize:'2.5rem'}}>Pin:{quizPlay.pinNum}</Item>
                    <Item sx={{width:'100%',margin:'auto'}}>
                        <Gauge
                            Qnum={currentQuiz.num}
                            TotalQcnt={10}
                            timeprogress={10}
                            timeleft={currentQuiz.time}
                        />
                    </Item>
                </Item>
                <Item sx={{place:'center',margin:'auto',width:'100%',height:'30%'}} sm={{height:'45%',display:'block',marginTop:'5vh'}}>
                    <Item
                        sx={{place:'center',width:'45%',height:'100%',margin:'auto',bg:'#fff',borderRadius:'10px',boxShadow:'0 0 10px 0 rgba(0,0,0, 0.2)'}}
                        sm={{marginBottom:'5px',width:'90%',height:'50%'}}
                    >{currentQuiz.question}</Item>
                    <Item
                        sx={{place:'center',width:'45%',height:'100%',margin:'auto',bg:'#fff',borderRadius:'10px',boxShadow:'0 0 10px 0 rgba(0,0,0, 0.2)'}}
                        sm={{marginBottom:'5px',width:'90%',height:'50%'}}
                    ><Media/></Item>
                </Item>
                <Item sx={{width:'100%',height:'50%',display:'block',margin:'auto'}} sm={{height:'45%'}}>
                    <AnswerSheet/>
                </Item>
            </Content>

        )
    }

    switch (props.state) {
        case "play":
            return (
                <Content sx={props.sx}>
                    <VolumeControlButton sx={{position: 'absolute', right: '0', top: '0', width: '40%'}}/>
                    <View/>
                </Content>
            );
            break;
        case "create":
            return (
                <Content sx={props.sx}>
                    <Item sx={{
                        display: 'block',
                        background: '#fff',
                        width: '90%',
                        height: '90%',
                        margin: 'auto',
                        padding: '10px',
                        boxShadow: ' 0 0 10px 0 rgba(0, 0, 0, 0.2)'
                    }}>
                        <View/>
                    </Item>
                </Content>
            );
            break;
    }

}
