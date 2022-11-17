import {Button} from "@mui/material";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

export default function Controllbar(props) {
    const dispatch = useDispatch();

    const {quizData} = useSelector(state => state.quizData)
    const {currentShow} = useSelector(state => state.currentShow)

    const addQuiz = () => {
        dispatch({type: "ADD_QUIZ"})
        setCurrentShow(quizData.length)
    }
    const setCurrentShow = (index) => {
        dispatch({type: "SET_CURRENT_SHOW", payload: index})
    }

    return (
        <>
            <Button variant="contained" onClick={addQuiz}>추가</Button>
            <Button onClick={() => {
                save();
            }}>
                저장
            </Button>
        </>
    );
    function save() {
        const data = JSON.stringify(quizData);
        console.log(data);
        // axios.post("http://localhost:8080/quiz", data)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

}
