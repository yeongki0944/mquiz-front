import * as React from 'react';
import {useState} from "react";
import Modal from "@mui/material/Modal";
import {useDispatch} from "react-redux";
import {Slider} from "@mui/material";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import {R_modifyQuiz} from "../../../redux/reducers/quizInfoReducer";


const YoutubeModal = styled(Modal) ({
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
        <div>
            <input type="text" value={url} onChange={handleUrl}/>
            <button onClick={handleVideoId}>Set Start and End</button>
            <YoutubeModal open={showModal} handleClose={handleclosemodal}>
                <ModalPaper>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={videoLength}
                    />
                    <button onClick={handleVideoUrl}>Set</button>
                </ModalPaper>
            </YoutubeModal>

        </div>
    )




}
