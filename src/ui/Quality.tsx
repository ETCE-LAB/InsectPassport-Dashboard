import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    Title,
    Text,
    Divider,
    Table
} from "@mantine/core";
import { IPMPModel } from "../models/test";

/**
 * Displays an overview of quality assessment from IPMP data.
 * Assumes the IPMP data has already been stored in localStorage under "data".
 */
export const Quality: React.FC = () => {
    const [ipmpData, setIpmpData] = useState<IPMPModel | null>(null);

    // Retrieve data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const parsedData = JSON.parse(storedData) as IPMPModel;
            setIpmpData(parsedData);
        }
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

            {/* Processing Facility */}
            <Card shadow="sm" p="md" mb="lg">
                <Title order={3} mb="xs">
                    Processing Facility
                </Title>
                <Text size="sm" mt="xs">
                    <strong>Facility ID:</strong> {procFacility.procFacilityID}
                </Text>
                <Text size="sm">
                    <strong>Location:</strong> {procFacility.location}
                </Text>
                <Text size="sm">
                    <strong>Approval Number:</strong> {procFacility.approvalNumber}
                </Text>
                <Text size="sm">
                    <strong>Standards:</strong> {procFacility.standards}
                </Text>

                <Divider my="md" />

                {/* Processing Methods */}
                <Title order={4} mb="xs">
                    Processing Methods
                </Title>
                <Table highlightOnHover withColumnBorders>
                    <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Temperature</Table.Th>
                        <Table.Th>Time</Table.Th>
                        <Table.Th>Meal Format</Table.Th>
                    </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                    {procFacility.processingMethods.map((method) => (
                        <Table.Tr key={method.procMethodID}>
                            <Table.Td>{method.name}</Table.Td>
                            <Table.Td>{method.temperature}</Table.Td>
                            <Table.Td>{method.time}</Table.Td>
                            <Table.Td>{method.mealFormat}</Table.Td>
                        </Table.Tr>
                    ))}
                    </Table.Tbody>
                </Table>
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
                        </Box>
                    );
                })}
            </Card>
        </Box>
    );
};
