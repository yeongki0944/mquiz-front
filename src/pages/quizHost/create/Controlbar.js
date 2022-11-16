import {Button} from "@mui/material";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

export default function Controllbar(props){
    const dispatch = useDispatch();

    const { quizList } = useSelector(state => state.quizList)
    const { currentShow } = useSelector(state => state.currentShow)

    const addQuiz = () => {
        dispatch({type: "ADD_QUIZ"})
        setCurrentShow(quizList.length)
    }
    const setCurrentShow = (index) => {
        dispatch({type: "SET_CURRENT_SHOW", payload: index})
    }

    return(
        <Button variant="contained" onClick={addQuiz}>추가</Button>
    );

}
