import {Link} from "react-router-dom";
import React from "react";
import './home.css';


export default function Home() {
    return (
        <div id={"home_content"}>
            <Link to="/QHost">
                <div className={"btn"}>
                    퀴즈 만들기
                </div>
            </Link>
            <Link to="/QClient">
                <div className={"btn"}>
                    퀴즈 풀기
                </div>
            </Link>
        </div>
    );
}
