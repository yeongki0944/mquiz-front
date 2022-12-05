import * as React from 'react';
import {useEffect, useState} from "react";
import QuizModal from '../../components/quizHost/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import CustomAxios from "../../function/CustomAxios";
import {R_setQuizList} from "../../redux/reducers/quizListReducer";
import {QuizList} from "../../components/quizHost/QuizList";
import {HostProfile} from "../../components/quizHost/HostProfile";
import {NavBar} from "../../components/quizHost/NavBar";
import {Content, Page} from "../../components/LayOuts/LayOuts";
import {QuizPreview} from "../../components/quizHost/QuizPreview";


export const QuizHostMain = () => {
    const dispatch = useDispatch();
    const {quizList} = useSelector(state => state.quizList);

    //퀴즈 생성 모달 관리
    const [modalOpen, setModalOpen] = useState(false);

    //유저 이메일 아이디 임시 삽입
    const email = "test@gmail.com";

    //퀴즈 리스트 가져오기 함수
    const setQuizList = async () => {
        await CustomAxios.get("/v1/show/List?email=" + email)
            .then((res) => {
                // console.log(res.data);
                dispatch(R_setQuizList(res.data.data))
            }).catch((err) => {
                // console.log(err)
            })
    }

    //랜더링 시최초 1회 실행(퀴즈 리스트 가져오기)
    useEffect(() => {
        setQuizList();
    }, []);


    return (
        <Page sx={{bg:'default'}}>
            <NavBar sx={{background:'white',width:'100vw',height:'5vh'}} sm={{position:'absolute',bottom:'0'}}/>
            <HostProfile name={"test"} info={"info"} sx={{width:'70%',height:'15vh'}}/>
            <Content sx={{height:'75vh',width:'100vw',display:'flex'}}>
                <QuizList sx={{width:'45vw',display:'block',overflow:'auto'}}
                          sm={{width:'90vw',display:'block'}}
                          quizList={quizList}
                          setModalOpen={setModalOpen}
                />
                <QuizPreview sx={{width:'45vw',overflowY:'auto',overflowX:'hidden'}} sm={{display:'none'}}/>
            </Content>
            <QuizModal open={modalOpen} setOpen={setModalOpen}/>
        </Page>
    );
}

