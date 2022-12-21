import * as React from 'react'
import {Item, Card_panel} from "../../layouts/LayOuts";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getLogInfoAPI, getLogListAPI} from "../../function/API";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */

export const QReportCardList = (props) => {
    const reportList = props.reportList;

    // const ReportList = reportList.map(
    //     (item, index) =>(
    //         <Card_panel
    //             sx={{height:'15%', width:'100%', marginBottom:'15px'}}
    //             key={index}
    //             onClick={()=>{
    //                 getLogInfoAPI(item.showid);
    //             }}
    //         >
    //             <Item sx={{place:'left', width:'100%', height:'50%'}}>
    //                 {item.title}
    //             </Item>
    //             <Item sx={{place:'left', width:'100%', height:'50%'}}>
    //                 <Item sx={{place:'center'}}>
    //                     {item.playdate}
    //                 </Item>
    //                 <Item sx={{place:'center'}}>
    //                     {item.quizcount}
    //                 </Item>
    //                 <Item sx={{place:'center'}}>
    //                     {item.usercount}
    //                 </Item>
    //             </Item>
    //         </Card_panel>
    //     )
    // )

    const ReportList = () => {
        return(
            <>
                {console.log("-----------------------")}
                {console.log(reportList)}
            </>
        )
    }

    return (
        <Item sx={{place:'top', width:'100%', height:'100%', display:'block'}}>
            {ReportList}

        </Item>
    );
}
