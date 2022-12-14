import {Img, Item} from "../../../LayOuts/LayOuts";

export const ImageShow = (props) =>{
    const currentQuiz = props.currentQuiz;
    return(
        <Item sx={{place:'center', width:'100%', height:'100%'}}>
            <Img
                src={currentQuiz.media.url}
                alt="퀴즈 이미지"
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '80%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                }}
                sm={{
                    width:'50%',
                    height:'50%'
                }}
            />
        </Item>
    )
}
