import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

export function CircularIndeterminate() {
    return (
        <div className="clientLayout">


                <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
            <CircularProgress />
                </Typography>
            <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                <b>정답을 확인하는 중...</b>
            </Typography>


        </div>
    );
}
