import * as React from 'react'
import {Item, Card_panel} from "../../layouts/LayOuts";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */

export const QReportCardList = (props) => {

    return (
        <Item sx={{place:'top', width:'100%', height:'100%', display:'block'}}>
            <Card_panel sx={{height:'15%', width:'100%', marginBottom:'15px'}}>
                <Item sx={{place:'left', width:'100%', height:'50%'}}>
                    쇼 제목
                </Item>
                <Item sx={{place:'left', width:'100%', height:'50%'}}>
                    <Item sx={{place:'center'}}>
                        플레이 날짜
                    </Item>
                    <Item sx={{place:'center'}}>
                        총 문제 수
                    </Item>
                    <Item sx={{place:'center'}}>
                        총 플레이 시간
                    </Item>
                    <Item sx={{place:'center'}}>
                        참여자수
                    </Item>
                </Item>
            </Card_panel>
        </Item>
    );
}
