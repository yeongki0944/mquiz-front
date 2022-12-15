import {Img, Item} from "../../../LayOuts/LayOuts";

export const ImageShow = (props) =>{
    const currentQuiz = props.currentQuiz;
    return(
        <Item sx={{place:'center'}}>
            <Img
                src={currentQuiz.media.url}
                alt="퀴즈 이미지"
                sx={{
                    width:'auto',
                    height:'auto',
                    maxWidth:'100%',
                    maxHeight:'100%',
                    objectFit: 'cover',
                }}
                sm={{
                }}
            />
        </Item>
    )
}
