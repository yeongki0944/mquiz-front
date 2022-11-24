import {useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const Item = styled(Paper) ({
    width: "100%",
    height: "100%",
    padding: "2px",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
});

export const YoutubeShow = () =>{
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);
    useEffect(() => {
        console.log(currentQuiz.media.url);
    }, []);
    return(
        <>
            <Item>
                <iframe width={"90%"} height={"90%"} src={currentQuiz.media.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Item>
        </>
    )
}
