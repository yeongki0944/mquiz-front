import * as React from 'react';
import { useEffect, useState} from "react";
import QuizModal from '../../components/quizHost/QMakeModal';
import {useSelector} from "react-redux";
import {QuizList} from "../../components/quizHost/QuizList";
import HostProfile from "../../components/quizHost/HostProfile";
import {NavBar} from "../../components/quizHost/NavBar";
import {Card_panel, Content, Item, Page} from "../../layouts/LayOuts";
import {QPreviewList} from "../../components/quizHost/QPreviewList";
import {setShowListAPI} from "../../function/API";
import {R_addQuiz, R_setQuiz} from "../../redux/reducers/quizInfoReducer";


export const QHostMain = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const {quizList} = useSelector(state => state.quizList);
    const {userInfo} = useSelector(state => state.userInfo);

    //const email = "test@gmail.com";

    useEffect(() => {
        if(userInfo.hostEmail != null){
            setShowListAPI(userInfo.hostEmail);
            console.log(userInfo.hostEmail)
            //setShowListAPI("test@gmail.com");
        }else {
            setShowListAPI("test@gmail.com");
        }

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
                <Item sx={{place: 'center', height: '70vh',width:'100%'}}>
                    <Card_panel sx={{place: 'center',width:'50%',height:'100%',marginLeft:'1vw',marginRight:'1vw',overflowY:'auto'}} sm={{place: 'center',width:'100%',marginRight:'1vw',marginLeft:'1vw'}}>
                            <QuizList sx={{place: 'center'}} sm={{width: '80%'}}
                                      quizList={quizList} setModalOpen={setModalOpen}/>
                    </Card_panel>
                    <Card_panel sx={{place: 'center',width:'50%',height:'100%',marginLeft:'1vw',marginRight:'1vw',overflowY:'auto'}} sm={{place: 'center',display:'none'}}>
                            <QPreviewList sx={{place: 'center', width: '100%'}}/>
                    </Card_panel>
                </Item>
                <QuizModal open={modalOpen} setOpen={setModalOpen}/>
            </Content>
        </Page>
    );
}

