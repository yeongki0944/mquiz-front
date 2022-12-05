import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {
    R_copyQuiz,
    R_deleteQuiz,
    R_renumberQuiz,
    R_setCurrentShow,
    R_setQuiz, R_setQuizData
} from "../../redux/reducers/quizInfoReducer";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import '../../styles/baseStyle.css';
import {Content, Item} from "../LayOuts/LayOuts";


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
        <Content sx={props.sx}>
            {quiz.quizData.map((item,index) =>
                <div
                    key={index}
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    draggable
                >
                    <div>{item.num}P</div>
                    <Item
                        sx={{
                            display:'block',
                            width:'100%',
                            margin:'auto',
                            bg:'#ffffff',
                            color:'#000000',
                            borderRadius:'10px',
                            boxShadow:'0 0 10px 0 rgba(0,0,0,0.2)',
                            minWidth:'200px',
                            maxWidth:'250px',
                            minHeight:'100px',
                            maxHeight:'150px',
                        }}
                        className={"item_card"}
                        key={item.num}
                        id={item.num}
                        onClick={() => {
                            dispatch(R_setCurrentShow(item.num));
                        }}
                    >
                        [{item.type}]
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
                    </Item>
                </div>
            )}
        </Content>
    )
}
