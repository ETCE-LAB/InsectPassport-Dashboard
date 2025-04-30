import React, { useEffect, useState } from "react";
import { IPMPModel, Document } from "../models/test";
import {
    Box,
    Title,
    Card,
    Divider,
    Text,
    Flex,
    Button,
    Avatar
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

// Matches your local-storage structure
interface DocumentWithPDF {
    doc: Document;
    pdfUrl: string;
}

export const Regulation: React.FC = () => {
    const [impData, setImpData] = useState<IPMPModel | null>(null);
    const [documents, setDocuments] = useState<DocumentWithPDF[]>([]);

    // Load data and documents from localStorage
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        const storedDocs = localStorage.getItem("documents");

        if (storedData) {
            setImpData(JSON.parse(storedData) as IPMPModel);
        }
        if (storedDocs) {
            setDocuments(JSON.parse(storedDocs) as DocumentWithPDF[]);
        }
    }, []);

    // Function to download a PDF file
    const handleDownload = (pdfUrl: string, fileName: string) => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = fileName;
        a.click();
    };

    return (
        <Box p="15px">
            <Title order={3}>Regulatory Certifications</Title>
            <Divider mb="md" />

            {/* If there's no data, show a fallback message */}
            {!impData?.IPMP?.regCertifs?.length && (
                <Text>No regulatory certification data found.</Text>
            )}

            {/* Loop through each RegCert */}
            {impData?.IPMP?.regCertifs.map((regCert) => (
                <Card key={regCert.RegCertID} shadow="sm" padding="lg" radius="md" withBorder mb="xl">
                    <Title order={4}>{regCert.RegCertDescription}</Title>
                    <Divider my="md" />

                    {/* Loop through each Compliance Category */}
                    {regCert.complianceCategories.map((category) => (
                        <Box key={category.complianceID} mb="md">
                            <Title order={5}>{category.complianceName}</Title>
                            <Text size="sm" mb="sm">
                                {category.complianceDescription}
                            </Text>

                            {/* Loop through each Regulation */}
                            {category.regulations.map((regulation) => (
                                <Card
                                    key={regulation.regulationID}
                                    shadow="sm"
                                    padding="md"
                                    radius="md"
                                    withBorder
                                    mb="md"
                                    ml="md"
                                >
                                    <Title order={5} mb="xs">
                                        {regulation.regulationName} ({regulation.regulationIssuer})
                                    </Title>
                                    <Text size="sm">
                                        Compliance Date: {regulation.complianceDate}
                                    </Text>

                                    {/* Show any Regulatory Specificities */}
                                    {regulation.regulatorySpecificities?.map((specificity, idx) => (
                                        <Box key={idx} mt="sm">
                                            <Text fw={500} size="sm">
                                                Requirement: {specificity.requirement ?? "N/A"}
                                            </Text>
                                            <Text size="sm">
                                                Details: {specificity.details ?? "N/A"}
                                            </Text>
                                        </Box>
                                    ))}

                                    {/* Show matching documents if any */}
                                    {regulation.documents && regulation.documents.length > 0 && (
                                        <Box mt="sm">
                                            <Divider my="sm" />
                                            <Text fw={500} mb="sm">
                                                Documents
                                            </Text>

                                            {regulation.documents.map((doc) => {
                                                // For each doc needed by the regulation, check in local "documents"
                                                return (
                                                    <React.Fragment key={doc.documentID}>
                                                        {documents.map((storedDoc) => {
                                                            if (doc.documentID === storedDoc.doc.documentID) {
                                                                return (
                                                                    <Flex
                                                                        key={storedDoc.doc.documentID}
                                                                        direction="row"
                                                                        align="center"
                                                                        justify="space-between"
                                                                        mb="sm"
                                                                    >
                                                                        <Flex align="center" gap="15px">
                                                                            <Avatar size="lg" radius="sm" variant="light">
                                                                                <IconFile size={24} />
                                                                            </Avatar>
                                                                            <Text size="sm">{storedDoc.doc.fileName}</Text>
                                                                        </Flex>
                                                                        <Flex align="center" gap="15px">
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    handleDownload(storedDoc.pdfUrl, storedDoc.doc.fileName)
                                                                                }
                                                                            >
                                                                                Download
                                                                            </Button>
                                                                            <Button>
                                                                                <a
                                                                                    style={{
                                                                                        color: "white",
                                                                                        textDecoration: "none"
                                                                                    }}
                                                                                    href={storedDoc.pdfUrl}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    View
                                                                                </a>
                                                                            </Button>

                                                                        </Flex>
                                                                    </Flex>
                                                                );
                                                            }
                                                            // If not a match, return null
                                                            return null;
                                                        })}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Box>
                                    )}
                                </Card>
                            ))}
                        </Box>
                    ))}
                </Card>
            ))}
        </Box>
    );
};
