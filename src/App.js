import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./pages/home/home";

import {QuizHostMain} from "./pages/quizHost/QuizHostMain";
import {QuizHostFind} from "./pages/quizHost/QuizHostFind"
import {QuizHostReady} from "./pages/quizHost/QuizHostReady"
import {QuizHostPlay} from "./pages/quizHost/QuizHostPlay"
import {QuizHostCreate} from "./pages/quizHost/QuizHostCreate";

import QuizClientMain from "./pages/quizClient/main";
import QuizClientCreateNickName from "./pages/quizClient/main/CreateNickName";
import QClientReady from "./pages/quizClient/ready/Ready";
import QClientWait from "./pages/quizClient/wait/Wait";
import QClientPlay from "./pages/quizClient/play/Play";
import QClientResult from "./pages/quizClient/result/Result";

import TestBoard from "./pages/test/TestBoard"
import ComponentTest from "./pages/test/ComponentTest"

import store from "./pages/redux/store";
import {Provider} from "react-redux";


export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        {/* 관리자 페이지 목록*/}

                        {/* 진행자 페이지 목록*/}
                        <Route path="/QHost" component={QuizHostMain} exact/>

                        <Route path="/QHost/create" component={QuizHostCreate} exact/>

                        <Route path="/QHost/find" component={QuizHostFind} exact/>

                        <Route path="/QHost/ready" component={QuizHostReady} exact/>

                        <Route path="/QHost/play" component={QuizHostPlay} exact/>

                        <Route path="/Test" component={TestBoard} exact/>

                        <Route path="/ComponentTest" component={ComponentTest} exact/>

                        {/* 참가자 페이지 목록*/}
                        <Route path="/QClient" component={QuizClientMain} exact/>

                        <Route path="/QClient/createNickName" component={QuizClientCreateNickName} exact/>

                        <Route path="/QClient/ready" component={QClientReady} exact/>

                        <Route path="/QClient/wait" component={QClientWait} exact/>

                        <Route path="/QClient/play" component={QClientPlay} exact/>

                        <Route path="/QClient/result" component={QClientResult} exact/>

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}
