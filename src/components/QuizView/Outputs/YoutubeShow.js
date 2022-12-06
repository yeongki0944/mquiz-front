import {useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";


export const YoutubeShow = (props) => {
    const currentQuiz = props.currentQuiz;
    useEffect(() => {
        console.log(currentQuiz.media.url);
    }, []);
    return (
        <iframe width={"90%"} height={"90%"} src={currentQuiz.media.url} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

    )
}
