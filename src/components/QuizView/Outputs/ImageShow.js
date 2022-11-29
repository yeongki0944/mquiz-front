import {useSelector} from "react-redux";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const Item = styled(Paper) ({
    width: "100%",
    height: "100%",
    padding: "2px",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
});

export const ImageShow = () =>{
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);
    return(
        <Item>
            <img src={currentQuiz.media.url} alt=""/>
        </Item>
    )
}
