import * as React from 'react';
import {Page_Default} from "../components/LayOuts/LayOuts";
import {NavBar} from "./components/NavBar";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";

export const QuizHostReport = () => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const {quiz} = useSelector(state => state.quiz);
    const [list, setList] = useState(quiz.quizData);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };

    return (
        // <Page_Default>
        //     <NavBar/>
        //     report
        // </Page_Default>
        <>
            {console.log(list)}
            {
                list &&
                list.map((item,index) => (
                    <div style={{
                        backgroundColor: 'lightblue',
                        margin: '20px 25%',
                        textAlign: 'center',
                        fontSize: '40px'
                    }}
                         onDragStart={(e) => dragStart(e, index)}
                         onDragEnter={(e) => dragEnter(e, index)}
                         onDragEnd={drop}
                         key={index}
                         draggable>
                        {item.num}
                    </div>
                ))}

        </>
    );
}
