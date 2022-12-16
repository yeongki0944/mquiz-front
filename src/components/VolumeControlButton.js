import * as React from "react";
import {Slider, Stack} from "@mui/material";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {VolumeUp} from "@material-ui/icons";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {useState} from "react";
import {Btn, Item} from "../layouts/LayOuts";


/**
 * 음량 조절
 * 음소거
 */
export const VolumeControlButton = (props) => {
    // 음량 데이터
    const [volumeData, setVolumeData] = useState(50);
    const [beforeVolumeData, setBeforeVolumeData] = useState();
    // true : 음소거, false : 음소거 해제
    const [muteState, setMuteState] = useState(false);

    const handleVolumeChange = (event) => {
        setVolumeData(event.target.value);
        const audio = document.querySelector('audio')
        audio.volume = event.target.value / 100;
    };

    const handleMute = () =>{
        const audio = document.querySelector('audio');
        audio.muted = !audio.muted;
        setMuteState(!muteState);
    }

    return (
        <Item sx={props.sx} sm={props.sm}>
            <audio autoPlay loop>
                {props.mediaName === "Ready" && <source src="/music/ready_music.mp3" type="audio/mpeg"/>}
                {props.mediaName === "Play" && <source src="/music/play_music.mp3" type="audio/mpeg"/>}
            </audio>
            <Stack spacing={0.5} direction="row" sx={{mb: 0.5}} alignItems="center">
                <Item sx={{place:'center', width:'100px'}}>
                    <Slider
                        aria-label="Volume"
                        value={volumeData}
                        onChange={handleVolumeChange}
                    />
                </Item>
                <Item sx={{place:'center', width:'50px'}}>
                    <Button
                        variant={"contained"}
                        onClick={
                            ()=>{
                                handleMute();
                            }
                        }>
                        {
                            muteState ? <VolumeOffIcon/> : <VolumeUp/>
                        }
                    </Button>
                </Item>
            </Stack>
        </Item>
    )
}
