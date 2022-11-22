import * as React from 'react';
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {
    Box,
    Button, LinearProgress, Slider,
    Typography
} from "@mui/material";
import {
    VolumeUp
} from "@material-ui/icons";
import {PropTypes} from "@material-ui/core";
import {useSelector} from "react-redux";
import {QuizView} from "../components/QuizView/QuizView";

const useStyles = makeStyles(() => ({
    volumeStyle: {
        marginRight: 4,
        width: 80,
        maxWidth: 100,
    },
}));

export const QuizHostPlay = () => {
    const styles = useStyles();

    const quiz = useSelector(state => state.quiz.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);


    // // pin 번호 나중에 받아온 값으로 변경해야함.
    // const [pinData, setPinData] = useState("123456");
    // // 볼륨
    // const [volumeData, setVolumeData] = useState(50);
    // // 타이머
    // const [timerData, setTimerData] = useState(10);
    //
    //
    //
    // const [progressValue, setProgressValue] = useState(100);


    return (
        <div id={"content"}>
            <QuizView currentQuiz={currentQuiz}/>
            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={12}>*/}
            {/*        <QuizHostPin/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12}>*/}
            {/*        <QuizTimer/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container item xs={12}>*/}
            {/*        <Grid item xs={1}></Grid>*/}
            {/*        <Grid item xs={10}>*/}
            {/*            <ChooseFourQuiz/>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={1}></Grid>*/}
            {/*    </Grid>*/}
            {/*    <Grid container item xs={12}>*/}
            {/*        <Grid item xs={1}></Grid>*/}
            {/*        <Grid item xs={10}>*/}
            {/*            <OXQuiz/>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={1}></Grid>*/}
            {/*    </Grid>*/}
            {/*    <Grid container item xs={12}>*/}
            {/*        <Grid item xs={1}></Grid>*/}
            {/*        <Grid item xs={10}>*/}
            {/*            <DescriptQuiz/>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={1}></Grid>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </div>
    );

    // function QuizHostPin() {
    //     const [volume, setVolume] = React.useState(volumeData);
    //
    //     return (
    //         <>
    //             <Box spacing={2} direction="row" alignItems="center">
    //                 <div style={{display: "inline-block"}}>
    //                     <Typography align={"center"} variant={"h3"}>
    //                         <b>PIN : {pinData}</b>
    //                     </Typography>
    //                 </div>
    //                 <div style={{display: "inline-block", width: 200}} align={"center"}>
    //                     <Slider
    //                         className={styles.volumeStyle}
    //                         aria-label="Volume"
    //                         value={volume}
    //                         onChange={
    //                             (event, newValue) => {
    //                                 setVolume(newValue);
    //                             }
    //                         }
    //                         onBlur={
    //                             (event) => {
    //                                 setVolumeData(volume);
    //                             }
    //                         }
    //                     />
    //                     <VolumeUp/>
    //                 </div>
    //                 <div style={{display: "inline-block"}}>
    //                     <Button variant="contained" onClick={
    //                         () => {
    //
    //                         }
    //                     }>
    //                         전체화면
    //                     </Button>
    //                 </div>
    //             </Box>
    //         </>
    //     )
    // }
    //
    // function QuizTimer() {
    //     const [progressBar, setProgressBar] = useState(progressValue);
    //     useEffect(() => {
    //         const timer = setInterval(() => {
    //             setProgressBar((oldProgress) => {
    //                 const diff = timerData / 10;
    //                 return Math.max(oldProgress - diff, 0);
    //             });
    //             if(timerData<0){
    //                 /*console.log(timerData);*/
    //                 setProgressValue(progressBar);
    //                 setTimerData(timerData - 0.1);
    //             }
    //         }, 100);
    //
    //         return () => {
    //             clearInterval(timer);
    //         };
    //     }, [progressBar]);
    //
    //     return (
    //         <>
    //             <Box sx={{width: '100%'}}>
    //                 <LinearProgress variant="determinate" value={progressBar} sx={{width:800}}/>
    //                 <Typography variant="h4" sx={{}}><b>타이머시간</b></Typography>
    //             </Box>
    //         </>
    //     )
    // }
    //
    // function ChooseFourQuiz() {
    //     return (
    //         <>
    //
    //         </>
    //     )
    // }
    //
    // function OXQuiz() {
    //     return (
    //         <>
    //
    //         </>
    //     )
    // }
    //
    // function DescriptQuiz() {
    //     return (
    //         <>
    //             <Grid container sx={{margin:2}}>
    //                 <Grid item xs={7}>
    //                     <Typography variant="h1" gutterBottom>
    //                         h1. Heading
    //                     </Typography>
    //                 </Grid>
    //             </Grid>
    //         </>
    //     )
    // }
    //
    // function QuizButtonList(QuizType) {
    //     // QuizType으로 분기시켜서 사용
    //
    //     return (
    //         <>
    //             <Button variant="contained" onClick={
    //                 () => {
    //
    //                 }
    //             }>
    //                 건너뛰기
    //             </Button>
    //             <Button variant="contained" onClick={
    //                 () => {
    //
    //                 }
    //             }>
    //                 다음
    //             </Button>
    //         </>
    //     )
    // }
}
