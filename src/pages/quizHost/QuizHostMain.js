import * as React from 'react';
import { useEffect, useState} from "react";
import QuizModal from '../../components/quizHost/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import {QuizListHostMain} from "../../components/quizHost/QuizListHostMain";
import HostProfile from "../../components/quizHost/HostProfile";
import {NavBar} from "../../components/quizHost/NavBar";
import {Card_panel, Content, Item, Page} from "../../LayOuts/LayOuts";
import {QuizPreviewHostMain} from "../../components/quizHost/QuizPreviewHostMain";
import {setShowListAPI} from "../../function/API";


export const QuizHostMain = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const {quizList} = useSelector(state => state.quizList);
    const email = "test@gmail.com";

    useEffect(() => {
        setShowListAPI(email);
    }, []);

    return (
        <Page sx={{bg: 'img', img: '/img/background_2.jpg'}}>
            <Content>
                <NavBar/>
                <Item sx={{place: 'center', height: '10vh', marginBottom: '2.5vh', marginTop: '2.5vh'}}
                      sm={{height: '15vh', marginBottom: '2.5vh', marginTop: '2.5vh'}}>
                    <HostProfile sx={{height: '100%', width: '50%'}} sm={{place: 'center', width: '100%'}} name={"test"}
                                 info={"info"}/>
                </Item>
                <Item sx={{place: 'center', height: '75vh',width:'100%'}}>
                    <Card_panel sx={{place: 'center',width:'50%',height:'100%',marginLeft:'1vw',marginRight:'1vw',overflowY:'auto'}} sm={{place: 'center',width:'100%',marginRight:'1vw',marginLeft:'1vw'}}>
                            <QuizListHostMain sx={{place: 'center'}} sm={{width: '80%'}}
                                              quizList={quizList} setModalOpen={setModalOpen}/>
                    </Card_panel>
                    <Card_panel sx={{place: 'center',width:'50%',height:'100%',marginLeft:'1vw',marginRight:'1vw',overflowY:'auto'}} sm={{place: 'center',display:'none'}}>
                            <QuizPreviewHostMain sx={{place: 'center', width: '100%'}}/>
                    </Card_panel>
                </Item>
                <QuizModal open={modalOpen} setOpen={setModalOpen}/>
            </Content>
        </Page>
    );
}

