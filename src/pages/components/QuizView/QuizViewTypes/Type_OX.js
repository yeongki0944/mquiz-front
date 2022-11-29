import {useDispatch, useSelector} from "react-redux";
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import styled from "styled-components";
import {setContent, setData} from "../../../redux/reducers/quizplayReducer";

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
export const Type_OX = () => {
    const dispatch = useDispatch();
    const quizPlay = useSelector(state => state.quizPlay);
    if(quizPlay === ""){
        return (
            <div>
                <Card_Btn>O</Card_Btn>
                <Card_Btn>X</Card_Btn>
            </div>
        )
    }else{
        return (
            <div>
                {console.log(quizPlay)}
                <Card_Btn
                    onClick={() => {
                        dispatch(setContent({key: "answer", value: "O"}));
                    }}
                >O</Card_Btn>
                <Card_Btn
                    onClick={() => {
                        dispatch(setContent({key: "answer", value: "X"}));
                    }}
                >X</Card_Btn>
            </div>
        )
    }
}
