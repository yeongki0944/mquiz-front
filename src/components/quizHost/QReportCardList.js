import * as React from 'react'
import {Item, Card_panel} from "../../layouts/LayOuts";
import {getLogInfoAPI} from "../../function/API";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import store from "../../redux/store";
import {R_setReportInfo} from "../../redux/reducers/reportInfoReducer";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */

export const QReportCardList = (props) => {
    const reportList = props.reportList;

    const ReportList = reportList.map(
        (item, index) =>(
            <Card_panel
                sx={{height:'15%', width:'100%', marginBottom:'15px'}}
                sm={{height:'50%', width:'100%', marginBottom:'15px'}}
                key={index}
                onClick={()=>{
                    getLogInfoAPI(item.id).then((res) => {
                        if (res.status === 200) {
                            store.dispatch(R_setReportInfo(res.data.Item))
                        } else {
                        }
                    }).catch((err) => {
                    });
                }}
            >
                <Item sx={{place:'left', width:'100%', height:'50%'}}>
                    <Item sx={{place:'left', marginLeft:'10px'}}>
                        <h4>{item.showtitle}</h4>
                    </Item>
                </Item>
                <Item sx={{place:'left', width:'100%', height:'50%', fontSize:'1vw'}}>
                    <Item sx={{place:'center'}}>
                        <AccessTimeIcon/> {item.playdate}
                    </Item>
                    <Item sx={{place:'center', }}>
                        <ClassIcon/> {item.quizcount}
                    </Item>
                    <Item sx={{place:'center'}}>
                        <PersonIcon/> {item.usercount}
                    </Item>
                </Item>
            </Card_panel>
        )
    )

    return (
        <Item sx={{place:'top', width:'100%', height:'100%', display:'block'}}>
            {ReportList}
        </Item>
    );
}
