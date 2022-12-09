import Modal from "@mui/material/Modal";
import {Item_c} from "../LayOuts/LayOuts";
import QRCode from "react-qr-code";
import * as React from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import styled from "styled-components";

const Item_c_paper = styled(Item_c)`
    background: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin: auto;
    width: 400px;
    height: 300px;
    display: block;
`
export const QR_Modal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Item_c_paper>
                <Item_c>
                    <QRCode
                        size={256}
                        value={props.url}
                        viewBox={`0 0 256 256`}
                    />
                </Item_c>
            </Item_c_paper>
        </Modal>
    );
}
