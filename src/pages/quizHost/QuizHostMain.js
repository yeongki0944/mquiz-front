import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import QuizModal from './components/Create/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import CustomAxios from "../function/CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import QuizListHostMain from "./components/QuizListHostMain";
import HostProfile from "./components/HostProfile";
import './styles/QuizHostMain.css';
import {NavBar} from "../components/NavBar";

export const QuizHostMain = () => {
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);

    const {mongodbUrl} = useSelector(state => state.mongodbUrl)

    const {quizList} = useSelector(state => state.quizList);

    const setQuizList = async () => {
        await CustomAxios.post(mongodbUrl.getShowList, {
            email: "dudrl0944@gmail.com",
            id: "637440e817bb6d42edbf3927"
        }).then((res) => {
            console.log(res.data)
            dispatch(R_setQuizList(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        setQuizList();
        ;
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

