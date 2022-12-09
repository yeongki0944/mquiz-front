import * as React from 'react';
import {Page_Default} from "../../LayOuts/LayOuts";
import {NavBar} from "../../components/quizHost/NavBar";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";

export const QuizHostReport = () => {

    return (
        <Page_Default>
            <NavBar/>
            report
        </Page_Default>
    );
}
