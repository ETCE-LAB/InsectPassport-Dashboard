import React, { useEffect, useState } from 'react';
import {
    Flex,
    Title,
    Text,
    Image,
    Divider,
    Box,
    Paper,
    Container,
    Grid,
    useMantineTheme,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import example from '../util/example.png';
import { IPMPModel } from '../models/test';
import {IconLeaf, IconMap2, IconRecycle} from "@tabler/icons-react";

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
            <Title order={2} mb="lg">
                Product Passport Dashboard
            </Title>

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
                        <Title order={4} mb="sm">
                            Product Identification
                        </Title>
                        <Divider mb="sm" />
                        <Text fw={500}>Name:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.insectName}</Text>

                        <Text fw={500}>Batch Number:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.batchID}</Text>

                        <Text fw={500}>Batch Size:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.batchSize} g</Text>

                        <Text fw={500} color="red">
                            Processing Status:
                        </Text>
                        {/* If you have the status, display it here */}
                        <Text fw={500} color="red">
                            Manufacturing Date:
                        </Text>
                        {/* If you have the date, display it here */}
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
                        <Title order={4} mb="sm">
                            Product Details
                        </Title>
                        <Divider mb="sm" />
                        <Text fw={500}>Insect feed Type:</Text>
                        <Text mb="xs">{impData?.IPMP.insectProtein.specInfo.feedType}</Text>

                        <Text fw={500}>Insect feed Source:</Text>
                        <Text mb="xs">
                            {impData?.IPMP.insectProtein.specInfo.feedSource.join(', ')}
                        </Text>

                        <Text fw={500}>Feed conversion ratio:</Text>
                        <Text mb="xs">
                            {impData?.IPMP.insectProtein.specInfo.feedConversionRatio}
                        </Text>

                        <Text fw={500}>Manufacturing date:</Text>
                        <Text mb="xs">
                            {impData?.IPMP.insectProtein.specInfo.manufacturingDate}
                        </Text>

                        <Text fw={500}>Expiry date:</Text>
                        <Text>{impData?.IPMP.insectProtein.specInfo.expiryDate}</Text>
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
                        <Carousel withIndicators height={250} mx="auto">
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

            <Flex direction={"row"} w={"100%"} justify={"stretch"}>
                <Paper
                    w={"100%"}
                    shadow="md"
                    radius="md"
                    p="md"
                    withBorder
                    style={{
                        marginTop: theme.spacing.xl,
                        backgroundColor: theme.white,
                    }}
                >
                    <Title order={4} mb="sm">
                        Sustainability Impact
                    </Title>
                    <Divider mb="sm" />
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
                                <Text fw={500}>Waste Management</Text>
                            </Flex>
                            <Title order={5}>
                                {impData?.IPMP.SustainabilityReq.environmentalImpact.wasteManagement}
                            </Title>
                        </Flex>
                    </Flex>

                </Paper>
            </Flex>

            <Flex direction={"row"} w={"100%"} justify={"space-between"} mt={theme.spacing.xl}>

                <Flex direction={"column"} w={"33%"}>
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{
                            backgroundColor: theme.white,
                        }}
                    >
                        <Title order={4} mb="sm">
                            Processing Details
                        </Title>
                        <Divider mb="sm" />
                        <Text fw={500}>Processing facility:</Text>
                        <Text mb="xs">
                            {impData?.IPMP.qualityAssessment.procFacility.location}
                        </Text>

                        <Text fw={500}>Approval number:</Text>
                        <Text mb="xs">
                            {impData?.IPMP.qualityAssessment.procFacility.approvalNumber}
                        </Text>

                        <Text fw={500}>Standard:</Text>
                        <Text mb="xs">
                            {impData?.IPMP.qualityAssessment.procFacility.standards}
                        </Text>

                        <Text fw={500} mb="xs">
                            Processing methods:
                        </Text>
                        {impData?.IPMP.qualityAssessment.procFacility.processingMethods.map(
                            (method, index) => (
                                <Text key={index} mb="xs">
                                    {method.name} | {method.temperature} - {method.mealFormat}
                                </Text>
                            )
                        )}
                    </Paper>
                </Flex>

                <Flex direction={"column"} w={"33%"}>
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{
                            backgroundColor: theme.white,
                        }}
                    >
                        <Title order={4} mb="sm">
                            Rearing Information
                        </Title>
                        <Divider mb="sm" />

                        {impData?.IPMP.insectProtein.rearInfo.map((rearinfo, index) => (
                            <Grid gutter="xl" mt="md" key={index}>
                                <Grid.Col>
                                    <Title order={5} mb="xs">
                                        Rearing Facility
                                    </Title>
                                    <Text fw={500}>Location:</Text>
                                    <Text mb="xs">{rearinfo.rearingFacility.location}</Text>

                                    <Text fw={500}>Standard:</Text>
                                    <Text mb="xs">{rearinfo.rearingFacility.standards}</Text>

                                    <Text fw={500}>Approval number:</Text>
                                    <Text mb="xs">{rearinfo.rearingFacility.approvalNumber}</Text>

                                    <Divider my="md" />

                                    <Title order={5} mb="xs">
                                        Environmental Conditions
                                    </Title>
                                    <Text fw={500}>Humidity:</Text>
                                    <Text mb="xs">{rearinfo.rearingEnvCond.humidity}</Text>

                                    <Text fw={500}>Ventilation:</Text>
                                    <Text mb="xs">{rearinfo.rearingEnvCond.ventilation}</Text>

                                    <Text fw={500}>Temperature:</Text>
                                    <Text>{rearinfo.rearingEnvCond.temperature}</Text>
                                </Grid.Col>

                                <Grid.Col >
                                    <Title order={5} mb="xs">
                                        Safety Protocols
                                    </Title>
                                    <Text fw={500}>Disease Monitoring:</Text>
                                    <Text mb="xs">{rearinfo.diseaseMonitoring}</Text>

                                    <Divider my="md" />

                                    <Text fw={500}>Biosecurity Measures:</Text>
                                    <Text>{rearinfo.biosecurityMeasures}</Text>
                                </Grid.Col>
                            </Grid>
                        ))}
                    </Paper>
                </Flex>

                <Flex direction={"column"} w={"33%"}>
                    <Paper
                        shadow="md"
                        radius="md"
                        p="md"
                        withBorder
                        style={{
                            backgroundColor: theme.white,
                        }}
                    >
                        <Title order={4} mb="sm">
                            Regulatory Compliance
                        </Title>
                        <Divider mb="sm" />

                        {impData?.IPMP.regCertifs.map((reg, index) => (
                            <Box key={index} mb="md">
                                <Text fw={500}>{reg.RegCertDescription}</Text>
                                {reg.complianceCategories.map((cat, catIndex) => (
                                    <Text key={catIndex}>{cat.complianceName}</Text>
                                ))}
                            </Box>
                        ))}
                    </Paper>
                </Flex>
            </Flex>

        </Flex>
    );
};

export default ProductPassport;
