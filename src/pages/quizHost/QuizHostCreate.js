import * as React from "react";
import {ListPanel} from "../../components/quizHost/ListPanel";
import {FormPanel} from "../../components/quizHost/FormPanel";
import {ControlPanel} from "../../components/quizHost/ControlPanel";
import {useSelector} from "react-redux";
import {QuizView} from "../../components/QuizView/QuizView";
import {NavBar} from "../../components/quizHost/NavBar";
import {Page_Default} from "../../LayOuts/LayOuts";
import styled from "styled-components";

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
                {/*퀴즈 복제 및 생성할 때 기본 시간 제한을 30초로 변경 필요*/}
                <List><ListPanel quiz={quiz}/></List>
                <QuizView sx={{place:'center',width:'60%',height:'90vh',overflow:'hidden'}}
                          currentQuiz={currentQuiz}
                          state={"create"}
                />
                <Form><FormPanel currentQuiz={currentQuiz}/></Form>
            </Panel>
            <ControlPanel quiz={quiz}/>
        </Page_Default>
    )
}
