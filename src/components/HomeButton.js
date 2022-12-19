import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Img, Item} from "../layouts/LayOuts";
import {redirectPage} from "../function/common";
import {useSelector} from "react-redux";
import {flushLocalStorage, getNickname, getPinNum, getRole} from "../function/localStorage";
import {stompSend} from "../function/WebSocket";
import {getSolvedTime} from "../function/Timer";

export const HomeButton = (props) => {
    const {page} = useSelector(state => state.page);

    const handleHomeButton = () => {
        switch(page){
            case "QCLIENT":
                confirmRedirect("메인으로 이동하시겠습니까? 이동 시 게임에서 나가게 됩니다.");
                break;
            case "QHOSTAUTH":
                confirmRedirect("메인으로 이동하시겠습니까?");
                break;
            case "QHOSTPLAY":
                confirmRedirect("메인으로 이동하시겠습니까? 이동 시 게임에서 나가게 됩니다.");
                break;
        }
    };

    const confirmRedirect = (Msg) => {
        if(window.confirm(Msg)){
            if(getRole()==="HOST"&&page!="QHOSTAUTH"){
                stompSend("end", {
                    pinNum: getPinNum(),
                    action: "END"
                });
            }
            flushLocalStorage();
            window.location.href = "/";
        }
    };


    //<HomeButton sx={{position: 'absolute', top: 5, left: 5, zIndex: 100,width:'5vh',height:'5vh'}}/>
    return (
        <Item sx={props.sx} sm={props.sm}>
            <Item sx={{
                borderRadius: '100%', backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.1), 0 8px 8px rgba(0,0,0,0.1), 0 16px 16px rgba(0,0,0,0.1)',
            }}>
                <Img
                    sx={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '70%',
                        maxHeight: '70%',
                        objectFit: 'cover',
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                    }}
                    src={"/img/home.png"}
                    onClick={handleHomeButton}
                />
            </Item>
            {/*<Modal open={open} setOpen={setOpen}/>*/}
        </Item>
    )
}
