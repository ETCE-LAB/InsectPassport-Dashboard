import React, {useEffect, useState} from "react";
import {IPMPModel} from "../models/test";

export const TempView = () => {

    const [impData, setImpData] = useState<null | IPMPModel>(null)

    useEffect(() => {
        const stringData = localStorage.getItem("data")
        if(stringData){
            const parsedData = JSON.parse(stringData) as IPMPModel
            setImpData(parsedData)
        }

    }, []);

    return <>
        {impData && (
            <div>
                <h3>Uploaded IPMP Data</h3>
                <pre style={{ background: "#f4f4f4", padding: "1rem" }}>
            {JSON.stringify(impData, null, 2)}
          </pre>
            </div>
        )}
    </>
}