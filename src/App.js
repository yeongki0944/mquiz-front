import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./pages/home/home";

import QuizHostMain from "./pages/quizHost/main/Main";
import QHostCreate from "./pages/quizHost/create/Panel";
import QHostFind from "./pages/quizHost/find/Find";
import QHostReport from "./pages/quizHost/report/Report";

import QuizClientMain from "./pages/quizClient/main/main";
import QClientReady from "./pages/quizClient/ready/Ready";
import QClientWait from "./pages/quizClient/wait/Wait";
import QClientPlay from "./pages/quizClient/play/Play";
import QClientResult from "./pages/quizClient/result/Result";



export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    {/* 관리자 페이지 목록*/}

                    {/* 진행자 페이지 목록*/}
                    <Route path="/QHost" component={QuizHostMain} exact/>


                    {/* 참가자 페이지 목록*/}
                    <Route path="/QClient" component={QuizClientMain} exact/>

                </Switch>
            </div>
        </Router>
    );
}
