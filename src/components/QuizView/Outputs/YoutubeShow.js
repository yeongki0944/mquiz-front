import * as React from "react";
import {useEffect} from "react";
import {Item} from "../../../layouts/LayOuts";


export const YoutubeShow = (props) => {
    const currentQuiz = props.currentQuiz;
    useEffect(() => {
    }, []);
    return (
        <Item sx={{place:'center'}}>
            <iframe width={"90%"} height={"90%"} src={currentQuiz.media.url} frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
        </Item>
    )
}
