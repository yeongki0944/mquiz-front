import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import QuizModal from './components/Create/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import CustomAxios from "../function/CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import {QuizListHostMain} from "./components/QuizListHostMain";
import HostProfile from "./components/HostProfile";
import './styles/QuizHostMain.css';
import {NavBar} from "../components/NavBar";
import {R_setQuiz} from "../redux/reducers/quizInfoReducer";

export const QuizHostMain = () => {
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    const {quizList} = useSelector(state => state.quizList);

    const email = "test@gmail.com";
    const setQuizList = async () => {
        await CustomAxios.get("v1/show/List?email="+email)
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
        <div id={"content"}>
            <div id={"navbar"}>
                <NavBar/>
            </div>
            <div id={"profile"}>
                <HostProfile name={"test"} info={"info"}/>
            </div>
            <hr/>
            <div id={"quiz"}>
                <div id={"quizList"}>
                    <QuizListHostMain quizList={quizList} setModalOpen={setModalOpen}/>
                </div>
                <div id={"quizPreviewList"}>
                    미리보기
                </div>
            </div>
            <QuizModal open={modalOpen} setOpen={setModalOpen}/>
        </div>
    );
}

