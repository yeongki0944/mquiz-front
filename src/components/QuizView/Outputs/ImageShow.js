import {useSelector} from "react-redux";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const Img = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",

});
export const ImageShow = (props) =>{
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = props.currentQuiz;
    return(
            <Img src={currentQuiz.media.url} alt=""/>
    )
}
