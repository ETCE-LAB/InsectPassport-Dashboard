import React, { ChangeEvent, useState } from 'react';
import { IPMPModel, Document } from "../models/test"; // adjust the path as needed
import { parseIPMPModel } from "../services/parseIPMP"; // adjust the path as needed

interface DocumentWithPDF {
    doc: Document;
    pdfUrl: string;
}

// Extend input props to include webkitdirectory.
interface FolderInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    webkitdirectory?: string;
}

const FolderUploader: React.FC = () => {
    const [ipmpData, setIpmpData] = useState<IPMPModel | null>(null);
    const [documents, setDocuments] = useState<DocumentWithPDF[]>([]);

    // Handle folder upload
    const handleFolderUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        // Convert FileList to an array
        const fileArray = Array.from(files);

        // Find the JSON file in the folder
        const jsonFile = fileArray.find(file => file.name === 'sample_json_data_file.json');
        if (!jsonFile) {
            console.error("JSON file 'sample_json_data_file.json' not found in the selected folder.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const parsedData: IPMPModel = parseIPMPModel(text);

                // Helper function to get the matching PDF URL for a Document
                const getPdfUrlForDocument = (doc: Document): string => {
                    const pdfFile = fileArray.find(file => file.name === doc.fileName);
                    if (pdfFile) {
                        return URL.createObjectURL(pdfFile);
                    }
                    return "";
                };

                const updatedDocuments: DocumentWithPDF[] = [];

                // Traverse Regulatory Certifications Documents
                parsedData.IPMP.regCertifs.forEach(regCertif => {
                    regCertif.complianceCategories.forEach(category => {
                        category.regulations.forEach(regulation => {
                            regulation.documents?.forEach(doc => {
                                const pdfUrl = getPdfUrlForDocument(doc);
                                if (pdfUrl) {
                                    updatedDocuments.push({ doc, pdfUrl });
                                }
                            });
                        });
                    });
                });

                // Traverse Supply Chain Activity Documents
                parsedData.IPMP.supplyChain.actors.forEach(actor => {
                    actor.activity.forEach(activity => {
                        activity.documents?.forEach(doc => {
                            const pdfUrl = getPdfUrlForDocument(doc);
                            if (pdfUrl) {
                                updatedDocuments.push({ doc, pdfUrl });
                            }
                        });
                    });
                });

                setIpmpData(parsedData);
                setDocuments(updatedDocuments);
                localStorage.setItem("data", JSON.stringify(parsedData));
                localStorage.setItem("documents", JSON.stringify(updatedDocuments))
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        };

        reader.onerror = () => {
            console.error('Error reading JSON file');
        };

        reader.readAsText(jsonFile);
    };

    // Function to download a PDF file
    const handleDownload = (pdfUrl: string, fileName: string) => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = fileName;
        a.click();
    };

    return (
        <div>
            {/*
        The input below allows folder selection.
        We extend the props with our custom FolderInputProps interface to allow the non-standard attribute.
      */}
            <input
                type="file"
                multiple
                onChange={handleFolderUpload}
                style={{ marginBottom: '1rem' }}
                // Type assertion to our extended interface
                {...({ webkitdirectory: "true" } as FolderInputProps)}
            />

        </div>
    );
};

export default FolderUploader;
