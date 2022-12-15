import {useDispatch, useSelector} from "react-redux";
import {R_addQuiz, R_makeQuizShow, R_setCurrentShow} from "../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {useHistory} from "react-router-dom";
import {saveShowAPI} from "../../function/API";
import {Btn, Item, Text} from "../../LayOuts/LayOuts";
import {useState} from "react";
import Modal from "@mui/material/Modal";
import {Slider} from "@mui/material";

export const ControlPanel = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const quiz = props.quiz;
    const [open,setOpen] = useState(false);
    const [result,setResult] = useState('');

    const verifyQuiz = () => {
        let result = [];
        console.log(quiz.quizData);
        quiz.quizData.forEach((item, index) => {
            //공통 검증
            console.log("question"+item.answer);
            if (item["question"] === "") {
                result.push(index + 1 + "번 문제의 문제를 입력해주세요.");
            }
            if (item["answer"].length === 0) {
                result.push(index + 1 + "번 문제의 정답을 입력해주세요.");
            }
            if(item.time === 0){
                result.push(index + 1 + "번 문제의 제한시간을 입력해주세요.");
            }

            //유형 별 검증
            switch (item.type) {
                case "선택형":
                    let ChoiceList = [];
                    for(let i = 1; i <= 4; i++){
                        if(item.choiceList["num"+i]!=""){
                            ChoiceList.push(item.choiceList["num"+i]);
                        }
                    }
                    if(ChoiceList.length < 2){
                        result.push(index + 1 + "번 문제의 선택지를 2개 이상 입력해주세요.");
                    }
                    break;
                case "OX":
                    break;
                case "단답형":
                    break;
            }
        })
        return result;
    }


    const save = async () => {
        let result = verifyQuiz();
        if(result.length > 0){
            dispatch(R_makeQuizShow({key:"state", value:"작성중"}));
        }else{
            dispatch(R_makeQuizShow({key:"state", value:"완성"}));
        }
        setResult(result);
        setOpen(true);

    }
    const addPage = () => {
        dispatch(R_addQuiz());
        dispatch(R_setCurrentShow(quiz.quizData.length));
    }

    return (
    <Item sx={{place: 'center', width: "100%", height: '5vh',backgroundColor:'rgba(0,0,0,0.5)',position:'absolute',bottom:0}} sm={{}}>
        <Item sx={{place: 'center'}} onClick={addPage}>
            <Text sx={{color:'#fff',cursor:'pointer'}}>+ Page</Text>
        </Item>
        <Item sx={{place: 'center'}}>
            <Text sx={{color:'#fff',cursor:'pointer'}}>+ Show</Text>
        </Item>
        <Item sx={{place: 'center',cursor:'pointer'}} onClick={save}>
            <Text sx={{color:'#fff'}}>Save</Text>
        </Item>
        <Modal
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            open={open}
        >
            <Item sx={{place: 'center', display:'block',width: '50%', height: '50%',background:'#fff', borderRadius:'10px'}}>
                <Item sx={{place: 'center', height: '20%', width: '100%', borderBottom:'1px solid #000'}}>
                    <Text sx={{fontSize:'1.5rem'}}>저장 상태 확인</Text>
                </Item>
                <Item sx={{place: 'center', height: '50%', width: '100%',display:'block',overflowY:'auto'}}>
                    {result.length > 0 ?
                        result.map((item,index) => {
                            return <Text key={index}>{item}</Text>
                        })
                        :
                        <Text>필수 조건을 모두 만족하였습니다.</Text>
                    }
                </Item>
                <Item sx={{place: 'center', height: '10%', width: '100%'}}>
                    <Btn sx={{width:'50%', height:'100%', background:'#fff', border:'1px solid #000', borderRadius:'10px'}} onClick={() => {
                        if(saveShowAPI(quiz)){
                            history.push("/QHost");
                        }else{
                            alert("저장에 실패했습니다.");
                        }
                        setOpen(false);
                    }}>저장</Btn>
                    <Btn sx={{width:'50%', height:'100%', background:'#fff', border:'1px solid #000', borderRadius:'10px'}} onClick={() => {
                        setOpen(false);
                    }}>돌아가기</Btn>
                </Item>
            </Item>
        </Modal>
    </Item>
    )
}
