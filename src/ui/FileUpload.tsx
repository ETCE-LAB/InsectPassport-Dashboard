import React from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
// adjust path to your models file

import {IPMPModel} from "../models/test";
import {parseIPMPModel} from "../services/parseIPMP"; // adjust path to your parse function

const IPMPDropzone: React.FC = () => {
    const handleDrop = (files: File[]) => {
        // Assume only one file is uploaded
        const file = files[0];

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            try {
                const text = event.target?.result as string;
                const parsedData: IPMPModel = parseIPMPModel(text);
                console.log('Parsed JSON Data:', parsedData);
                localStorage.setItem("data", JSON.stringify(parsedData))
                // Now you can use `parsedData` in your component state or pass it along
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        };

        reader.onerror = () => {
            console.error('Error reading file');
        };

        reader.readAsText(file);
    };

    return (
        <Dropzone
            onDrop={handleDrop}
            multiple={false}
            style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <div>Drag and drop your JSON file here, or click to select a file</div>
        </Dropzone>
    );
};

export default IPMPDropzone;
