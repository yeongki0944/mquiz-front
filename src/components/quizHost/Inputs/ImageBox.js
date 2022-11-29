import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {useDispatch} from "react-redux";
import {R_modifyQuiz} from "../../../redux/reducers/quizInfoReducer";
import styled from "styled-components";
import {useState} from "react";

const Image_Input = styled('input')`
    display : none;
`

export default function ImageBox() {
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            // setImage(reader.result);
            dispatch(R_modifyQuiz({keytype: 'media', key: 'url', value: reader.result}));
        }
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <Image_Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </div>
    );
}
