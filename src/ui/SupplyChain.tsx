import React, {useEffect, useState} from "react";
import {Document, IPMPModel} from "../models/test";
import {Timeline, Text, Title, Divider, Flex, Card, Stack, Badge, Button, Avatar, Box} from "@mantine/core";
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';
import {IconFile} from "@tabler/icons-react";
import {IconShip, IconTruck} from "@tabler/icons-react";

interface DocumentWithPDF {
    doc: Document;
    pdfUrl: string;
}

export const SupplyChain = () => {

    const [impData, setImpData] = useState<null | IPMPModel>(null)
    const [documents, setDocuments] = useState<DocumentWithPDF[]>([]);

    useEffect(() => {
        const stringData = localStorage.getItem("data")
        if(stringData){
            const parsedData = JSON.parse(stringData) as IPMPModel
            setImpData(parsedData)
        }

        const stringDocuments = localStorage.getItem("documents")
        if(stringDocuments){
            const parsedDocuments = JSON.parse(stringDocuments) as DocumentWithPDF[]
            console.log(parsedDocuments)
            setDocuments(parsedDocuments)
        }


    }, []);

    // Function to download a PDF file
    const handleDownload = (pdfUrl: string, fileName: string) => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = fileName;
        a.click();
    };

    return <Box p={"15px"}>
        <Title order={3}>Supplychain</Title>
        <Divider></Divider>
        <Text>Id: {impData?.IPMP.supplyChain.SupplyChainID}</Text>
        <Text>{impData?.IPMP.supplyChain.description}</Text>
        <Flex direction={"row"} gap={"30px"} mt={"30px"}>
            <Flex direction={"column"} w={"50%"} gap={"15px"}>
                <Title order={3}>Actors</Title>
                {impData?.IPMP.supplyChain.actors.map(actor => {
                    return <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={4}>{actor.name}</Title>
                        <Divider mb={"15px"}></Divider>
                        <Flex wrap={"wrap"} gap={"15px"}>
                            <Flex direction={"column"} align={"flex-start"}>
                                <Badge color={"lightgrey"} m={0}>
                                    Contact
                                </Badge>
                                <Text  mt={0}>{actor.contact}</Text>
                            </Flex>
                            <Flex direction={"column"} align={"flex-start"}>
                                <Badge color={"lightgrey"} m={0}>
                                    location
                                </Badge>
                                <Text  mt={0}>{actor.location}</Text>
                            </Flex>
                        </Flex>

                        <Title order={5}  >Activities</Title>
                        {actor.activity.map( act => {
                            return <>
                                <Text>type: {act.type}</Text>
                                <Text>performedBy: {act.performedBy}</Text>
                                <Text>date: {act.timestamp}</Text>
                                {act.documents && <Text>Documents:</Text>}
                                {act.documents?.map(doc => {

                                    return documents.map(doc2 => {
                                        return <>
                                        {doc.documentID === doc2.doc.documentID && <>
                                            <Flex direction={"row"} align={"center"} justify={"space-between"}>
                                                <Flex align={"center"} gap={"15px"}>
                                                    <Avatar size="lg" radius="sm" variant="light">
                                                        <IconFile size={24}/>
                                                    </Avatar>
                                                    <Text>{doc2.doc.fileName}</Text>
                                                </Flex>
                                                <Flex align={"center"} gap={"15px"}>
                                                    <Button onClick={() => handleDownload(doc2.pdfUrl, doc2.doc.fileName)}>
                                                        Download
                                                    </Button>
                                                    <a href={doc2.pdfUrl} target="_blank" rel="noopener noreferrer">
                                                        View
                                                    </a>
                                                </Flex>

                                            </Flex>


                                        </>}

                                        </>

                                    })
                                })}

                            </>
                        })}
                    </Card>
                })}
            </Flex>
            <Flex direction={"column"} w={"50%"}>
                <Title order={3} mb={"15px"}>Tracelog</Title>
                <Timeline active={impData?.IPMP.supplyChain.traceLog.length} bulletSize={50} lineWidth={2}>
                    {impData?.IPMP.supplyChain.traceLog.map((log) => {
                        // Choose an appropriate bullet icon based on the logistics mode.
                        const bulletIcon =
                            log.logistics.mode === 'Sea Freight' ? (
                                <IconShip size={25} />
                            ) : log.logistics.mode === 'Truck' ? (
                                <IconTruck size={25} />
                            ) : (
                                <IconTruck size={25} />
                            );

                        return (
                            <Timeline.Item
                                key={log.traceID}
                                bullet={bulletIcon}
                                title={`${log.actorRole} - ${log.companyName}`}
                            >
                                <Text c="dimmed" size="sm">
                                    {log.location}
                                </Text>
                                <Text size="xs" mt={4}>
                                    Departure: {log.logistics.departureDate} from {log.logistics.departureLocation}
                                </Text>
                                <Text size="xs">
                                    Arrival: {log.logistics.arrivalDate} at {log.logistics.arrivalLocation}
                                </Text>
                                <Text size="xs" mt={4}>
                                    Temperature: {log.logistics.temperatureCond}
                                </Text>
                            </Timeline.Item>
                        );
                    })}
                </Timeline>
            </Flex>
        </Flex>


    </Box>
}