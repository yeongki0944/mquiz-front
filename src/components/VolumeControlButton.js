import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Slider, Stack} from "@mui/material";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {VolumeUp} from "@material-ui/icons";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {useState} from "react";
import {Item} from "../LayOuts/LayOuts";



/**
 * props:
 *  이게 필요한가??
 */
export const VolumeControlButton = (props) => {
    // 음량 데이터
    const [volumeData, setVolumeData] = useState(50);
    const [beforeVolumeData, setBeforeVolumeData] = useState();
    // true : 음소거, false : 음소거 해제
    const [muteState, setMuteState] = useState(false);

    return (
        <Item sx={props.sx} sm={props.sm}>
            {/*
            오디오 어떻게하죠?? 방법을 모르겠넹;;
            <audio controls autoPlay loop>
                <source src={"https://www.youtube.com/watch?v=qM9Ma1Mc01w"}/>
            </audio>
            */}
            <Stack spacing={0.5} direction="row" sx={{mb: 0.5}} alignItems="center">
                <Slider
                    aria-label="Volume"
                    value={volumeData}
                    onChange={
                        (event, newValue) => {
                            setVolumeData(newValue);
                        }
                    }
                />
                <Button
                    variant={"contained"}
                    onClick={
                        ()=>{
                            if(muteState){
                                setMuteState(false);
                                setVolumeData(beforeVolumeData);
                            }else{
                                setBeforeVolumeData(volumeData);
                                setMuteState(true);
                                setVolumeData(0);
                            }
                        }
                    }>
                    {
                        muteState ? <VolumeOffIcon/> : <VolumeUp/>
                    }
                </Button>
            </Stack>
        </Item>
    )
}
