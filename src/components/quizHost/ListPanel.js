import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import Paper from "@mui/material/Paper";
import {
    R_copyQuiz,
    R_deleteQuiz,
    R_renumberQuiz,
    R_setCurrentShow,
    R_setQuiz, R_setQuizData
} from "../../redux/reducers/quizInfoReducer";
import {Button} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import '../../styles/baseStyle.css';
import {styled} from "@mui/system";

const Item_card = styled(Paper)({
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
    '&:hover': {
        border: "1px solid lightblue",
    }
})

export const ListPanel = (props) => {
    const quiz = props.quiz;
    const dispatch = useDispatch();

    const dragItem = useRef();
    const dragOverItem = useRef();

    useEffect(() => {
        setSelected(quiz.currentShow);
        // console.log(quiz);
    }, [quiz.currentShow]);

    const setSelected = (currentShow) => {
        const allItems = document.getElementsByClassName("item_card");
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove("selected");
        }
        document.getElementById(currentShow).classList.add("selected");
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        // console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        // console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyListItems = [...quiz.quizData];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        dispatch(R_setQuizData(copyListItems));
        dispatch(R_renumberQuiz());
    };


    return (
        <div>
            {quiz.quizData.map((item,index) =>
                <div key={index}
                     onDragStart={(e) => dragStart(e, index)}
                     onDragEnter={(e) => dragEnter(e, index)}
                     onDragEnd={drop}
                     draggable>
                    <div>{item.num}P</div>
                    <Item_card className={"item_card"} key={item.num} id={item.num}
                               onClick={() => {
                                   dispatch(R_setCurrentShow(item.num));
                               }}
                    >
                        Status [{item.type}]
                        <div>
                            <FileCopyIcon onClick={() => {
                                dispatch(R_copyQuiz(item.num));
                            }}
                            />
                            <DeleteForeverIcon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (quiz.quizData.length === 1) {
                                        alert("최소 1개의 문제는 존재해야 합니다.");
                                        return;
                                    }
                                    dispatch(R_setCurrentShow(item.num - 1));
                                    dispatch(R_deleteQuiz(item.num));
                                    dispatch(R_renumberQuiz());
                                }}
                            />
                        </div>
                    </Item_card>
                </div>
            )}
        </div>
    )
}
