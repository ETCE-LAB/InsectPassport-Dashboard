import React, { useState } from 'react';
import { AppShell, Button, Flex, Image, NavLink, Text, Title } from "@mantine/core";
import { LandingPage } from "./ui/LandingPage";
import ProductPassport from "./ui/ProductPassport";
import { TempView } from "./ui/tempView";
import { SupplyChain } from "./ui/SupplyChain";
import { useDisclosure } from "@mantine/hooks";
import logo from "./util/logo.png";
import {Regulation} from "./ui/Regulation";
import {Sustainability} from "./ui/Sustainability";
import {Quality} from "./ui/Quality";

// Main component with internal state based routing
const AppRouter: React.FC = () => {
    // Retain the disclosure for potential UI interactions.
    const [opened, { toggle }] = useDisclosure();

    // Internal state to manage the current route.
    const [route, setRoute] = useState<string>("/");

    // Function to decide which component to render based on the current route.
    const renderContent = () => {
        switch (route) {
            case "/":
                return <LandingPage />;
            case "/SupplyChain":
                return <SupplyChain />;
            case "/raw":
                return <TempView />;
            case "/ProductPassport":
                return <ProductPassport />;
            case "/regulation":
                return <Regulation />;
            case "/sustainability":
                return <Sustainability />;
            case "/quality":
                return <Quality />;
            default:
                return <LandingPage />;
        }
    };

    return (
        <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
            <AppShell.Header>
                <Flex align="center" bg="lightgrey" justify="space-between" h={"100%"}>
                    <Flex align="center" gap="15px">
                        <Image height={50} src={logo} alt="Logo" />
                        <Title order={1}>Digital Insect Passport - Home</Title>
                    </Flex>
                    <Flex gap="10px">
                        {/* Using the onClick prop to update the route state */}
                        <NavLink label="Home" onClick={() => setRoute("/")} />
                        <NavLink label="ProductPassport" onClick={() => setRoute("/ProductPassport")} />
                        <NavLink label="SupplyChain" onClick={() => setRoute("/SupplyChain")} />
                        <NavLink label="regulation" onClick={() => setRoute("/regulation")} />
                        <NavLink label="sustainability" onClick={() => setRoute("/sustainability")} />
                        <NavLink label="quality" onClick={() => setRoute("/quality")} />
                        <NavLink label="raw" onClick={() => setRoute("/raw")} />
                    </Flex>
                </Flex>
            </AppShell.Header>

            <AppShell.Main>
                {renderContent()}
            </AppShell.Main>

            <AppShell.Footer>
                <Flex direction="row" gap="15px" p="15px">
                    <Button variant={"subtle"}>About us</Button>
                    <Button variant={"subtle"}>Terms of service</Button>
                    <Button variant={"subtle"}>Privacy Policy</Button>
                    <Text>|</Text>
                    <Button variant={"subtle"}>Twitter</Button>
                    <Button variant={"subtle"}>Facebook</Button>
                    <Button variant={"subtle"}>Instagram</Button>
                    <Text>Email: support@test.com</Text>
                    <Text>Phone: 0987654321</Text>
                </Flex>
            </AppShell.Footer>
        </AppShell>
    );
};

export default AppRouter;
