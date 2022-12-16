import {useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {
    R_copyQuiz,
    R_deleteQuiz,
    R_renumberQuiz,
    R_setCurrentShow,
    R_setQuizData
} from "../../redux/reducers/quizInfoReducer";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import '../../styles/baseStyle.css';
import {Item} from "../../layouts/LayOuts";

export const ListPanel = (props) => {
    const quiz = props.quiz;
    const dispatch = useDispatch();

    const dragItem = useRef();
    const dragOverItem = useRef();

    useEffect(() => {
        setSelected(quiz.currentShow);
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
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
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
        <Item sx={{place: 'center', display: 'block'}}>
            {quiz.quizData.map((item, index) =>
                <Item
                    sx={{
                        place: 'center',
                        display: 'block',
                        width: '100%',
                        height: '12%'
                    }}
                    key={index}
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    draggable
                >
                    {/*<Item*/}
                    {/*    sx={{*/}
                    {/*        place: 'center',*/}
                    {/*        width:'100%',*/}
                    {/*        height:'25%'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {item.num}P*/}
                    {/*</Item>*/}
                    <Item
                        sx={{
                            place: 'center',
                            display: 'block',
                            width: '90%',
                            height: '80%',
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            padding: "10px",
                            margin: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                            '&:hover': {
                                border: "1px solid lightblue",
                            }
                        }}
                        key={item.num}
                        id={item.num}
                        onClick={() => {
                            dispatch(R_setCurrentShow(item.num));
                        }}
                    >
                        <Item sx={{place: 'rignt', width: '100%', height: '50%'}}>
                            <Item sx={{place: 'center', width: '20%'}}>Q{item.num}</Item>
                            <Item sx={{place: 'center'}}>Status [{item.type}]</Item>
                        </Item>
                        <Item
                            sx={{
                                place: 'right',
                                width: '100%',
                                height: '50%',
                                marginTop: '5px'
                            }}
                        >
                            <FileCopyIcon
                                onClick={() => {
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
                        </Item>
                    </Item>
                </Item>
            )}
        </Item>

        // <div>
        //     {quiz.quizData.map((item,index) =>
        //         <div key={index}
        //              onDragStart={(e) => dragStart(e, index)}
        //              onDragEnter={(e) => dragEnter(e, index)}
        //              onDragEnd={drop}
        //              draggable>
        //             <div>{item.num}P</div>
        //             <Item_card className={"item_card"} key={item.num} id={item.num}
        //                        onClick={() => {
        //                            dispatch(R_setCurrentShow(item.num));
        //                        }}
        //             >
        //                 Status [{item.type}]
        //                 <div>
        //                     <FileCopyIcon onClick={() => {
        //                         dispatch(R_copyQuiz(item.num));
        //                     }}
        //                     />
        //                     <DeleteForeverIcon
        //                         onClick={(e) => {
        //                             e.stopPropagation();
        //                             if (quiz.quizData.length === 1) {
        //                                 alert("최소 1개의 문제는 존재해야 합니다.");
        //                                 return;
        //                             }
        //                             dispatch(R_setCurrentShow(item.num - 1));
        //                             dispatch(R_deleteQuiz(item.num));
        //                             dispatch(R_renumberQuiz());
        //                         }}
        //                     />
        //                 </div>
        //             </Item_card>
        //         </div>
        //     )}
        // </div>
    )
}
