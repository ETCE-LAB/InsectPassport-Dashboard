import {IPMPModel} from "../models/test";

export function parseIPMPModel(json: string): IPMPModel {
    try {
        const parsedData = JSON.parse(json);
        // Optionally, insert runtime validation logic here to ensure parsedData conforms to IPMPModel
        const data = parsedData as IPMPModel;
        localStorage.setItem("data", JSON.stringify(data))
        return data
    } catch (error) {
        throw new Error("Failed to parse JSON: " + (error as Error).message);
    }
}