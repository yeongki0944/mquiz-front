import {useSelector} from "react-redux";

export const YoutubeShow = () =>{
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);
    return(
        <>
        </>
    )
}
