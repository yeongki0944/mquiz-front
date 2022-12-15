import * as React from 'react'
import {useSelector} from "react-redux";
import {Item, Card_panel} from "../../LayOuts/LayOuts";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */

export const QuizReportCardList = (props) => {
    //const {quizPlay} = useSelector(state => state.quizPlay);

    // const ReportCard = quizPlay.map(
    //     ()=> (
    //     // 나중에 레디스에서 로그 가져와야함
    //         <Card_panel
    //              sx={{height:'15%'}}
    //              onClick={()=>{console.log("test")}// 여기에서 백단에서 데이터 가져와야함}
    //         >
    //             <Item sx={{place:'left', width:'100%', height:'50%'}}>
    //                 쇼 제목
    //             </Item>
    //             <Item sx={{place:'left', width:'100%', height:'50%'}}>
    //                 <Item sx={{place:'center'}}>
    //                     플레이한 날짜
    //                 </Item>
    //                 <Item sx={{place:'center'}}>
    //                     총 문제 수
    //                 </Item>
    //                 <Item sx={{place:'center'}}>
    //                     총 플레이 시간
    //                 </Item>
    //                 <Item sx={{place:'center'}}>
    //                     참여자수
    //                 </Item>
    //             </Item>
    //         </Card_panel>
    //     )
    // )

    return (
        <Item sx={{place:'top', width:'100%', height:'100%', display:'block'}}>
            <Card_panel sx={{height:'15%', width:'100%', marginBottom:'15px'}} onClick={()=>{console.log("test")}}>
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
