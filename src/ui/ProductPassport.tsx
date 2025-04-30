import React, { useEffect, useState } from 'react';
import {
    Flex,
    Title,
    Text,
    Image,
    Box,
    Paper,
    useMantineTheme,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import example from '../util/example.png';
import { IPMPModel } from '../models/test';
import {
    IconAdjustments,
    IconBuildingWarehouse, IconCheck,
    IconDroplet,
    IconLeaf,
    IconMap2,
    IconRecycle,
    IconWheat
} from "@tabler/icons-react";

const ProductPassport: React.FC = () => {
    const [impData, setImpData] = useState<IPMPModel | null>(null);
    const theme = useMantineTheme();

    useEffect(() => {
        const stringData = localStorage.getItem('data');
        if (stringData) {
            const parsedData = JSON.parse(stringData) as IPMPModel;
            setImpData(parsedData);
        }
    }, []);

    return (
        <Flex direction={"column"} p={"15px"} w={"100%"}>
            <Title order={3}>
                Product Identification
            </Title>

            <Flex direction={"row"} w={"100%"} justify={"space-between"} align={"stretch"} mb={theme.spacing.xl}>

                <Flex direction={"column"} w={"49.6%"} >
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
                        <Text fw={500}>Name:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.insectName}</Text>

                        <Text fw={500}>Batch Number:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.batchID}</Text>

                        <Text fw={500}>Batch Size:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.batchSize} g</Text>

                        <Text fw={500}>
                            Manufacturing Date:
                        </Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.specInfo.manufacturingDate}</Text>

                        <Text fw={500}>Expiry date:</Text>
                        <Text>{impData?.IPMP.insectProtein.specInfo.expiryDate}</Text>
                        {/* If you have the date, display it here */}
                    </Paper>

                </Flex>

                <Flex direction={"column"} w={"49.6%"} >
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
                        <Carousel withIndicators height={"auto"} mx="auto">
                            <Carousel.Slide>
                                <Image src={example} alt="Example" />
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <Box
                                    style={{
                                        height: 250,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: theme.colors.gray[2],
                                    }}
                                >
                                    <Text>Another slide</Text>
                                </Box>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <Box
                                    style={{
                                        height: 250,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: theme.colors.gray[2],
                                    }}
                                >
                                    <Text>Third slide</Text>
                                </Box>
                            </Carousel.Slide>
                        </Carousel>
                    </Paper>
                </Flex>
            </Flex>


            <Title order={3}>Rearing Phase</Title>
            <Flex direction="row" w="100%" justify="space-between" mb={theme.spacing.xl}>

                {/* Feed Info */}
                <Flex direction="column" w="33%">
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{ backgroundColor: theme.white }}
                    >
                        <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconWheat size={20} style={{ marginRight: 8 }} /> Feed Info
                        </Title>
                        <Text>Type: {impData?.IPMP.insectProtein.specInfo.feedType}</Text>
                        <Text>
                            Sources: {impData?.IPMP.insectProtein.specInfo.feedSource.join(', ')}
                        </Text>
                        <Text>
                            Feed Conversion Ratio:{' '}
                            {impData?.IPMP.insectProtein.specInfo.feedConversionRatio}
                        </Text>
                    </Paper>
                </Flex>

                {/* Rearing Conditions */}
                <Flex direction="column" w="33%">
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{ backgroundColor: theme.white }}
                    >
                        <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconAdjustments size={20} style={{ marginRight: 8 }} /> Rearing Conditions
                        </Title>
                        {impData?.IPMP.insectProtein.rearInfo.map((rearInfo, idx) => (
                            <div key={idx}>
                                <Text>
                                    Method: {rearInfo.rearingMethodology.join(', ')}
                                </Text>
                                <Text>
                                    Temperature: {rearInfo.rearingEnvCond.temperature}
                                </Text>
                                <Text>
                                    Humidity: {rearInfo.rearingEnvCond.humidity}
                                </Text>
                                <Text>
                                    Ventilation: {rearInfo.rearingEnvCond.ventilation}
                                </Text>
                            </div>
                        ))}
                    </Paper>
                </Flex>

                {/* Rearing Facility */}
                <Flex direction="column" w="33%">
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{ backgroundColor: theme.white }}
                    >
                        <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconBuildingWarehouse size={20} style={{ marginRight: 8 }} /> Rearing Facility
                        </Title>
                        {impData?.IPMP.insectProtein.rearInfo.map((rearInfo, idx) => (
                            <div key={idx}>
                                <Text>
                                    Location: {rearInfo.rearingFacility.location}
                                </Text>
                                <Text>
                                    Approval Number: {rearInfo.rearingFacility.approvalNumber}
                                </Text>
                                <Text>
                                    Standards: {rearInfo.rearingFacility.standards}
                                </Text>
                            </div>
                        ))}
                    </Paper>
                </Flex>

            </Flex>

            <Title order={3}>Processing phase</Title>
            <Flex direction="row" w="100%" justify="space-between" mb={theme.spacing.xl}>

                {/* Rearing Conditions */}
                <Flex direction="column" w="49.6%">
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{ backgroundColor: theme.white }}
                    >
                        <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconAdjustments size={20} style={{ marginRight: 8 }} /> Processing Info
                        </Title>
                        {impData?.IPMP.qualityAssessment.procFacility.processingMethods.map(method => {
                            return <Text>{`${method.name}: ${method.temperature}, ${method.time}`} → {`${method.mealFormat}`}</Text>
                        })}
                    </Paper>
                </Flex>

                {/* Rearing Facility */}
                <Flex direction="column" w="49.6%">
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{ backgroundColor: theme.white }}
                    >
                        <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconBuildingWarehouse size={20} style={{ marginRight: 8 }} /> Processing Facility
                        </Title>
                        <Text>Location: {impData?.IPMP.qualityAssessment.procFacility.location}</Text>
                        <Text>Approval Number: {impData?.IPMP.qualityAssessment.procFacility.approvalNumber}</Text>
                        <Text>Standart: {impData?.IPMP.qualityAssessment.procFacility.standards}</Text>
                    </Paper>
                </Flex>

            </Flex>

            <Title order={3}>Quality & Safety</Title>
            <Flex direction="row" w="100%" justify="space-between" mb={theme.spacing.xl}>

                {/* Rearing Conditions */}
                <Flex direction="column" w="100%">
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{ backgroundColor: theme.white }}
                    >
                        <Text>Assessed: {impData?.IPMP.qualityAssessment.assessDate}</Text>
                        <Text>Health Monitoring: {impData?.IPMP.insectProtein.rearInfo.map(info => {
                            return <>{info.diseaseMonitoring}</>
                        })}</Text>
                        <Text>Biosecuriuty Measures: {impData?.IPMP.insectProtein.rearInfo.map(info => {
                            return <>{info.biosecurityMeasures}</>
                        })}</Text>
                        <Text>Testing Labs: {impData?.IPMP.qualityAssessment.labTestReports.map(testReport => {
                            return <>{testReport.labFacility.labName + ", "}</>
                        })}</Text>
                        <Text>Screening: {impData?.IPMP.qualityAssessment.labTestReports.map(testReport => {
                            return <>{testReport.testName + ", "}</>
                        })}</Text>
                        <Text>Handling: {impData?.IPMP.qualityAssessment.storeHandleReq.handlingRequirement}</Text>
                        <Text>Storage: {impData?.IPMP.qualityAssessment.storeHandleReq.storageCond} {"→"} {impData?.IPMP.qualityAssessment.storeHandleReq.shelfExpirationPeriod}</Text>
                    </Paper>
                </Flex>
            </Flex>

            <Title order={3}>
                Sustainability Impact
            </Title>
            <Flex direction={"row"} w={"100%"} justify={"stretch"} mb={theme.spacing.xl}>
                <Paper
                    w={"100%"}
                    shadow="md"
                    radius="md"
                    p="md"
                    withBorder
                    style={{
                        backgroundColor: theme.white,
                    }}
                >
                    <Flex direction={"row"} justify={"space-around"} align={"center"}>
                        <Flex direction={"column"} align={"center"}>
                            <Flex direction={"row"} align={"center"}>
                                <IconLeaf size={50} color={"green"}/>
                                <Text fw={500}>Carbon Footprint</Text>
                            </Flex>
                            <Title order={5}>
                                {impData?.IPMP.SustainabilityReq.environmentalImpact.carbonFootprint}
                            </Title>
                        </Flex>

                        <Flex direction={"column"} align={"center"}>
                            <Flex direction={"row"} align={"center"}>
                                <IconDroplet color={"blue"} size={50} />
                                <Text fw={500}>Resource Use</Text>
                            </Flex>
                            <Title order={5}>
                                {impData?.IPMP.SustainabilityReq.resourceUse.waterFootprint}
                            </Title>
                        </Flex>

                        <Flex direction={"column"} align={"center"}>
                            <Flex direction={"row"} align={"center"}>
                                <IconMap2 size={50} color={"brown"}/>
                                <Text fw={500}>Land Usage</Text>
                            </Flex>

                            <Title order={5}>
                                {impData?.IPMP.SustainabilityReq.environmentalImpact.landUse}
                            </Title>
                        </Flex>

                        <Flex direction={"column"} align={"center"}>
                            <Flex direction={"row"} align={"center"}>
                                <IconRecycle color={"orange"} size={50} />
                                <Text fw={500}>Circularity</Text>
                            </Flex>
                            <Title order={5}>
                                {impData?.IPMP.SustainabilityReq.circularity.wasteReductionStrategy}
                            </Title>
                        </Flex>
                    </Flex>

                </Paper>
            </Flex>

            <Title order={3}>
                Transparency
            </Title>
            <Flex direction={"row"} w={"100%"} justify={"space-between"}>
                <Paper
                    w={"33%"}
                    shadow="md"
                    radius="md"
                    p="md"
                    withBorder
                    style={{
                        backgroundColor: theme.white,
                    }}
                >
                    <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                        <IconBuildingWarehouse size={20} style={{ marginRight: 8 }} /> Compliance
                    </Title>

                    {impData?.IPMP.regCertifs.map(cert => {
                        return <>{cert.complianceCategories.map(cat => {
                            return <Flex align={"center"} gap={"15px"}>
                                <IconCheck /> {cat.complianceName}
                            </Flex>
                        })}</>
                    })}

                </Paper>

                <Paper
                    w={"66%"}
                    shadow="md"
                    radius="md"
                    p="md"
                    withBorder
                    style={{
                        backgroundColor: theme.white,
                    }}
                >
                    <Title order={5} style={{ display: 'flex', alignItems: 'center' }}>
                        <IconBuildingWarehouse size={20} style={{ marginRight: 8 }} /> Logistics Insights
                    </Title>

                    {impData?.IPMP.supplyChain.traceLog.map(log => {
                        return <Text>{`${log.actorRole}: ${log.companyName}, ${log.location} → ${log.logistics.mode}`}</Text>
                    })}

                </Paper>
            </Flex>



        </Flex>
    );
};

export default ProductPassport;
