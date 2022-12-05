import * as React from "react";
import {ListPanel} from "../../components/quizHost/ListPanel";
import {FormPanel} from "../../components/quizHost/FormPanel";
import {ControlPanel} from "../../components/quizHost/ControlPanel";
import {useSelector} from "react-redux";
import {QuizView} from "../../components/QuizView/QuizView";
import {NavBar} from "../../components/quizHost/NavBar";
import {Content, Page, Page_Default} from "../../components/LayOuts/LayOuts";
import styled from "styled-components";


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
        <Page sx={{bg:'default'}}>
            <NavBar sx={{background:'white',width:'100vw',height:'5vh'}} sm={{position:'absolute',bottom:'0'}}/>
            <Content sx={{width:'100vw',height:'90vh',float:'left',margin:'auto'}}>
                <ListPanel sx={{width:'15%',float:'left',height:'90vh',overflowY:'auto',overflowX:'hidden'}}
                    quiz={quiz}
                />
                <QuizView sx={{width:'60%',overflow:'none'}} currentQuiz={currentQuiz} state={"create"}/>
                <Form><FormPanel currentQuiz={currentQuiz}/></Form>
            </Content>
            <ControlPanel quiz={quiz}/>
        </Page>
    )
}
