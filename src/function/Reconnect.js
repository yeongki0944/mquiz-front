import {getPinNum} from "./localStorage";

export const checkConnected = () => {
    console.log(getPinNum());
    if(localStorage.getItem('pinNum') != null){

        if(localStorage.getItem('role')==="HOST"){ //HOST 재접속
            window.location.href="/QHost/reconnect";
        }
        else{ //CLIENT 재접속
            window.location.href="/QClient/reconnect";
        }
    }
}
