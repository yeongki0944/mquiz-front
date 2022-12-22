import {useSelector} from "react-redux";
import Home from "./home/Home";
import {QHostMain} from "./quizHost/QHostMain";
import {QClientMain} from "./quizClient/QClientMain";
import {QHostAuth} from "./quizHost/QHostAuth";
import React, {useEffect} from "react";
import {QHostCreate} from "./quizHost/QHostCreate";
import {QHostPlay} from "./quizHost/QHostPlay";
import {QHostReport} from "./quizHost/QHostReport";
import {checkConnected, disableBackPage, disableRefresh} from "../function/common";
import {flushRedux} from "../function/reduxFunction";


export const Router = () =>{
    const {page} = useSelector(state => state.page);

    useEffect (() => {
        disableBackPage();
        disableRefresh();
        checkConnected();
    }, []);
    return(
        {
            "MAIN": <Home/>,
            "QCLIENT": <QClientMain/>,
            "QHOST": <QHostMain/>,
            "QHOSTAUTH": <QHostAuth/>,
            "QHOSTCREATE" : <QHostCreate/>,
            "QHOSTPLAY" : <QHostPlay/>,
            "QHOSTREPORT" : <QHostReport/>,
        }[page]
    )
}
