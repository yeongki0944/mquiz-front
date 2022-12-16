import * as React from 'react';
import {useState} from "react";
import Modal from "@mui/material/Modal";
import {useDispatch} from "react-redux";
import {Slider} from "@mui/material";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import {R_modifyQuiz} from "../../../redux/reducers/quizInfoReducer";
import {Btn, Item, Text} from "../../../layouts/LayOuts";
import {fontWeight} from "@mui/system";


const YoutubeModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
const ModalPaper = styled(Paper)({
    width: '50%',
    height: '10%',
});

export default function YoutubeBox() {

    const dispatch = useDispatch();

    const [url, setUrl] = useState("");
    const [value, setValue] = useState([0, 10]);
    const [showModal, setShowModal] = useState(false);
    const [videoId, setVideoId] = useState("");
    const [videoLength, setVideoLength] = useState(200);

    const handleUrl = (e) => {
        setUrl(e.target.value);
    }

    function getVideoDuration(url) {
    }


    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleclosemodal = () => {
        setShowModal(false);
    }

    const handleVideoId = () => {
        let videoId = url.split("v=")[1];
        let ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition != -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        setVideoId(videoId);
        handleShowModal();
    }

    const handleVideoUrl = () => {
        let videoUrl = `https://www.youtube.com/embed/${videoId}?start=${value[0]}&end=${value[1]}`;
        dispatch(R_modifyQuiz({keytype: "media", key: "url", value: videoUrl}));
        setShowModal(false);
    }

    function valuetext(value) {
        return `${value}`;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Item sx={{place: 'center'}}>
            <input type="text" value={url} onChange={handleUrl}/>
            <Btn onClick={handleVideoId}>영상설정하기</Btn>
            <Modal
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                open={showModal}
            >
                <Item sx={{place: 'center', display:'block',width: '50%', height: '20%',background:'#fff', borderRadius:'10px'}}>
                    <Item sx={{place: 'center', height:'20%'}}>
                        <Text sx={{fontWeight:900}}>영상 사작/끝 시간 설정</Text>
                    </Item>
                    <Item sx={{place:'center', height:'40%'}}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            max={videoLength}
                        />
                    </Item>
                    <Item sx={{place: 'center', height:'40%'}}>
                        <Btn onClick={handleVideoUrl}>Set</Btn>
                    </Item>
                </Item>
            </Modal>
        </Item>

        // <div>
        //     <input type="text" value={url} onChange={handleUrl}/>
        //     <button onClick={handleVideoId}>Set Start and End</button>
        //     <YoutubeModal open={showModal} handleClose={handleclosemodal}>
        //         <ModalPaper sx={{
        //             width: '50%',
        //             height: '10%',
        //             background:'#fff',
        //             borderRadius:'10px'
        //         }}>
        //             <Slider
        //                 value={value}
        //                 onChange={handleChange}
        //                 valueLabelDisplay="auto"
        //                 getAriaValueText={valuetext}
        //                 max={videoLength}
        //             />
        //             <Btn onClick={handleVideoUrl}>Set</Btn>
        //         </ModalPaper>
        //     </YoutubeModal>
        // </div>
    )


}
