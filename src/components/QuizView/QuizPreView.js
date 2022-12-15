import * as React from "react";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "./Outputs/ImageShow";
import {AudioShow} from "./Outputs/AudioShow";
import {YoutubeShow} from "./Outputs/YoutubeShow";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Img, Item,Text} from "../../LayOuts/LayOuts";

const imageItemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    }
];

export const QuizPreView = (props) => {
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

    return (
        <Item sx={props.sx} sm={props.sm}>
            <Item sx={{place: 'left', display: 'block'}}>
                <Item sx={{place: 'center'}}>
                    <Item sx={{place: 'center'}}><Text>[퀴즈 {currentQuiz.num}]</Text></Item>
                    <Item sx={{place: 'center'}}><Text>{currentQuiz.type}</Text></Item>
                </Item>
                <Item sx={{place: 'center'}}>
                    <Item sx={{place: 'center', width: '50%'}}><Text>{currentQuiz.question}</Text></Item>
                    <Item sx={{place: 'center', width: '50%'}}>{currentQuiz.media.url !== "" ? <Media/> :
                        <Img src={imageItemData[0].img} sx={{width: '100%', height: '100%'}}/>}</Item>
                </Item>
                <Item sx={{place: 'center'}}>
                    <Item sx={{place: 'center', width: '100%'}}><Text>정답</Text></Item>
                </Item>
                <Item sx={{place: 'center'}}>
                    <Item sx={{place: 'center', width: '100%'}}>
                        <Item sx={{place: 'center'}}>{currentQuiz.choiceList.num1 !== "" ? <Text>1.{currentQuiz.choiceList.num1}</Text> : <></>}</Item>
                        <Item sx={{place: 'center'}}>{currentQuiz.choiceList.num2 !== "" ? <Text>2.{currentQuiz.choiceList.num2}</Text> : <></>}</Item>
                        <Item sx={{place: 'center'}}>{currentQuiz.choiceList.num3 !== "" ? <Text>3.{currentQuiz.choiceList.num3}</Text> : <></>}</Item>
                        <Item sx={{place: 'center'}}>{currentQuiz.choiceList.num4 !== "" ? <Text>4.{currentQuiz.choiceList.num4}</Text> : <></>}</Item>
                    </Item>
                </Item>
            </Item>
        </Item>
    )
}
