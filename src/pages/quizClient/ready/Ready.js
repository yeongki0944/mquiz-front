import * as React from 'react';
import {ClientCountOutModal} from "../components/ClientCountOutModal";
import {ClientReady} from "../components/ClientReady";

export default function Ready() {

    return (
        <>
                <ClientReady></ClientReady>
                <ClientCountOutModal></ClientCountOutModal>
        </>
    );
}
