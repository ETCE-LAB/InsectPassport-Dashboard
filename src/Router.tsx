import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {LandingPage} from "./ui/LandingPage";
import {Vizualisation} from "./ui/Vizualisation";
import {Button, Flex, Image, Text, TextInput, Title} from "@mantine/core";
import logo from "./util/logo.png";
import FolderUploader from "./ui/testUI";
import ProductPassport from "./ui/ProductPassport";

// Define simple components for each route
const Home: React.FC = () => <div><h2>Home Page</h2><p>Welcome to the home page.</p></div>;
const About: React.FC = () => <div><h2>About Page</h2><p>Learn more about us.</p></div>;
const Contact: React.FC = () => <div><h2>Contact Page</h2><p>Get in touch with us.</p></div>;
const Dashboard: React.FC = () => <div><h2>Dashboard</h2><p>This is your dashboard.</p></div>;

// Main Router component
const AppRouter: React.FC = () => {
    return (
        <Router>
            <Flex align={"center"} p={"15px"} bg={"lightgrey"} justify={"space-between"}>
                <Flex align={"center"} gap={"15px"} >
                    <Image h={60} src={logo}></Image>
                    <Title order={1}>Digital Insect Passport - Home</Title>
                    <Title>Deployed gh pages</Title>
                </Flex>
                <Flex align={"center"} gap={"15px"}>
                    <nav>
                        <ul style={{listStyle: 'none', display: 'flex', gap: '1rem'}}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/ProductPassport">Product Passport</Link>
                            </li>
                        </ul>
                    </nav>
                    <TextInput placeholder={"search"}></TextInput>
                </Flex>

            </Flex>

            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/about" element={<Vizualisation/>}/>
                <Route path="/contact" element={<FolderUploader />}/>
                <Route path="/ProductPassport" element={<ProductPassport/>}/>
            </Routes>

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
        </Router>
    );
};

export default AppRouter;
