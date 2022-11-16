import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from "react";


function App() {
    const dispatch = useDispatch()

    const { quizInfo } = useSelector(state => state.quizInfo)
    const { quizList } = useSelector(state => state.quizList)

    const [info, setinfo] = useState({
        title: "쇼 제목1111",
    })

    const setQuizInfo = () => dispatch({ type: 'SET_QUIZ_INFO', payload: info })

    useEffect(() => {
        console.log(quizInfo);
        console.log(quizList);
        console.log("-----------------");
    }, [])


    return (
        <div className="App">
            <button onClick={setQuizInfo}>퀴즈정보</button>
            title = {quizInfo.showInfo.title}
            owner = {quizInfo.showInfo.owner}

        </div>
    );
}

export default App;
