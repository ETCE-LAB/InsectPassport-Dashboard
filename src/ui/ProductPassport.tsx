import React from 'react';
import {Card, Divider, Flex, Title, Text, Image} from '@mantine/core';
import {Carousel} from "@mantine/carousel";
import example from "../util/example.png"
import landingpage1 from "../util/landingpage1.png";

const ProductPassport: React.FC = () => {

    return (
        <Flex justify={"center"}>
            <Flex w={"1000px"} direction={"column"}>
                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={3}>
                            Product Identification
                        </Title>
                        <Divider></Divider>
                        <Text>Name: </Text>
                        <Text>Batch Number: </Text>
                        <Text>Processing Status: </Text>
                        <Text>Manufactoring Date: </Text>
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

                    </Card>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>

                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>

                    <Card w={"1000px"} h={"500px"} shadow="sm" padding="lg" radius="md" withBorder>

                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>

                    <Card w={"1000px"} h={"300"} shadow="sm" padding="lg" radius="md" withBorder>

                    </Card>
                </Flex>

                <Flex w={"1000px"} gap={"60px"} mt={"60px"}>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>

                    </Card>
                    <Card w={"470px"} h={"300px"} shadow="sm" padding="lg" radius="md" withBorder>

                    </Card>
                </Flex>
            </Flex>
        </Flex>

    );
};

export default ProductPassport;
