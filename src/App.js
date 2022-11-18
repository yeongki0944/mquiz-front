import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./pages/home/home";

import QuizHostMain from "./pages/quizHost/main/Main";
import QuizHostCreate from "./pages/quizHost/create/Panel";
import QuizHostFind from "./pages/quizHost/find/Find"
import QuizHostReady from "./pages/quizHost/ready/HostReady"
import QuizHostPlay from "./pages/quizHost/play/QuizPlay"
import TestBoard from "./pages/test/TestBoard"

import QuizClientMain from "./pages/quizClient/main/main";
import quizClientCreateNicName from "./pages/quizClient/main/CreateNicName";
import QClientReady from "./pages/quizClient/ready/Ready";
import QClientWait from "./pages/quizClient/wait/Wait";
import QClientPlay from "./pages/quizClient/play/Play";
import QClientResult from "./pages/quizClient/result/Result";

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

                        <Route path="/QHost/quizplay" component={QuizHostPlay} exact/>

                        <Route path="/Test" component={TestBoard} exact/>

                        {/* 참가자 페이지 목록*/}
                        <Route path="/QClient" component={QuizClientMain} exact/>

                        <Route path="/QClient/createNicName" component={quizClientCreateNicName} exact/>

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
