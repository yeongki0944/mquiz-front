import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {useDispatch} from "react-redux";
import {Item} from "../../../layouts/LayOuts";
import AWS from "aws-sdk";
import {R_modifyQuiz} from "../../../redux/reducers/quizInfoReducer";
import {useState} from "react";
import {CircularProgress} from "@mui/material";

export default function ImageBox() {
    const dispatch = useDispatch();
    const [upload, setUpload] = useState(false);

   const handleImageChange = (e) =>{
       setUpload(true);
       const file = e.target.files[0];
       /* eslint-disable-next-line no-restricted-globals */
       const filename = "original/"+self.crypto.randomUUID();

       AWS.config.update({
           region:process.env.REACT_APP_AWS_S3_REGION,
           accessKeyId:process.env.REACT_APP_AWS_ACCESS_KEY_ID,
           secretAccessKey:process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
       });

       const upload = new AWS.S3.ManagedUpload({
           params:{
               Bucket:process.env.REACT_APP_AWS_BUCKET_NAME,
               Key:filename + ".png",
               Body:file,
           },
       })

       const promise = upload.promise();
       promise.then(
           function (data){
               dispatch(R_modifyQuiz({keytype: 'media', key: 'url', value: data.Location}));
               setUpload(false);
           },
           function (err){
               alert("이미지 업로드를 실패하셨습니다.");
               setUpload(false);
           }
       )

   }

    return (
        <Item sx={{place: 'center'}}>
            <input
                style={{display: 'none'}}
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
                { upload===true ?
                    <CircularProgress size={'3vh'} color={'success'}/>
                    :
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                }
            </label>
        </Item>

        // <div>
        //     <Image_Input
        //         accept="image/*"
        //         id="icon-button-file"
        //         type="file"
        //         onChange={handleImageChange}
        //     />
        //     <label htmlFor="icon-button-file">
        //         <IconButton color="primary" aria-label="upload picture" component="span">
        //             <PhotoCamera />
        //         </IconButton>
        //     </label>
        // </div>
    );
}
