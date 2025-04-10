import React, {useEffect, useState} from 'react';
import {Card, Divider, Flex, Title, Text, Image} from '@mantine/core';
import {Carousel} from "@mantine/carousel";
import example from "../util/example.png";
import {IPMPModel} from "../models/test";

const ProductPassport: React.FC = () => {

    const [impData, setImpData] = useState<null | IPMPModel>(null)

    useEffect(() => {
        const stringData = localStorage.getItem("data")
        if(stringData){
            const parsedData = JSON.parse(stringData) as IPMPModel
            setImpData(parsedData)
        }

    }, []);

    return (
        <Flex justify={"center"}>
            <Flex w={"1000px"} direction={"column"}>
                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>
                            Product Identification
                        </Title>
                        <Divider></Divider>
                        <Text>Name: {impData?.IPMP.insectProtein.insectName}</Text>
                        <Text>Batch Number: {impData?.IPMP.insectProtein.batchID}</Text>
                        <Text>Batch Size: {impData?.IPMP.insectProtein.batchSize + " g"}</Text>
                        <Text c={"red"}>Processing Status: </Text>
                        <Text c={"red"}>Manufactoring Date: </Text>
                    </Card>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Carousel withIndicators h={"260px"}>
                            <Carousel.Slide><Image src={example} ></Image></Carousel.Slide>
                            <Carousel.Slide>2</Carousel.Slide>
                            <Carousel.Slide>3</Carousel.Slide>
                            {/* ...other slides */}
                        </Carousel>
                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>
                            Product details
                        </Title>
                        <Divider></Divider>
                        <Text>Insect feed Type: {impData?.IPMP.insectProtein.specInfo.feedType}</Text>
                        <Text>Insect feed Source: {impData?.IPMP.insectProtein.specInfo.feedSource.join(", ")}</Text>
                        <Text>feed conversion ratio: {impData?.IPMP.insectProtein.specInfo.feedConversionRatio}</Text>
                        <Text>manufactoring date: {impData?.IPMP.insectProtein.specInfo.manufacturingDate}</Text>
                        <Text>expiry date: {impData?.IPMP.insectProtein.specInfo.expiryDate}</Text>
                    </Card>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>
                            Porcessing details
                        </Title>
                        <Divider></Divider>
                        <Text>Processing facility: {impData?.IPMP.qualityAssessment.procFacility.location}</Text>
                        <Text>approval number: {impData?.IPMP.qualityAssessment.procFacility.approvalNumber}</Text>
                        <Text>standart: {impData?.IPMP.qualityAssessment.procFacility.standards}</Text>
                        <Text>Processing methods:</Text>
                        {impData?.IPMP.qualityAssessment.procFacility.processingMethods.map(method => {
                            return <>
                                <Text>{method.name + " " + method.temperature + " - " + method.mealFormat}</Text>

                            </>
                        })}
                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>

                    <Card w={"1000px"}  shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>Rearing Information</Title>
                        <Divider></Divider>
                        <Flex direction={"row"} >
                            {impData?.IPMP.insectProtein.rearInfo.map(rearinfo => {
                                return <>

                                    <Flex direction={"column"} w={"50%"}>
                                        <Title order={4}>Rearing facility</Title>
                                        <Text>location: {rearinfo.rearingFacility.location}</Text>
                                        <Text>standard: {rearinfo.rearingFacility.standards}</Text>
                                        <Text>Approval number: {rearinfo.rearingFacility.approvalNumber}</Text>
                                        <Divider></Divider>
                                        <Title order={4}>Environmental Conditions</Title>
                                        <Text>humidity: {rearinfo.rearingEnvCond.humidity}</Text>
                                        <Text>ventilation: {rearinfo.rearingEnvCond.ventilation}</Text>
                                        <Text>temperature: {rearinfo.rearingEnvCond.temperature}</Text>
                                    </Flex>
                                    <Flex direction={"column"}  w={"50%"}>
                                        <Title order={4}>Safety Protocols</Title>
                                        <Text>Disease monitoring</Text>
                                        <Text>{rearinfo.diseaseMonitoring}</Text>
                                        <Divider></Divider>
                                        <Text >Biosecurity measures</Text>
                                        <Text>{rearinfo.biosecurityMeasures}</Text>
                                    </Flex>

                                </>
                            })}

                        </Flex>
                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>

                    <Card w={"1000px"} h={"300"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>Sustainability Impact</Title>
                        <Divider></Divider>
                        <Text>Carbon footbrint</Text>
                        {impData?.IPMP.SustainabilityReq.environmentalImpact.carbonFootprint}
                        <Text>Land Usage</Text>
                        {impData?.IPMP.SustainabilityReq.environmentalImpact.landUse}
                        <Text>Waste Management</Text>
                        {impData?.IPMP.SustainabilityReq.environmentalImpact.wasteManagement}
                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>
                    <Card w={"470px"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>Regulatory Compliance</Title>
                        <Divider></Divider>
                        {impData?.IPMP.regCertifs.map(reg => {
                            return <>
                                <Text>{reg.RegCertDescription}</Text>
                                {reg.complianceCategories.map(cat => {
                                    return <>
                                        <Text>{cat.complianceName}</Text>
                                    </>
                                })}
                            </>
                        })}
                    </Card>
                </Flex>
            </Flex>
        </Flex>

    );
};

export default ProductPassport;
