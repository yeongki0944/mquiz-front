import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Type_Select} from "./QuizView/QuizViewTypes/Type_Select";
import {Type_OX} from "./QuizView/QuizViewTypes/Type_OX";
import {Type_Reply} from "./QuizView/QuizViewTypes/Type_Reply";


export default function QuizView(props) {
    const quiz = props.quiz;
    const currentQuiz =props.currentQuiz;

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={3}>
                <QuestionField/>
                <Grid item xs={12}>
                    <AnswerSheet/>
                </Grid>
            </Grid>
        </Box>
    );

    function QuestionField() {
        return (
            <>
                <Grid item xs={12}>
                    게이지 {currentQuiz.time}
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{minWidth: 275, border: 1}}>
                        <CardContent>
                            {currentQuiz.question}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{minWidth: 275, border: 1}}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Media/>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        )
    }

    function AnswerSheet() {
        // console.log(currentQuiz.type);
        switch (currentQuiz.type) {
            case "선택형":
                return (<Type_Select/>);
                break;
            case "OX":
                return (<Type_OX/>);
                break;
            case "단답형":
                return (<Type_Reply/>);
                break;
        }
    }


    function Media() {
        switch (currentQuiz.media.type) {
            case "image":
                return (<Image/>);
                break;
            case "video":
                return (<Video/>);
                break;
            case "audio":
                return (<Audio/>);
                break;
        }
    }

    function Image() {
        return (
            <></>
            // <img src={quizData[currentShow-1].media.url} alt="이미지"/>
        )
    }

    function Video() {
        return (
            <></>
            // <video src={quizData[currentShow - 1].media.url} controls/>
        )
    }

    function Audio() {
        return (
            <></>
            // <audio src={quizData[currentShow - 1].media.url} controls/>
        )
    }
}
