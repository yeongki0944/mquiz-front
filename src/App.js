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
import {QuizHostReady} from "./components/quizHost/QuizHostReady"
import {QuizHostPlay} from "./pages/quizHost/QuizHostPlay"
import {QuizHostCreate} from "./pages/quizHost/QuizHostCreate";

import {QuizClientMain} from "./pages/quizClient/QuizClientMain";

import store from "./redux/store";
import {Provider} from "react-redux";
import {QuizClientPlay} from "./pages/quizClient/QuizClientPlay";
import {QuizHostReport} from "./pages/quizHost/QuizHostReport";
import {NotFound404} from "./pages/NotFound404";
import {Auth} from "./pages/quizHost/Auth";
import {QuizClientReconnect} from "./pages/quizClient/QuizClientReconnect";
import {QuizHostReconnect} from "./pages/quizHost/QuizHostReconnect";

const App = () =>{
    return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" component={Home} exact/>
                            {/* 관리자 페이지 목록*/}

                            {/* 진행자 페이지 목록*/}
                            <Route path="/Auth" component={Auth} exact/>

                            <Route path="/QHost" component={QuizHostMain} exact/>

                            <Route path="/QHost/create" component={QuizHostCreate} exact/>

                            <Route path="/QHost/find" component={QuizHostFind} exact/>

                            <Route path="/QHost/ready" component={QuizHostReady} exact/>

                            <Route path="/QHost/play" component={QuizHostPlay} exact/>

                            <Route path="/QHost/report" component={QuizHostReport} exact/>

                            <Route path="/QHost/reconnect" component={QuizHostReconnect} exact/>

                            {/* 참가자 페이지 목록*/}
                            <Route path="/QClient" component={QuizClientMain} exact/>

                            <Route path="/QClient/play" component={QuizClientPlay} exact/>

                            <Route path="/QClient/reconnect" component={QuizClientReconnect} exact/>

                            <Route path="/p/:pinNum" component={QuizClientMain} exact/>

                            {/* 404 페이지, 테스트 페이지*/}

                            <Route path="*" component={NotFound404} />


                        </Switch>
                    </div>
                </Router>
            </Provider>
    );
}
export default App;
