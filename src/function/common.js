import {flushLocalStorage, getPinNum, getRole, setPinNum, setRole} from "./localStorage";
import {stompDisconnect} from "./WebSocket";
import {R_setPage} from "../redux/reducers/pageControlReducer";
import store from "../redux/store";
import {R_setData} from "../redux/reducers/quizplayReducer";

export const redirectPage = (page) => {
    store.dispatch(R_setPage(page));
};

export const disableBackPage = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, '', window.location.pathname);
    });
};

export const disableRefresh = () => {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
        window.location.href = '/';
    });
};

export const checkConnected = (command) => {
    if (getPinNum() != null) {
        if (command === null) {
            if (getRole() === 'HOST') {
                store.dispatch(R_setData({key: 'command', value: 'RECONNECT'}));
                redirectPage('QHOSTPLAY');
            } else if (getRole() === 'CLIENT') {
                store.dispatch(R_setData({key: 'command', value: 'RECONNECT'}));
                redirectPage('QCLIENT');
            }
        }
    } else {
        const URL = window.location.pathname.split('/')[1];
        const pinNum = URL.substring(URL.lastIndexOf('/') + 1);
        if(pinNum){
            setRole('CLIENT');
            store.dispatch(R_setData({key: 'command', value: 'PIN'}));
            redirectPage('QCLIENT');
        }
    }
}

