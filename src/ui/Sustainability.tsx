import React, {useEffect, useRef, useState} from "react";
import {
    Title,
    Text,
    Box,
    Card,
    Divider, Flex, Paper, Image, useMantineTheme, Badge, Button,
} from "@mantine/core";
import { IPMPModel } from "../models/test";
import {Carousel} from "@mantine/carousel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Displays the sustainability report from IPMP data.
 * Assumes IPMP data has already been stored in localStorage under key "data".
 */
export const Sustainability: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

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

    const handleDownload = async () => {
        if (!contentRef.current) return;
        const el = contentRef.current;

        // measure the full size of your two-column layout

        const width  = el.scrollWidth;
        const height = el.scrollHeight;

        console.log(width)
        console.log(height)
        // clone it into a temporary off-screen container
        const clonedEl = el.cloneNode(true) as HTMLElement;
        Object.assign(clonedEl.style, {
            position: 'absolute',
            top: '-9999px',
            left: '0',
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'visible',
        });
        document.body.appendChild(clonedEl);

        // snapshot the clone
        const canvas = await html2canvas(clonedEl, {
            scale: 2,
            useCORS: true,
            width,
            height,
            windowWidth: width,
            windowHeight: height,
        });
        document.body.removeChild(clonedEl);

        // create a PDF exactly matching the canvas size
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('sustainability-report.pdf');
    };

    return (
        <Flex direction={"column"} align={"center"}>
            <Button onClick={handleDownload} style={{marginTop: 16}} w={"auto"}>
                Download as PDF
            </Button>
            <Flex direction={"column"} p={"15px"} w={"875"} ref={contentRef}>

                <Flex direction={"row"} gap={"15px"} align={"center"} mb="lg">
                    <Title order={2}>
                        Sustainability Report
                    </Title>
                    <Text>{SustReport.summary}</Text>
                </Flex>

                <Flex direction={"row"} gap={"15px"} mb={"15px"}>
                    <Flex direction={"column"} w={"40%"}>
                        <Paper shadow="md"
                               radius="md"
                               p="md"
                               mb={"15px"}
                               h={"100%"}
                               withBorder
                               style={{
                                   backgroundColor: theme.white,
                               }}>
                            <Text>{`Product: ${impData.IPMP.insectProtein.insectName} - ${impData.IPMP.insectProtein.batchID}`}</Text>
                            <Flex direction={"row"} align={"center"} gap={"15px"} bd={"1px solid red"}>
                                <Text>Overall impact score</Text>
                                <Badge color={"green"}>Low Impact</Badge>
                            </Flex>
                            <Text>Key Achievements</Text>
                        </Paper>

                        <Title order={3}>Circularity</Title>
                        <Paper shadow="md"
                               radius="md"
                               p="md"
                               h={"100%"}
                               withBorder

                               mb={"15px"}
                               style={{
                                   backgroundColor: theme.white,
                               }}>
                            <Title order={4}>Waste Reduction Strategy</Title>
                            {impData.IPMP.SustainabilityReq.circularity.wasteReductionStrategy}
                            <Divider></Divider>
                            <Title order={4}>Circular Economy Contribution</Title>
                            {impData.IPMP.SustainabilityReq.circularity.contributionCE}
                        </Paper>

                        <Title order={3}>Socio-economic Impact</Title>
                        <Paper shadow="md"
                               radius="md"
                               p="md"
                               h={"100%"}
                               withBorder
                               mb={"15px"}
                               style={{
                                   backgroundColor: theme.white,
                               }}>
                            <Title order={4}>Labour Standards:</Title>
                            {impData.IPMP.SustainabilityReq.socialAndEconomicImpact.labourStandards}
                            <Title order={4}>Savings:</Title>
                            {impData.IPMP.SustainabilityReq.socialAndEconomicImpact.costSavings}
                            <Title order={4}>Health Safety:</Title>
                            {impData.IPMP.SustainabilityReq.socialAndEconomicImpact.humanHealthMonitoring}
                            <Text></Text>

                        </Paper>
                    </Flex>

                    <Flex direction={"column"} w={"60%"} mb={"15px"}>
                        <Title order={3}>Lifecycle Assesment report</Title>
                        <Paper shadow="md"
                               radius="md"
                               p="md"
                               h={"100%"}
                               withBorder
                               style={{
                                   backgroundColor: theme.white,
                               }}>
                            <Title order={4}>Goal</Title>
                            <Text bd={"1px solid red"}>Assess the environmental impact of 1 Kg of insect meal imported from
                                India</Text>
                            <Title order={4}>Scope</Title>
                            <Text bd={"1px solid red"}>The system boundaries of this analysis includes rearing,
                                post-composting, and drying.</Text>
                            <Text>System Boundaries:</Text>
                            <Flex direction={"row"} gap={"15px"}>
                                <Title order={5}>→ </Title>
                                <Flex direction={"column"}>
                                    <Title order={5}>System:</Title>
                                    <Text bd={"1px solid red"}>This system includes the production chain of BSF protein,
                                        from feed and raw material sourcing, insect rearing and production. to the final
                                        transportation of BSF products to distribution warehouses (BSF Cycle).</Text>
                                </Flex>
                            </Flex>
                            <Flex direction={"row"} gap={"15px"}>
                                <Title order={5}>→</Title>
                                <Flex direction={"column"}>
                                    <Title order={5}>Geographical Boundary:</Title>
                                    <Text bd={"1px solid red"}>The analysis compares BSF production in Germany and key
                                        production regions in Asia (China), including the associated transportation impact
                                        on the BSF Cycle warehouse.</Text>
                                </Flex>
                            </Flex>

                            <Flex direction={"row"} gap={"15px"}>
                                <Title order={5}>→</Title>
                                <Flex direction={"column"}>
                                    <Title order={5}>Time Boundary:</Title>
                                    <Text bd={"1px solid red"}>Production data reflect operations between 2023 and
                                        2025.</Text>
                                </Flex>
                            </Flex>

                            <Title order={4}>Functional Unit</Title>
                            <Text bd={"1px solid red"}>The Functional Unit is defined as 1 kilogram of Black Soldier Fly
                                (BSF) Product. This standardized unit enables more accurate comparison of the environmental
                                impact of BSF protein production across different protein sources and production
                                locations.</Text>
                            <Title order={4}>Impact Categories</Title>
                            <Text bd={"1px solid red"}>Climate Impact, Water Usage, Energy Consumption</Text>
                        </Paper>
                    </Flex>
                </Flex>
                <Title order={3}>Key LCA Stages</Title>
                <Flex direction={"row"} w={"100%"}>
                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           h={"100%"}
                           withBorder
                           w={"100%"}
                           style={{
                               backgroundColor: theme.white,
                           }}>
                        <Title order={4}>1. Feed and Raw Material Sourcing</Title>
                        <Text  bd={"1px solid red"}>The first stage of the LCA examines the sourcing of feedstock materials, including grains, agricultural by-products, or organic waste streams. It considers emissions and resource use related to crop cultivation, land use, and transportation</Text>
                        <Title order={4}>2. Insect Farm (Rearing + Production)</Title>
                        <Text bd={"1px solid red"}>During rearing, Black Soldier Fly larvae are grown in climate-controlled environments providing warm, humid conditions optimal for their growth. Energy use for climate control for insect rearing and drying in the post-processing process are key contributors to environmental impact.</Text>
                        <Title order={4}>3. Transportation to the distributor (BSF Cycle)</Title>
                        <Text bd={"1px solid red"}>This stage includes the environmental impact of transporting the finished BSF protein products from production sites (DE or CHN) to BSF Cycle distribution warehouses, factoring in both local and international logistics</Text>
                    </Paper>
                </Flex>

            </Flex>
        </Flex>

    );
};
