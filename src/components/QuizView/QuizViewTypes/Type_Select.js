import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useSelector, useDispatch} from "react-redux";
import './QuizTypes.css';
import {Type_OX} from "./Type_OX";
import {Type_Reply} from "./Type_Reply";
import {R_setContent} from "../../../redux/reducers/quizplayReducer";
import styled from "styled-components";

const Card_Btn = styled.div`
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    border-radius: 5px;
        
    @media (min-width: 300px) and (max-width: 767px) {
        margin: 5px;
        width:45%;
        height: 15vh;
        float:left;
    }
    @media (min-width: 767px) {
        margin : 10px;
        width:45%;
        height: 15vh;
        display: block;
        float: left;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
`;

export const Type_Select = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

        {console.log((currentQuiz))}
        return (
            <div>
                <Card_Btn onClick={()=>{
                    dispatch(R_setContent({key: "answer", value: "1"}));
                    //console.log("1111");
                }}>{currentQuiz.choiceList["1"]}</Card_Btn>

                <Card_Btn onClick={()=>{
                    dispatch(R_setContent({key: "answer", value: "2"}));
                    //console.log("2222");
                }}>{currentQuiz.choiceList["2"]}</Card_Btn>

                {<Card_Btn onClick={()=>{
                    dispatch(R_setContent({key: "answer", value: "3"}));
                    //console.log("333");
                }}>{currentQuiz.choiceList["3"]}</Card_Btn>}

                {<Card_Btn onClick={()=>{
                    dispatch(R_setContent({key: "answer", value: "4"}));
                    //console.log("444");
                }}>{currentQuiz.choiceList["4"]}</Card_Btn>}
            </div>
        );
}
