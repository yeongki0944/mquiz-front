import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import {useEffect} from "react";
import {useSelector} from "react-redux";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);


    useEffect(() => {
    });


    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <PinField/>
                    중요도: {currentQuiz.rate}
                </Grid>
                <QuestionField/>
                <Grid item xs={12}>
                    <AnswerSheet/>
                </Grid>
            </Grid>
        </Box>
    );

    function PinField() {
        return (
            <>
                <Typography variant="h4" component="div" gutterBottom>
                    PIN : 123456
                </Typography>
            </>
        )
    }

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
                return (<선택형/>);
                break;
            case "OX":
                return (<OX/>);
                break;
            case "단답형":
                return (<단답형/>);
                break;
        }
    }

    function OX() {
        return (
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper>O</Paper>
                </Grid>
                <Grid item xs>
                    <Paper>X</Paper>
                </Grid>
            </Grid>
        )
    }

    function 단답형() {
        return (
            <>
                <TextField
                    placeholder={currentQuiz.answer}></TextField>
            </>
        )
    }

    function 선택형() {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper>{currentQuiz.choiceList["1"]}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper>{currentQuiz.choiceList["2"]}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper>{currentQuiz.choiceList["3"]}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper>{currentQuiz.choiceList["4"]}</Paper>
                    </Grid>
                </Grid>
            </>
        )
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
