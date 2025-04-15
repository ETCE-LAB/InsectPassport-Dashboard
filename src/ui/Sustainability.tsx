import React, { useEffect, useState } from "react";
import {
    Title,
    Text,
    Box,
    Card,
    Divider, Flex, Paper, Image, useMantineTheme,
} from "@mantine/core";
import { IPMPModel } from "../models/test";
import {Carousel} from "@mantine/carousel";
import example from "../util/example.png";

/**
 * Displays the sustainability report from IPMP data.
 * Assumes IPMP data has already been stored in localStorage under key "data".
 */
export const Sustainability: React.FC = () => {
    const [impData, setImpData] = useState<IPMPModel | null>(null);
    const theme = useMantineTheme();

    // Retrieve data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const parsedData = JSON.parse(storedData) as IPMPModel;
            setImpData(parsedData);
        }
    }, []);

    // If data or SustainabilityReq is missing, render a fallback message
    if (!impData?.IPMP?.SustainabilityReq) {
        return (
            <Box p="md">
                <Text>No sustainability data available</Text>
            </Box>
        );
    }

    const {
        susID,
        susDescription,
        resourceUse,
        environmentalImpact,
        circularity,
        socialAndEconomicImpact,
        SustReport,
    } = impData.IPMP.SustainabilityReq;

    return (
        <Flex direction={"column"} p={"15px"} w={"100%"}>
            <Flex direction={"row"} gap={"15px"} align={"center"} mb="lg">
                <Title order={2}>
                    Sustainability Report
                </Title>
                <Text>{SustReport.summary}</Text>
            </Flex>


            <Flex direction={"row"} w={"100%"} justify={"space-between"} align={"stretch"}>

                <Flex direction={"column"} w={"33%"} >
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        h={"100%"}
                        withBorder
                        style={{
                            backgroundColor: theme.white,
                        }}
                    >
                        {/* Resource Use */}
                        <Title order={4} mb="xs">
                            Resource Use
                        </Title>
                        <Text size="sm">
                            <strong>Water Usage:</strong> {resourceUse.waterUsage}
                        </Text>
                        <Text size="sm">
                            <strong>Water Footprint:</strong> {resourceUse.waterFootprint}
                        </Text>
                        <Text size="sm">
                            <strong>Energy Use:</strong> {resourceUse.energyUse}
                        </Text>

                        <Divider my="sm" />
                    </Paper>

                </Flex>

                <Flex direction={"column"} w={"33%"} >
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        h={"100%"}
                        withBorder
                        style={{
                            backgroundColor: theme.white,
                        }}
                    >
                        {/* Environmental Impact */}
                        <Title order={4} mb="xs">
                            Environmental Impact
                        </Title>
                        <Text size="sm">
                            <strong>Carbon Footprint:</strong> {environmentalImpact.carbonFootprint}
                        </Text>
                        <Text size="sm">
                            <strong>Land Use:</strong> {environmentalImpact.landUse}
                        </Text>
                        <Text size="sm">
                            <strong>Waste Management:</strong> {environmentalImpact.wasteManagement}
                        </Text>
                    </Paper>
                </Flex>

                <Flex direction={"column"} w={"33%"} >
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        h={"100%"}
                        withBorder
                        style={{
                            backgroundColor: theme.white,
                        }}
                    >
                        {/* Circularity */}
                        <Title order={4} mb="xs">
                            Circularity
                        </Title>
                        <Text size="sm">
                            <strong>Waste Reduction Strategy:</strong>{" "}
                            {circularity.wasteReductionStrategy}
                        </Text>
                        <Text size="sm">
                            <strong>Contribution to Circular Economy:</strong>{" "}
                            {circularity.contributionCE}
                        </Text>
                    </Paper>
                </Flex>
            </Flex>

            <Paper
                mt={"xl"}
                shadow="md"
                radius="md"
                p="md"
                h={"100%"}
                withBorder
                style={{
                    backgroundColor: theme.white,
                }}>

                {/* Social and Economic Impact */}
                <Title order={4} mb="xs">
                    Social and Economic Impact
                </Title>
                <Text size="sm">
                    <strong>Labour Standards:</strong>{" "}
                    {socialAndEconomicImpact.labourStandards}
                </Text>
                <Text size="sm">
                    <strong>Cost Savings:</strong> {socialAndEconomicImpact.costSavings}
                </Text>
                <Text size="sm">
                    <strong>Human Health Monitoring:</strong>{" "}
                    {socialAndEconomicImpact.humanHealthMonitoring}
                </Text>

            </Paper>
        </Flex>
    );
};
