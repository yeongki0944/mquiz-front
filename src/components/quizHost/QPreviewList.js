import * as React from 'react'
import { useSelector} from "react-redux";
import {Card_panel, Content, Item, Text} from "../../layouts/LayOuts";
import {QPreView} from "./QPreView";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */


export const QPreviewList = (props) => {
    const {quiz} = useSelector(state => state.quiz)
    if (quiz.id === "") {
        return (<Item sx={props.sx} sm={props.sm}><Content></Content></Item>)
    } else {
        return (
            <Item sx={props.sx} sm={props.sm}>
                <Item sx={{place: 'center', display: 'block'}}>
                    <Text>
                        총 {quiz.quizData.length}문제
                    </Text>
                    <Item sx={{place: 'center', display: 'block'}}>
                            {quiz.quizData.map(
                                (item, index) => {
                                    return (
                                        <Card_panel sx={{margin:'10px'}}>
                                            <QPreView sx={{place:'center'}} currentQuiz={item}/>
                                        </Card_panel>
                                    )
                                }
                            )}
                    </Item>
                </Item>
            </Item>
        );
    }

}