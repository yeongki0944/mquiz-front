import {useSelector} from "react-redux";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
export const ImageShow = () =>{
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);
    return(
            <Img src={currentQuiz.media.url} alt=""/>
    )
}
