import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    Title,
    Text,
    Divider,
    Table, Flex, Avatar, Button
} from "@mantine/core";
import {Document, IPMPModel} from "../models/test";
import {IconFile} from "@tabler/icons-react";

/**
 * Displays an overview of quality assessment from IPMP data.
 * Assumes the IPMP data has already been stored in localStorage under "data".
 */
interface DocumentWithPDF {
    doc: Document;
    pdfUrl: string;
}
export const Quality: React.FC = () => {
    const [ipmpData, setIpmpData] = useState<IPMPModel | null>(null);
    const [documents, setDocuments] = useState<DocumentWithPDF[]>([]);

    // Retrieve data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const parsedData = JSON.parse(storedData) as IPMPModel;
            setIpmpData(parsedData);
        }
        const storedDocs = localStorage.getItem("documents");
        if (storedDocs) {
            setDocuments(JSON.parse(storedDocs) as DocumentWithPDF[]);
        }
        console.log(storedDocs)
    }, []);

    // Extract the relevant part of the data
    const qualityAssessment = ipmpData?.IPMP?.qualityAssessment;

    // If no data or no qualityAssessment available, show a fallback message
    if (!qualityAssessment) {
        return (
            <Box p="md">
                <Text>No quality assessment data found.</Text>
            </Box>
        );
    }

    const {
        assessmentID,
        assessDate,
        procFacility,
        labTestReports,
    } = qualityAssessment;

    // Function to download a PDF file
    const handleDownload = (pdfUrl: string, fileName: string) => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = fileName;
        a.click();
    };
    return (
        <Box p="md">
            <Title order={2} mb="md">
                Quality Overview
            </Title>

            {/* Assessment Details */}
            <Card shadow="sm" p="md" mb="lg">
                <Title order={3} mb="xs">
                    Assessment Details
                </Title>
                <Text size="sm">
                    <strong>Assessment ID:</strong> {assessmentID}
                </Text>
                <Text size="sm">
                    <strong>Assessment Date:</strong> {assessDate}
                </Text>
            </Card>

            {/* Lab Test Reports */}
            <Card shadow="sm" p="md">
                <Title order={3} mb="xs">
                    Lab Test Reports
                </Title>

                {labTestReports.map((report) => {
                    const {
                        testID,
                        testName,
                        testStartDate,
                        testEndDate,
                        amendment,
                        labFacility,
                        testParameters,
                    } = report;

                    return (
                        <Box key={testID} mt="md">
                            <Divider mb="md" />

                            <Text size="sm" mb="xs" w={600}>
                                {testName}
                            </Text>
                            <Text size="sm">
                                <strong>Test ID:</strong> {testID}
                            </Text>
                            <Text size="sm">
                                <strong>Test Start Date:</strong> {testStartDate}
                            </Text>
                            <Text size="sm">
                                <strong>Test End Date:</strong> {testEndDate}
                            </Text>
                            <Text size="sm">
                                <strong>Amendment:</strong> {amendment}
                            </Text>

                            <Divider my="md" />

                            {/* Lab Facility Info */}
                            <Title order={4} mb="xs">
                                Lab Facility
                            </Title>
                            <Text size="sm">
                                <strong>Lab Name:</strong> {labFacility.labName}
                            </Text>
                            <Text size="sm">
                                <strong>Lab Location:</strong> {labFacility.labLocation}
                            </Text>
                            <Text size="sm">
                                <strong>Approval Number:</strong> {labFacility.approvalNumber}
                            </Text>

                            <Divider my="md" />

                            {/* Test Parameters */}
                            <Title order={4} mb="xs">
                                Test Parameters
                            </Title>
                            <Table highlightOnHover withColumnBorders>
                                <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Parameter Name</Table.Th>
                                    <Table.Th>Method</Table.Th>
                                    <Table.Th>Result</Table.Th>
                                    <Table.Th>Unit</Table.Th>
                                </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                {testParameters.map((param, idx) => (
                                    <Table.Tr key={idx}>
                                        <Table.Td>
                                            {param.paramName ?? param.parameterName}
                                        </Table.Td>
                                        <Table.Td>
                                            {param.testingMethod ?? param.method}
                                        </Table.Td>
                                        <Table.Td>{param.result}</Table.Td>
                                        <Table.Td>{param.unit}</Table.Td>
                                    </Table.Tr>
                                ))}
                                </Table.Tbody>
                            </Table>
                            {report.documents && report.documents.length > 0 && (
                                <Box mt="sm">
                                    <Divider my="sm" />
                                    <Text fw={500} mb="sm">
                                        Documents
                                    </Text>

                                    {report.documents.map((doc) => {
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
                                                                    <a
                                                                        href={storedDoc.pdfUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        View
                                                                    </a>
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
                        </Box>
                    );
                })}
            </Card>
        </Box>
    );
};
