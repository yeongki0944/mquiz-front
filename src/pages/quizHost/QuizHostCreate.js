import * as React from "react";
import {ListPanel} from "./components/Create/ListPanel";
import {FormPanel} from "./components/Create/FormPanel";
import {ControlPanel} from "./components/Create/ControlPanel";
import {useSelector} from "react-redux";
import {QuizView} from "../components/QuizView/QuizView";
import {NavBar} from "../components/NavBar";
import {Page_Default} from "../components/LayOuts/LayOuts";
import styled from "styled-components";

const Panel = styled.div`
    display: flex;
    float: left;
    width: 100%;
`;
const List = styled(ListPanel)`
    width: 15%;
    height: 90vh;
    overflow: scroll;
    overflow-x: hidden;
`;

const QuizView_styled = styled(QuizView)`
    width: 60%;
    height: 90vh;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const Form = styled(FormPanel)`
    width: 15%;
    height: 90vh;
    overflow: scroll;
    overflow-x: hidden;
`;

const Control = styled(ControlPanel)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 5vh;
`;
export const QuizHostCreate = () => {

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quiz.currentShow));

    return (
        <Page_Default>
            <NavBar/>
            <Panel>
                <List quiz={quiz}/>
                <QuizView_styled currentQuiz={currentQuiz}/>
                <Form currentQuiz={currentQuiz}/>
            </Panel>
            <Control quiz={quiz}/>
        </Page_Default>
    )
}
