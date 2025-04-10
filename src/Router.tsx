import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {LandingPage} from "./ui/LandingPage";
import {AppShell, Burger, Button, Flex, Image, NavLink, Text, TextInput, Title} from "@mantine/core";
import logo from "./util/logo.png";
import ProductPassport from "./ui/ProductPassport";
import {TempView} from "./ui/tempView";
import {SupplyChain} from "./ui/SupplyChain";
import {useDisclosure} from "@mantine/hooks";
import {IconHome2} from "@tabler/icons-react";

// Main Router component
const AppRouter: React.FC = () => {

    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60}}
        >
            <AppShell.Header>
                <Flex align={"center"} bg={"lightgrey"} justify={"space-between"}>
                    <Flex align={"center"} gap={"15px"} >
                        <Image h={50} src={logo}></Image>
                        <Title order={1}>Digital Insect Passport - Home</Title>
                    </Flex>
                    <Flex>
                        <NavLink
                            h={60}
                            href="/"
                            label="home"
                        />
                        <NavLink
                            h={60}
                            href="/ProductPassport"
                            label="ProductPassport"
                        />
                        <NavLink
                            h={60}
                            href="/raw"
                            label="raw"
                        />
                        <NavLink
                            h={60}
                            href="/SupplyChain"
                            label="SupplyChain"
                        />
                    </Flex>

                </Flex>
            </AppShell.Header>


            <AppShell.Main>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/SupplyChain" element={<SupplyChain/>}/>
                        <Route path="/raw" element={<TempView />}/>
                        <Route path="/ProductPassport" element={<ProductPassport/>}/>
                    </Routes>
                </Router>
            </AppShell.Main>


            <AppShell.Footer>
                <Flex direction={"row"} gap={"15px"} p={"15px"}>
                    <Button>About us</Button>
                    <Button>Terms of service</Button>
                    <Button>Privacy Policy</Button>
                    <Text>|</Text>
                    <Button>Twitter</Button>
                    <Button>Facebook</Button>
                    <Button>Instagram</Button>
                    <Text>Email: support@test.com</Text>
                    <Text>Phone: 0987654321</Text>
                </Flex>
            </AppShell.Footer>


        </AppShell>

    );
};

export default AppRouter;
