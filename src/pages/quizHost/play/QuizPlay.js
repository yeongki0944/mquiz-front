import * as React from 'react';
import {useState} from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(()=>{

})

export default function QuizPlay(props) {
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

    function QuizHostPin(){
        return (
            <>

            </>
        )
    }

    function QuizTimer(){
        return (
            <>

            </>
        )
    }

    function ChooseFourQuiz(){
        return (
            <>

            </>
        )
    }

    function OXQuiz(){
        return (
            <>

            </>
        )
    }

    function DescriptQuiz(){
        return (
            <>

            </>
        )
    }

    function QuizButtonList(){
        return (
            <>

            </>
        )
    }
}