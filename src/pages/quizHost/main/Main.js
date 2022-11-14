import * as React from 'react';
import QuizModal from '../create/Quiz_Make_modal';
import {useState} from "react";


export default function QuizHostMain(props) {
    const [open, setOpen] = useState(false);
    return (
        <>
            quizHostMain

            <QuizModal open={open} setOpen={setOpen}/>
        </>
    );
}
