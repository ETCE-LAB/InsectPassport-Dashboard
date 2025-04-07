import React, { useState } from 'react';
import { Box, Tabs, Title } from '@mantine/core';
import IPMPDropzone from './ui/FileUpload';
import { Vizualisation } from './ui/Vizualisation';

function App() {
    const [activeTab, setActiveTab] = useState<string>('gallery');

    return (
        <Box p="md">
            <Title order={2} mb="md">Insect-Passport</Title>
            <Tabs value={activeTab}>
                <Tabs.List>
                    <Tabs.Tab value="gallery" onClick={() => setActiveTab("gallery")}>Upload</Tabs.Tab>
                    <Tabs.Tab value="messages" onClick={() => setActiveTab("messages")}>Visualization</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery">
                    <IPMPDropzone />
                </Tabs.Panel>

                <Tabs.Panel value="messages" >
                    {activeTab === 'messages' && (
                        // Using the activeTab value as key forces remounting each time
                        <Vizualisation key={activeTab} />
                    )}
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
}

export default App;
