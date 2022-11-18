import * as React from 'react';
import {useState} from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {
    Box,
    Button, Slider,
    Typography
} from "@mui/material";
import {
    VolumeUp
} from "@material-ui/icons";


const useStyles = makeStyles(() => ({
    volumeStyle: {
        marginRight:4,
        width: 80,
        maxWidth: 100,
    },
}));

export default function QuizPlay(props) {
    const styles = useStyles();

    // pin 번호 나중에 받아온 값으로 변경해야함.
    const [pinData, setPinData] = useState("123456");

    // 볼륨
    const [volumeData, setVolumeData] = useState(50);


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <QuizHostPin/>
                </Grid>
                <Grid item xs={12}>
                    <QuizTimer/>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <ChooseFourQuiz/>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <OXQuiz/>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <DescriptQuiz/>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid item xs={12}>
                    <QuizButtonList/>
                </Grid>
            </Grid>
        </>
    );

    function QuizHostPin() {
        const [volume, setVolume] = React.useState(volumeData);

        return (
            <>
                <Box spacing={2} direction="row" alignItems="center">
                    <div style={{display: "inline-block"}}>
                        <Typography align={"center"} variant={"h3"}>
                            <b>PIN : {pinData}</b>
                        </Typography>
                    </div>
                    <div style={{display: "inline-block", width: 200}} align={"center"}>
                        <Slider
                            className={styles.volumeStyle}
                            aria-label="Volume"
                            value={volume}
                            onChange={
                                (event, newValue) => {
                                    setVolume(newValue);
                                }
                            }
                            onBlur={
                                (event) => {
                                    setVolumeData(volume);
                                }
                            }
                        />
                        <VolumeUp/>
                    </div>
                    <div style={{display: "inline-block"}}>
                        <Button variant="contained" onClick={
                            () => {

                            }
                        }>
                        </Button>
                    </div>
                </Box>
            </>
        )
    }

    function QuizTimer() {
        return (
            <>

            </>
        )
    }

    function ChooseFourQuiz() {
        return (
            <>

            </>
        )
    }

    function OXQuiz() {
        return (
            <>

            </>
        )
    }

    function DescriptQuiz() {
        return (
            <>

            </>
        )
    }

    function QuizButtonList() {
        return (
            <>

            </>
        )
    }
}