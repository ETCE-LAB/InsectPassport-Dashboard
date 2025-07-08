import {IPMP} from "../models/test";

export function parseIPMPModel(json: string): IPMP {
    try {
        const parsedData = JSON.parse(json);
        // Check and extract the .IPMP property
        if (!parsedData.IPMP) {
            throw new Error("Missing 'IPMP' root key in JSON");
        }
        const data = parsedData.IPMP as IPMP;
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        throw new Error("Failed to parse JSON: " + (error as Error).message);
    }
}