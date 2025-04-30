import React, { useState } from 'react';
import {
    AppShell,
    Button,
    Flex,
    Image,
    NavLink,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core';
import logo from './util/logo.png';
import { LandingPage } from './ui/LandingPage';
import ProductPassport from './ui/ProductPassport';
import { TempView } from './ui/tempView';
import { SupplyChain } from './ui/SupplyChain';
import { Regulation } from './ui/Regulation';
import { Sustainability } from './ui/Sustainability';
import { Quality } from './ui/Quality';

interface RouteItem {
    label: string;
    path: string;
}

const navItems: RouteItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Product Passport', path: '/ProductPassport' },
    { label: 'Supply Chain', path: '/SupplyChain' },
    { label: 'Regulation', path: '/regulation' },
    { label: 'Sustainability', path: '/sustainability' },
    { label: 'Quality', path: '/quality' },
    //{ label: 'Raw Data', path: '/raw' },
];

const AppRouter: React.FC = () => {
    const theme = useMantineTheme();
    const [route, setRoute] = useState<string>('/');

    const renderContent = () => {
        switch (route) {
            case '/':
                return <LandingPage />;
            case '/SupplyChain':
                return <SupplyChain />;
            case '/raw':
                return <TempView />;
            case '/ProductPassport':
                return <ProductPassport />;
            case '/regulation':
                return <Regulation />;
            case '/sustainability':
                return <Sustainability />;
            case '/quality':
                return <Quality />;
            default:
                return <LandingPage />;
        }
    };

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
        >
            <AppShell.Header>
                <Flex
                    align="center"
                    bg="lightgray"
                    justify="space-between"
                    h="100%"
                    px="md"
                >
                    <Flex align="center" gap="15px">
                        <Image height={50} src={logo} alt="Logo" />
                        <Title order={1}>Digital InsectPassport</Title>
                    </Flex>
                    <Flex gap="sm">
                        {navItems.map(({ label, path }) => (
                            <NavLink
                                key={path}
                                label={label}
                                w={"auto"}
                                onClick={() => setRoute(path)}
                                active={route === path}
                                styles={(theme) => ({
                                    root: {
                                        // draw a colored bar on the left when active
                                        borderLeft: `4px solid ${
                                            route === path
                                                ? theme.colors.blue[6]
                                                : 'transparent'
                                        }`,
                                        paddingLeft: theme.spacing.sm,
                                    },
                                    label: {
                                        color:
                                            route === path
                                                ? theme.colors.blue[6]
                                                : theme.colors.gray[7],
                                    },
                                })}
                            />
                        ))}
                    </Flex>
                </Flex>
            </AppShell.Header>

            <AppShell.Main>{renderContent()}</AppShell.Main>

            <AppShell.Footer>
                <Flex direction="row" gap="15px" p="md" justify="center">
                    <Button variant={"subtle"}>
                        <a
                            style={{
                                textDecoration: "none",
                                color: "#238BE6"
                            }}
                            href={"https://etce-lab.com/#team"}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ETCE
                        </a>
                    </Button>
                    <Button variant={"subtle"}>
                        <a
                            style={{
                                textDecoration: "none",
                                color: "#238BE6"
                            }}
                            href={"https://github.com/ETCE-LAB/InsectPassport-Dashboard"}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                    </Button>
                </Flex>
            </AppShell.Footer>
        </AppShell>
    );
};

export default AppRouter;
