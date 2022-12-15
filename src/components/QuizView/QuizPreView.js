import * as React from "react";
import {Gauge} from "./Gauge";
import {QuizQuestion} from "./QuizQuestion";
import {Type_Select} from "./QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizViewTypes/Type_Reply";
import {ImageShow} from "./Outputs/ImageShow";
import {AudioShow} from "./Outputs/AudioShow";
import {YoutubeShow} from "./Outputs/YoutubeShow";
import {useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Img, Item, Item_c, Item_l, Item_r, Text} from "../../LayOuts/LayOuts";

const imageItemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    }
];
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
    border: 1px solid black;
    display: block;
    @media (min-width: 300px) and (max-width: 767px) {
        margin-top: 5vh;
        height: 40vh;
    }
    @media (min-width: 767px) {
        width:80vh;
        height: 40vh;
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
const Item_c_QBox = styled(Item_c)`
    border: 1px solid black;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    float:right;
    width:10%;
`;

const Item_c_QNum = styled(Item_c)`
    width:40%;
    border: 1px solid black;
    justify-content: left;
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

const Item_c_Media = styled(Item_c)`
    margin-top:10px;
    border: 1px solid black;
    max-width: 200px;
    max-height: 200px;
    @media (min-width: 300px) and (max-width: 767px) {
        width:100%;
        height:100%;
    }
    @media (min-width: 767px) {
        width:100%;
        height:100%;
    }
`;

const Item_c_Quiz = styled(Item_c)`
    margin-top:10px;
    border: 1px solid black;
    float:left
    @media (min-width: 300px) and (max-width: 767px) {
        width:100%;
    }
    @media (min-width: 767px) {
        width:100%;
    }
`;

const Item_l_Question = styled(Item_l)`
    border: 1px solid black;
    @media (min-width: 300px) and (max-width: 767px) {
        display: block;
        margin-top: 5vh;
        width:100%
        height: 100%;
    }
    @media (min-width: 767px) {
        width:100%
        height: 100%;
    }
`;

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
