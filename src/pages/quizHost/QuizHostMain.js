import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import QuizModal from '../../components/quizHost/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import CustomAxios from "../../function/CustomAxios";
import {R_setQuizList} from "../../redux/reducers/quizListReducer";
import {QuizListHostMain} from "../../components/quizHost/QuizListHostMain";
import HostProfile from "../../components/quizHost/HostProfile";
import {NavBar} from "../../components/quizHost/NavBar";
import {Item_c, Item_l, Item_t, Page_Default} from "../../LayOuts/LayOuts";
import styled from "styled-components";
import {QuizPreviewHostMain} from "../../components/quizHost/QuizPreviewHostMain";

const Item_l_Profile = styled(Item_l)`
    height: 15vh;
    width: 70%;
`
const Item_c_Content = styled(Item_c)`
    height: 75vh;
    @media (min-width: 767px) {
        display: flex;
        width: 100%;
    }
    @media (min-width: 300px) and (max-width: 767px) {
        display: block;
        width: 100%;
    }
`
const Item_t_QuizList = styled(Item_t)`
    height: 75vh;
    @media (min-width: 767px) {
        width: 45%;
    }

    @media (min-width: 300px) and (max-width: 767px) {
        width: 80%;
        height: 100%;
    }
`
const Item_c_QuizPreviewList = styled(Item_c)`
    height: 75vh;
    @media (min-width: 767px) {
        width: 45%;
        overflow-y: scroll;
        overflow-x: hidden;
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
            <Item_l_Profile><HostProfile name={"test"} info={"info"}/></Item_l_Profile>
            <Item_c_Content>
                <Item_t_QuizList><QuizListHostMain quizList={quizList} setModalOpen={setModalOpen}/></Item_t_QuizList>
                <Item_c_QuizPreviewList><QuizPreviewHostMain/></Item_c_QuizPreviewList>
            </Item_c_Content>
            <QuizModal open={modalOpen} setOpen={setModalOpen}/>
        </Page_Default>
    );
}

