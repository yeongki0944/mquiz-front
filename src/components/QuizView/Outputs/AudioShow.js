import {useSelector} from "react-redux";

export const AudioShow = () =>{
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);
    return(
        <div>
            Audio
        </div>
    )
}
