import Modal from "@mui/material/Modal";
import {Item} from "../layouts/LayOuts";
import QRCode from "react-qr-code";
import * as React from "react";


export const QRModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Item sx={{
                place:'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                borderRadius: '10px',
                border: '1px solid #ccc',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                margin: 'auto',
                width: '40%',
                height: '40%',
                display: 'block'
            }} sm={{
                width: '80%',
                height: '50%',
            }}>
                <Item sx={{place:'center'}}>
                    <QRCode
                        size={256}
                        value={props.url}
                        viewBox={`0 0 256 256`}
                    />
                </Item>
            </Item>
        </Modal>
    );
}
