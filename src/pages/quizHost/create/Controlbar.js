import {Button} from "@mui/material";
import * as React from "react";

export default function Controllbar(props){
    const quizList = props.quizList;
    const setQuizList = props.setQuizList;
    const setCurrentShow = props.setCurrentShow;

    return(
        <Button variant="contained" onClick={() => {
            addPage();
        }}>추가</Button>
    );

    function addPage() {
        let length = quizList.length;
        setQuizList([...quizList,
            {
                "num": length + 1,
                "type": "선택형",
                "question": " ",
                "media": {
                    "type": "image",
                    "url": "",
                    "startTime": "",
                    "endTime": "",
                },
                "choiceList": {
                    "1": " ",
                    "2": " ",
                    "3": "",
                    "4": ""
                },
                "answer": [],
                "time": 0,
                "useScore": true,
                "rate": 0
            }
        ]);
        setCurrentShow(length + 1);
    }
}
