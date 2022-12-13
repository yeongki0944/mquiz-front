import styled from "@mui/material/styles/styled";
import {Item} from "../../../LayOuts/LayOuts";

export const ImageShow = (props) =>{
    const currentQuiz = props.currentQuiz;
    return(
        <Item sx={{place:'center', width:'100%', height:'100%'}}>
            <img
                src={currentQuiz.media.url}
                alt="퀴즈 이미지"
                style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '80%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                }}
            />
        </Item>
    )
}
