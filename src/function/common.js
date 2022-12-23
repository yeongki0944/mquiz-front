import {flushLocalStorage, getPinNum, getRole, setPinNum, setRole} from "./localStorage";
import {stompDisconnect} from "./WebSocket";
import {R_setPage} from "../redux/reducers/pageControlReducer";
import store from "../redux/store";
import {R_setData} from "../redux/reducers/quizplayReducer";
import {flushRedux, setCommand} from "./reduxFunction";

export const redirectPage = (page) => {
    console.log(page);
    store.dispatch(R_setPage(page));
};

export const disableBackPage = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, '', window.location.pathname);
    });
};

export const disableRefresh = () => {
    // window.addEventListener('beforeunload', function (e) {
    //     e.preventDefault();
    //     e.returnValue = '';
    //     window.location.href = '/';
    // });
};

export const checkConnected = (command) => {
    if (getPinNum() != null) {
        if (command === null) {
            if (getRole() === 'HOST') {
                setCommand('RECONNECT');
                redirectPage('QHOSTPLAY');
            } else if (getRole() === 'CLIENT') {
                setCommand('RECONNECT');
                redirectPage('QCLIENT');
            }
        }
    } else { //재접속 아닐 시
        flushLocalStorage();
        flushRedux();
        if (window.location.pathname.startsWith('/p/')) { //여긴 URL 접속 경로로 접근 시 사용됨
            let pinNum = window.location.pathname.substring(3);
            if(pinNum){
                setRole('CLIENT');
                setCommand('PIN');
                redirectPage('QCLIENT');
            }
        }
    }
}

