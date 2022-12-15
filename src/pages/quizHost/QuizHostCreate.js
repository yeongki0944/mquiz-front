import * as React from "react";
import {ListPanel} from "../../components/quizHost/ListPanel";
import {FormPanel} from "../../components/quizHost/FormPanel";
import {ControlPanel} from "../../components/quizHost/ControlPanel";
import {useSelector} from "react-redux";
import {QuizView} from "../../components/QuizView/QuizView";
import {NavBar} from "../../components/quizHost/NavBar";
import {Item, Page} from "../../LayOuts/LayOuts";

export const QuizHostCreate = () => {

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quiz.currentShow));

    return (
        <Page sx={{bg:'img',img: '/img/background_1.jpg'}}>
            <NavBar/>
            <Item sx={{position:'center',height:'90vh'}}>
                {/*퀴즈 복제 및 생성할 때 기본 시간 제한을 30초로 변경 필요*/}
                <Item sx={{place:'top',width:'15%',backgroundColor:'rgba(255,255,255,0.5)',overflow:'auto',overflowX:'hidden',borderRadius:10,margin:'10px'}}>
                    <ListPanel quiz={quiz}/>
                </Item>
                <Item sx={{place:'center', width:'70%',marginLeft:'5%',marginRight:'5%'}}>
                    <QuizView sx={{place:'center',width:'100%',height:'90vh',overflow:'hidden'}}
                              currentQuiz={currentQuiz}
                              state={"create"}
                    />
                </Item>
                <Item sx={{place:'top',width:'25%',backgroundColor:'rgba(255,255,255,0.5)',overflow:'auto',overflowX:'hidden',borderRadius:10,margin:'10px'}}>
                    <FormPanel currentQuiz={currentQuiz}/>
                </Item>
            </Item>
            <ControlPanel quiz={quiz}/>
        </Page>
    )
}
