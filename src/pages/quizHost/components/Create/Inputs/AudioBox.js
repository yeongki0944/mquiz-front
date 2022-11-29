import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function AudioBox(props){
    const classes = useStyles();
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id={props.id}
                type="file"
                onChange={handleChange}
            />
            <label htmlFor="contained-button-file">
                audio
            </label>
        </div>
    );

}
