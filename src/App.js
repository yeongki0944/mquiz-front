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

import QuizClientMain from "./pages/quizClient/main/main";

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

                        {/* 참가자 페이지 목록*/}
                        <Route path="/QClient" component={QuizClientMain} exact/>




                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}
