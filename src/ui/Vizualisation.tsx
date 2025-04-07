import {IPMPModel} from "../models/test";
import {parseIPMPModel} from "../services/parseIPMP";
import {useEffect, useState} from "react";
import {IPMPVisualizer} from "./views";

export const Vizualisation = () => {

    const [data, setData] = useState<IPMPModel>()

    useEffect(() => {
        console.log("i am rendered")
        const text = localStorage.getItem("data")
        console.log(text)
        if(text && text != "empty"){
            const parsedData: IPMPModel = parseIPMPModel(text);
            setData(parsedData)
        }
    }, []);

    return <>
        {data && <IPMPVisualizer data={data}></IPMPVisualizer>}
    </>
}