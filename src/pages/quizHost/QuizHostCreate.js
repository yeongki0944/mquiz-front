import * as React from "react";
import {FormPanel} from "../../components/quizHost/create/FormPanel";
import {ControlPanel} from "../../components/quizHost/create/ControlPanel";
import {useSelector} from "react-redux";
import {QuizView} from "../../components/QuizView/QuizView";
import {NavBar} from "../../components/quizHost/NavBar";
import {Page_Default} from "../../components/LayOuts/LayOuts";
import styled from "styled-components";
import {ListPanel} from "../../components/quizHost/create/ListPanel";

const Panel = styled.div`
    border: 1px solid black;
    display: flex;
    float: left;
    width: 100%;
    height: 90%;
    margin : auto;
`;


const List = styled('div')`
    width: 15%;
    overflow: scroll;
    overflow-x: hidden;
`;

const QuizView_styled = styled('div')`
    width: 60%;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const Form = styled('div')`
    width: 25%;
    overflow: scroll;
    overflow-x: hidden;
`;
export const QuizHostCreate = () => {

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quiz.currentShow));

    return (
        <Page_Default>
            <NavBar/>
            <Panel>
                <List><ListPanel quiz={quiz}/></List>
                <QuizView_styled><QuizView currentQuiz={currentQuiz}/></QuizView_styled>
                <Form><FormPanel currentQuiz={currentQuiz}/></Form>
            </Panel>
            <ControlPanel quiz={quiz}/>
        </Page_Default>
    )
}
