import React, {useEffect, useRef, useState} from "react";
import {
    Title,
    Text,
    Box,
    Card,
    Divider, Flex, Paper, Image, useMantineTheme, Badge, Button, Table,
} from "@mantine/core";
import { IPMP } from "../models/test";
import {Carousel} from "@mantine/carousel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {BarChart, PieChart} from '@mantine/charts';
import {
    Icon2fa,
    IconBug,
    IconCloudFog,
    IconDroplet, IconMeat,
    IconPaw,
    IconPlant,
    IconPlant2,
    IconTruck
} from "@tabler/icons-react";

// Pick your own Mantine colors or custom HEX values if you like!
const CATEGORY_COLORS: Record<string, string> = {
    "Carbon Footprint": "#1971C2", // Mantine blue[7]
    "Ecosystem": "#2B8A3E",        // Mantine green[7]
    "Human Health": "#F08C00",     // Mantine yellow[7]
    "Resources": "#A61E4D",        // Mantine pink[7]
};

const PIE_SLICE_COLORS: Record<string, string> = {
    "Rearing": "#43A047",        // blue
    "Production": "#FB8C00",     // green
    "Transportation": "#1E88E5", // orange
};


// Compact MetricCell with icon color/size
const MetricCell = ({
                        icon: Icon,
                        iconColor,
                        iconSize = 28,
                        label,
                        value,
                    }: {
    icon: React.ElementType;
    iconColor?: string;
    iconSize?: number;
    label: string;
    value?: string;
}) => (
    <Box
        display="flex"
        style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}
    >
        <Icon size={iconSize} color={iconColor} />
        <Text size="sm" fw={500} mt={4} style={{ lineHeight: 1.1 }}>
            {label}
        </Text>
        {value && (
            <Text size="sm" c="dimmed" style={{ marginTop: 2 }}>
                {value}
            </Text>
        )}
    </Box>
);

export function InvisibleMetricsTable() {
    const theme = useMantineTheme();

    return (
        <Table
            horizontalSpacing={4}
            verticalSpacing={2}
            style={{
                borderCollapse: "collapse",
                width: "100%",
                background: "none",
            }}
            withColumnBorders={false}
            withRowBorders={false}
            highlightOnHover={false}
        >
            <Table.Thead>
                <Table.Tr style={{ border: "none" }}>
                    <Table.Th style={{ background: "none", border: "none" }} />
                    <Table.Th style={{ background: "none", border: "none", textAlign: "center", borderLeft: "1px solid black" }}>
                        <Text fw={700}>GHG Emission</Text>
                    </Table.Th>
                    <Table.Th style={{ background: "none", border: "none", textAlign: "center" }}>
                        <Text fw={700}>Land Use</Text>
                    </Table.Th>
                    <Table.Th style={{ background: "none", border: "none", textAlign: "center" }}>
                        <Text fw={700}>Water Footprint</Text>
                    </Table.Th>
                    <Table.Th style={{ background: "none", border: "none", textAlign: "center", borderLeft: "1px solid black" }}>
                        <Text fw={700}>Protein Content (4)</Text>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr style={{ border: "none" }}>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center" }}>
                        <MetricCell icon={IconMeat} label="Animal based (1)" iconColor="#A61E4D" iconSize={70} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center", borderLeft: "1px solid black" }}>
                        <MetricCell icon={IconCloudFog} label="3.2 - 50" value="CO₂-eq / 100g protein" iconColor={theme.colors.gray[8]} iconSize={100} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center" }}>
                        <MetricCell icon={IconPlant} label="3.7 - 185" value="m² / 100g protein" iconColor="#43A047" iconSize={100} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center" }}>
                        <MetricCell icon={IconDroplet} label="0.4 - 154" value="m³ / kg product" iconColor="#1971C2" iconSize={100} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center", borderLeft: "1px solid black" }}>
                        <Box display="flex" style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <PieChart
                                data={[
                                    { name: "Protein", value: 27, color: "#1971C2" },
                                    { name: "Other", value: 63, color: "#dee2e6" }
                                ]}
                                withLabels
                                withTooltip
                            />
                            <Text fw={"bold"} c={"#1971C2"}>~ 24-30%</Text>
                        </Box>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr style={{ border: "none" }}>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center" }}>
                        <MetricCell icon={IconBug} label="Insect based (2)" iconColor="#F08C00" iconSize={70} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center", borderLeft: "1px solid black" }}>
                        <MetricCell icon={IconCloudFog} label="0.3 - 1.6" value="CO₂-eq / 100g protein" iconColor={theme.colors.gray[8]} iconSize={50} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center" }}>
                        <MetricCell icon={IconPlant} label="-0.2 (3) - 1.8" value="m² / 100g protein" iconColor="#43A047" iconSize={50} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center" }}>
                        <MetricCell icon={IconDroplet} label="0.4 - 4.3" value="m³ / kg product" iconColor="#1971C2" iconSize={50} />
                    </Table.Td>
                    <Table.Td style={{ background: "none", border: "none", textAlign: "center", borderLeft: "1px solid black" }}>
                        <Box display="flex" style={{alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <PieChart
                                data={[
                                    { name: "Protein", value: 50, color: "#1971C2" },
                                    { name: "Other", value: 50, color: "#dee2e6" }
                                ]}
                                withLabels
                                withTooltip
                            />
                            <Text fw={"bold"} c={"#1971C2"}>{" ~ 50 % "}</Text>
                        </Box>
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}


/**
 * Displays the sustainability report from IPMP data.
 * Assumes IPMP data has already been stored in localStorage under key "data".
 */
export const Sustainability: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const [impData, setImpData] = useState<IPMP | null>(null);
    const theme = useMantineTheme();

    // Retrieve data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const parsedData = JSON.parse(storedData) as IPMP;
            setImpData(parsedData);
        }
    }, []);

    // If data or SustainabilityReq is missing, render a fallback message
    if (!impData?.SustainabilityReq) {
        return (
            <Box p="md">
                <Text>No sustainability data available</Text>
            </Box>
        );
    }

    const handleDownload = async () => {
        if (!contentRef.current) return;
        const el = contentRef.current;

        // measure the full size of your two-column layout

        const width  = el.scrollWidth;
        const height = el.scrollHeight;

        console.log(width)
        console.log(height)
        // clone it into a temporary off-screen container
        const clonedEl = el.cloneNode(true) as HTMLElement;
        Object.assign(clonedEl.style, {
            position: 'absolute',
            top: '-9999px',
            left: '0',
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'visible',
        });
        document.body.appendChild(clonedEl);

        // snapshot the clone
        const canvas = await html2canvas(clonedEl, {
            scale: 2,
            useCORS: true,
            width,
            height,
            windowWidth: width,
            windowHeight: height,
        });
        document.body.removeChild(clonedEl);

        // create a PDF exactly matching the canvas size
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('sustainability-report.pdf');
    };

    const impactItems = impData.SustainabilityReq.chartsData.environmentalImpact;

    const barData = impactItems.map(item => ({
        x: item.label,
        value: item.value,
        unit: item.unit,
        category: item.category,
        color: CATEGORY_COLORS[item.category] ?? "#868E96", // fallback gray
    }));

    // Find all unique categories
    const categories = Array.from(new Set(barData.map(d => d.category)));

    const series = categories.map(cat => ({
        name: cat,
        color: CATEGORY_COLORS[cat] ?? "#868E96",
        valueKey: (d: typeof barData[number]) => d.category === cat ? d.value : 0,
    }));

    const PIE_SLICE_KEYS = ["Rearing", "Production", "Transportation"];

    const pieFromValues = (
        metric: { title: string; values: Record<string, number>; unit: string }
    ) =>
        Object.entries(metric.values).map(([key, val]) => ({
            name: key,
            value: val,
            unit: metric.unit,
        }));

    const pieData = [
        {
            title: impData.SustainabilityReq.chartsData.carbonFootprint.title,
            subtitle: impData.SustainabilityReq.chartsData.carbonFootprint.subtitle,
            data: pieFromValues(impData.SustainabilityReq.chartsData.carbonFootprint),
            color: "#1971C2",
            text: impData.SustainabilityReq.chartsData.carbonFootprint.text
        },
        {
            title: impData.SustainabilityReq.chartsData.ecosystem.title,
            subtitle: impData.SustainabilityReq.chartsData.ecosystem.subtitle,
            data: pieFromValues(impData.SustainabilityReq.chartsData.ecosystem),
            color: "#2B8A3E",
            text: impData.SustainabilityReq.chartsData.ecosystem.text
        },
        {
            title: impData.SustainabilityReq.chartsData.resources.title,
            subtitle: impData.SustainabilityReq.chartsData.resources.subtitle,
            data: pieFromValues(impData.SustainabilityReq.chartsData.resources),
            color: "#A61E4D",
            text: impData.SustainabilityReq.chartsData.resources.text
        },
        {
            title: impData.SustainabilityReq.chartsData.humanHealth.title,
            subtitle: impData.SustainabilityReq.chartsData.humanHealth.subtitle,
            data: pieFromValues(impData.SustainabilityReq.chartsData.humanHealth),
            color: "#F08C00",
            text: impData.SustainabilityReq.chartsData.humanHealth.text
        },
    ];

    return (
        <Flex direction={"column"} align={"center"}>
            <Flex direction={"column"} p={"15px"} ref={contentRef}>

                <Flex direction={"row"} gap={"15px"} align={"center"} mb="lg">
                    <Title order={1}>
                        Sustainability Report
                    </Title>
                </Flex>

                <Flex direction={"row"} gap={"15px"} align={"center"} mb="lg">
                    <Text >
                        This report provides an overview of sustainability performance metrics.
                    </Text>
                </Flex>

                <Flex direction={"row"} gap={"15px"} mb={ "15px"}>
                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           h={"auto"}
                           w={"20%"}
                           withBorder
                           style={{
                               backgroundColor: theme.white,
                           }}>
                        <Title order={3} mb={"5px"}>Overview</Title>
                        <Text mb={"5px"}>This report highlights the sustainability potential of insect-based protein.</Text>
                        <Title order={6}>Content</Title>
                        <Flex mb={"5px"} direction={"row"} gap={"5px"}>
                            <Text>1.</Text>
                            <Text>Insect based protein vs. animal based protein</Text>
                        </Flex>
                        <Flex mb={"5px"} direction={"row"} gap={"5px"}>
                            <Text>2.</Text>
                            <Text>Impact for 100g protein of BSF - Its environmental and socio-economic impact </Text>
                        </Flex>
                        <Flex mb={"5px"} direction={"row"} gap={"5px"}>
                            <Text>3.</Text>
                            <Text>Main contributors to the environment</Text>
                        </Flex>
                        <Flex mb={"5px"} direction={"row"} gap={"5px"}>
                            <Text>4.</Text>
                            <Text>Life cycle assessment report and system boundaries</Text>
                        </Flex>
                    </Paper>

                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           h={"auto"}
                           w={"80%"}
                           withBorder
                           style={{
                               backgroundColor: theme.white,
                           }}>
                        <Title order={3} mb={"15px"}>Environmental and Protein Content Comparasion of different Protein Sources</Title>
                        <Flex direction={"row"}>

                            <InvisibleMetricsTable></InvisibleMetricsTable>
                        </Flex>
                        <Text>
                            (1) Animal-based protein includes products made by lamb & mutton, beef, pork, poultry meat, farmed fish, farmed crustaceans, eggs, cheese, and milk, where milk has the lowest impact on green hous gas (GHG) emissions, farmed crustaceans have the lowest impact on land use, and farmed fish have the lowest impact on water footprint. Lamb and mutton have the most significant impact on land use and water footprint, while beef has the highest GHG emissions compared to the others.
                        </Text>
                        <Text>
                            (2) Insect-based protein includes products made by mealworms (Netherlands), crickets (Thailand), and protaetia brevitarsis seulensis (PBS) larvae (Korea). Mealworms have the least GHG emissions, while PBS larvae have the most. However, a totally different scenario occurred in land use, where mealworms contributed the most, and PBS larvae contributed the least. Crickets have the least water footprint, while mealworms have the most.
                        </Text>
                        <Text>
                            (3) The value of -0.2 reflects a reduction in land occupation impact. In the study, insects were fed on biowaste (such as mushroom production waste and banana peels), turning environmentally harmful materials into useful feed and reducing the need for land resources.
                        </Text>
                        <Text>
                            (4) Based on different animals, protein content varies, but it is typically within 24-30%. Data are sourced from various sources, including Bauchart et al. (2008), among others. Insect-based protein content data is from the lab test results of BSF-Cycle.
                            Environmental results are coming from Malila et al. 2024, npj Science of Food.
                        </Text>

                    </Paper>

                </Flex>


                <Flex direction={"row"} gap={"15px"} mb={ "15px"}>
                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           w={"80%"}
                           withBorder>
                        <Title order={3} mb={12}>Impact for 100g protein of BSF</Title>

                        {/* Barchart */}
                        <BarChart

                            orientation="horizontal"
                            h={barData.length * 20}
                            data={barData}
                            dataKey="x"
                            series={[{ name: "value", color: theme.colors.blue[6] }]}
                            gridAxis="x"
                            barProps={{
                                radius: 5,
                            }}
                            mx="auto"
                            withTooltip={true}
                        />
                        <Flex gap={12} wrap="wrap" mt="md">
                            {categories.map(cat => (
                                <Flex key={cat} align="center" gap={6}>
                                    <Box w={18} h={18} style={{ background: CATEGORY_COLORS[cat], borderRadius: 4 }} />
                                    <Text size="sm">{cat}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Paper>

                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           h={"auto"}
                           w={"20%"}
                           withBorder
                           style={{
                               backgroundColor: theme.white,
                           }}>
                        <Title order={3} mb={"14px"}>Socio-Economic-Impact</Title>
                        <Title order={6}>Socio-Economic-Impact</Title>
                        <Text mb={"14px"}>{impData.SustainabilityReq.socialAndEconomicImpact.labourStandards}</Text>
                        <Title order={6}>Savings</Title>
                        <Text>{impData.SustainabilityReq.socialAndEconomicImpact.costSavings}</Text>
                    </Paper>

                </Flex>

                <Flex direction={"row"} gap={"15px"} mb={"15px"}>
                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           h={"100%"}
                           w={"100%"}

                           withBorder
                           style={{
                               backgroundColor: theme.white,
                           }}>

                        <Title order={3} mb={14}>Main Contributors</Title>
                        {/* Optionally, add legend here */}
                        <Flex gap={16} mb={14} justify="flex-start" mt="md">
                            {PIE_SLICE_KEYS.map(key => (
                                <Flex key={key} align="center" gap={6}>
                                    <Box w={16} h={16} style={{ background: PIE_SLICE_COLORS[key], borderRadius: 4 }} />
                                    <Text size="xs">{key}</Text>
                                </Flex>
                            ))}
                        </Flex>
                        <Flex direction="row" gap={30} wrap="wrap" justify="space-around">
                            {pieData.map((pie) => (
                                <Flex direction={"column"} align={"center"} key={pie.title} style={{ width: 350, textAlign: "center" }}>
                                    {/* Title and subtitle ABOVE the chart */}
                                    <Text size="sm" fw={700} mb={2}>{pie.title}</Text>
                                    <Text size="xs" c="dimmed" mb={4}>{pie.subtitle}</Text>
                                    <PieChart
                                        data={PIE_SLICE_KEYS.map(key => ({
                                            name: key,
                                            value: pie.data.find(slice => slice.name === key)?.value ?? 0,
                                            color: PIE_SLICE_COLORS[key],
                                        }))}
                                        withLabels

                                    />
                                    <Text>{pie.text}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Paper>

                </Flex>

                <Flex direction={"row"} gap={"15px"} mb={ "15px"}>
                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           h={"auto"}
                           w={"40%"}
                           withBorder
                           style={{
                               backgroundColor: theme.white,
                           }}>
                        <Title order={3}>Lifecycle Assesment Report</Title>
                        <Title order={6}>Goal</Title>
                        <Text mb={"14px"}>{impData.SustainabilityReq.lifecycleAssessmentReport.goal}</Text>
                        <Title order={6}>Scope</Title>
                        <Title order={6}>→ System boundary</Title>
                        <Text mb={"14px"}>{impData.SustainabilityReq.lifecycleAssessmentReport.boundaries.system}</Text>
                        <Title order={6}>→ Geographical boundary</Title>
                        <Text mb={"14px"}>{impData.SustainabilityReq.lifecycleAssessmentReport.boundaries.geographical}</Text>
                        <Title order={6}>→ Time boundary</Title>
                        <Text mb={"14px"}>{impData.SustainabilityReq.lifecycleAssessmentReport.boundaries.time}</Text>
                        <Title order={6}>Functional Unit</Title>
                        <Text mb={"14px"}>{impData.SustainabilityReq.lifecycleAssessmentReport.functionalUnit}</Text>
                        <Title order={6}>Impact Categories</Title>
                        <Text>{impData.SustainabilityReq.lifecycleAssessmentReport.impactCategories}</Text>
                    </Paper>

                    <Paper shadow="md"
                           radius="md"
                           p="md"
                           mb={"15px"}
                           h={"100%"}
                            w={"60%"}
                           withBorder
                           style={{
                               backgroundColor: theme.white,
                           }}>
                        <Title order={3}>System Boundary description</Title>
                        {impData.SustainabilityReq.systemBoundaryDescription.map((description, index) => {
                            // Select color and icon based on index
                            let bg = "#43A047";
                            let Icon = IconPlant;
                            if (index === 1) {
                                bg = "#FB8C00";
                                Icon = IconBug;
                            } else if (index === 2) {
                                bg = "#1E88E5";
                                Icon = IconTruck;
                            }
                            return (
                                <Flex key={description.stage} direction="column" mb="md">
                                    <Box
                                        style={{
                                            background: bg,
                                            borderRadius: 8,
                                            padding: "8px 16px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}

                                    >
                                        <Title
                                            order={6}
                                            style={{
                                                color: "white",
                                                margin: 0,
                                                fontWeight: 600,
                                                fontSize: 18,
                                                background: "none",
                                            }}
                                        >
                                            {`${index + 1}. ${description.stage}`}
                                        </Title>
                                    </Box>
                                    <Flex direction="row" gap={0} align="center" /* No margin here */>
                                        {/* Large icon for step description */}
                                        <Icon size={index == 0 ? 430 : 300} height={"auto"} color={bg} style={{ marginRight: 50, marginLeft: 50 }} />
                                        <Text style={{ lineHeight: 1.7 }}>{description.description}</Text>
                                    </Flex>
                                </Flex>
                            );
                        })}

                    </Paper>

                </Flex>


            </Flex>
        </Flex>

    );
};
