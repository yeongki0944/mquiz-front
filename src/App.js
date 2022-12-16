import React from "react";
import store from "./redux/store";
import {Provider} from "react-redux";
import {Router} from "./pages/Router";

const App = () =>{

    return (
            <Provider store={store}>
                <Router/>
            </Provider>
    );
}
export default App;
