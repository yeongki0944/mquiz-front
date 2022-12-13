import {Btn} from "../../LayOuts/LayOuts";
import {useHistory} from "react-router-dom";
import CustomAxios from "../../function/CustomAxios";
import {useState} from "react";
import Modal from "@mui/material/Modal";

export const Auth = () =>{
    const usehistory = useHistory();
    const [open,setOpen] = useState(false);

    const handleSuccess = () => {
        usehistory.push("/QHost");
    }
    const handleLogin = () => {
        CustomAxios.post("/api", {
        }).then((res) => {
            console.log(res);
            if(true){
                handleSuccess();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleReg = () =>{
        CustomAxios.post("/api", {
        }).then((res) => {
            console.log(res);
            if(true){
                handleSuccess();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <h1>Auth</h1>
            <div>ID:<input type={"text"}/></div>
            <div>PW:<input type={"password"}/></div>
            <Btn onClick={handleLogin}>로그인</Btn>

            <hr/>
                <div>ID:<input type={"text"}/></div>
                <div>PW:<input type={"password"}/></div>
                <Btn onClick={handleReg}>회원가입</Btn>
            <hr/>
            <Btn onClick={handleSuccess}>로그인 성공 가정</Btn>
        </div>
    )
}
