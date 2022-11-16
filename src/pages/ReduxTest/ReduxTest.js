import * as React from 'react';
import {Provider} from "react-redux";
import App from "./TestApp";
import store from "../redux/store";


export default function ReduxTest(){
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}
