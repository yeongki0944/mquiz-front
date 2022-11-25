import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import QuizModal from './components/Create/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import CustomAxios from "../function/CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import {QuizListHostMain} from "./components/QuizListHostMain";
import HostProfile from "./components/HostProfile";
import {NavBar} from "../components/NavBar";
import {Page_Default} from "../components/LayOuts/LayOuts";
import styled from "styled-components";

const Profile = styled(HostProfile)`
    width: 100%;
`;
const Content= styled.div`
    @media (min-width: 767px) {
        display: flex;
        width: 100%;
    }

    @media (min-width: 300px) and (max-width: 767px) {
        display: block;
        width: 100%;
    }
`;
const QuizList = styled(QuizListHostMain)`
    @media (min-width: 767px) {
        width: 50%;
    }

    @media (min-width: 300px) and (max-width: 767px) {
        width: 100%;
        height: 100%;
    }
`;
const QuizPreviewList = styled.div`
    @media (min-width: 767px) {
        width: 50%;
    }

    @media (min-width: 300px) and (max-width: 767px) {
        display: none;
    }
`;

export const QuizHostMain = () => {

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const {quizList} = useSelector(state => state.quizList);
    const email = "test@gmail.com";
    const setQuizList = async () => {
        await CustomAxios.get("/v1/show/List?email=" + email)
            .then((res) => {
                console.log(res.data)
                dispatch(R_setQuizList(res.data.data))
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setQuizList();
    }, []);

    return (
        <Page_Default>
            <NavBar/>
            <Profile name={"test"} info={"info"}/>
            <hr/>
            <Content>
                <QuizList quizList={quizList} setModalOpen={setModalOpen}/>
                <QuizPreviewList>미리보기</QuizPreviewList>
            </Content>
            <QuizModal open={modalOpen} setOpen={setModalOpen}/>
        </Page_Default>
    );
}

