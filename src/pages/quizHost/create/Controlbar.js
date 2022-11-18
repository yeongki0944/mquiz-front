import {Button} from "@mui/material";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addQuiz, setCurrentShow} from "../../redux/reducers/quizInfoReducer";

export default function Controllbar(props) {
    const dispatch = useDispatch();

    const {quiz} = useSelector(state => state.quiz)


    return (
        <>
            <Button variant="contained" onClick={()=>{dispatch(addQuiz());dispatch(setCurrentShow(quiz.quizData.length))}}>추가</Button>
            <Button onClick={() => {
                save();
            }}>
                저장
            </Button>
        </>
    );

    function save() {
        const data = JSON.stringify(quiz.quizData);
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
