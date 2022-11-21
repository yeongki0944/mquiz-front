import {LinearProgress} from "@mui/material";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import {createSvgIcon} from "@mui/material/utils";

// Grid Item 설정
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// 아이콘
const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
);

export const ClientTotalCount = (props) => {
    return (
        <>
        <Grid item xs={12} md={12}>
            <Item>
                <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                    <HomeIcon /> <b>총 참여자 수 {props.ClientTotalCount} 명</b>
                </Typography>
            </Item>
        </Grid>
        </>
    )
}
