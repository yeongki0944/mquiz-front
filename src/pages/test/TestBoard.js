import {Gauge} from "../components/Gauge";

export default function TestBoard(){
    return(
        <>
            <Gauge
                Qnum={1}
                TotalQcnt={10}
                timeprogress={30}
                timeleft={30}
            />
        </>
    )
}
