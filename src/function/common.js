import {flushLocalStorage} from "./localStorage";
import {stompDisconnect} from "./WebSocket";

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
    // });
};

