import React, { useEffect, useState } from "react";
import {MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip} from "react-leaflet";
import L, {LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    Timeline,
    Text,
    Title,
    Divider,
    Flex,
    Box, Button
} from "@mantine/core";
import { IconShip, IconTruck } from "@tabler/icons-react";

// Types
type Logistics = {
    mode: string;
    carrier: string;
    departureDate: string;
    arrivalDate: string;
    departureLocation: string;
    departureCoords: [number, number];
    arrivalLocation: string;
    arrivalCoords: [number, number];
    temperatureCond: string;
}

type TraceLogEntry = {
    traceID: string;
    actorRole: string;
    companyName: string;
    location: string;
    coords: [number, number]
    logistics: Partial<Logistics>;
};

interface Document {
    // define your Document fields here
}
interface IPMPModel {
    IPMP: {
        supplyChain: {
            SupplyChainID: string;
            description: string;
            traceLog: TraceLogEntry[];
        };
    };
}
interface DocumentWithPDF {
    doc: Document;
    pdfUrl: string;
}

// Example lat/lng dictionary for demonstration
const locationCoords: Record<string, [number, number]> = {
    "Province, China": [30.9756, 112.2707],
    "Shanghai Port, China": [31.2304, 121.4737],
    "Hamburg Port, Germany": [53.5461, 9.9661],
    "Hamburg Warehouse, Germany": [53.55, 10.0],
    "Mannheim, Germany": [49.4875, 8.4660],
};



// Icons for markers: normal vs. highlighted
const defaultMarkerIcon = L.icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const highlightMarkerIcon = L.icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});


export const SupplyChain: React.FC = () => {
    const [impData, setImpData] = useState<IPMPModel | null>(null);
    const [documents, setDocuments] = useState<DocumentWithPDF[]>([]);
    // The currently-selected traceID (when user clicks on timeline)
    const [selectedTraceID, setSelectedTraceID] = useState<string | null>(null);

    useEffect(() => {
        const stringData = localStorage.getItem("data");
        if (stringData) {
            const parsedData = JSON.parse(stringData) as IPMPModel;
            setImpData(parsedData);
        }
        const stringDocuments = localStorage.getItem("documents");
        if (stringDocuments) {
            const parsedDocuments = JSON.parse(stringDocuments) as DocumentWithPDF[];
            setDocuments(parsedDocuments);
        }
    }, []);

    // On timeline item click, set the selected traceID
    const handleTimelineItemClick = (traceID: string) => {
        setSelectedTraceID(traceID);
    };

    // Prepare the data
    const traceLog = impData?.IPMP.supplyChain.traceLog || [];

    // Generate marker data directly from the embedded coords
    const markersData = traceLog.map(entry => ({
        traceID: entry.traceID,
        actorRole: entry.actorRole,
        companyName: entry.companyName,
        location: entry.location,
        coords: entry.coords,
    }));

// Generate route polylines directly from embedded departure/arrival coords
    const routesData = traceLog
        .filter(entry => entry.logistics.departureCoords && entry.logistics.arrivalCoords)
        .map(entry => ({
            traceID: entry.traceID,
            departureLocation: entry.logistics.departureLocation,
            arrivalLocation: entry.logistics.arrivalLocation,
            mode: entry.logistics.mode,
            coords: [
                entry.logistics.departureCoords as LatLngExpression,
                entry.logistics.arrivalCoords as LatLngExpression,
            ],
        }));
    // Decide on a center for your map
    const mapCenter: [number, number] = [40, 50];
    const zoomLevel = 3;

    return (
        <Box p={"15px"}>
            <Flex align={"center"} gap={"15px"}>
                <Title order={3}>Supply Chain</Title>
                <Text>
                    Id: {impData?.IPMP.supplyChain.SupplyChainID}
                </Text>
                <Text>
                    {impData?.IPMP.supplyChain.description}
                </Text>
            </Flex>

            <Divider mb={10} />
            {/* Layout: Timeline on left, Map on right */}
            <Flex direction={"row"} gap={"30px"} mt={"30px"}>
                {/* Timeline */}
                <Flex direction={"column"} w={"30%"} gap={"15px"}>
                    <Title order={3} mb={"15px"}>
                        Tracelog
                    </Title>
                    <Timeline
                        active={traceLog.length}
                        bulletSize={50}
                        lineWidth={2}
                        style={{ cursor: "pointer" }}
                    >
                        {traceLog.map((log) => {

                            if(log.logistics.arrivalCoords == null){
                                return <></>
                            }
                            // Pick an icon for the bullet
                            const bulletIcon =
                                log.logistics.mode === "Sea Freight" ? (
                                    <IconShip size={25} />
                                ) : (
                                    <IconTruck size={25} />
                                );

                            return (
                                <Timeline.Item
                                    key={log.traceID}
                                    bullet={bulletIcon}
                                    title={`${log.actorRole} - ${log.companyName}`}
                                    // Use onClick to select
                                    onClick={() => handleTimelineItemClick(log.traceID)}
                                >
                                    <Text c="dimmed" size="sm">
                                        {log.location}
                                    </Text>
                                    <Text size="xs" mt={4}>
                                        Departure: {log.logistics.departureDate} from{" "}
                                        {log.logistics.departureLocation}
                                    </Text>
                                    <Text size="xs">
                                        Arrival: {log.logistics.arrivalDate} at{" "}
                                        {log.logistics.arrivalLocation}
                                    </Text>
                                    <Text size="xs" mt={4}>
                                        Temperature: {log.logistics.temperatureCond}
                                    </Text>
                                </Timeline.Item>
                            );
                        })}
                    </Timeline>
                </Flex>

                {/* Map */}
                <Flex direction={"column"} w={"70%"}>
                    <Title order={3} mb={"15px"}>
                        Tracelog Interactive Map
                    </Title>
                    <div style={{ width: "100%", height: "600px" }}>
                        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            />

                            {/* Markers */}
                            {markersData.map((marker, index) => {
                                if (!marker.coords) return null;
                                const [lat, lng] = marker.coords;
                                // Decide if this marker is selected
                                const isSelected = marker.traceID === selectedTraceID;

                                return (
                                    <Marker
                                        key={marker.traceID}
                                        position={[lat, lng]}
                                        icon={isSelected ? highlightMarkerIcon : defaultMarkerIcon}
                                    >
                                        <Popup>
                                            <div>
                                                <strong>{marker.actorRole}</strong> - {marker.companyName}
                                                <br />
                                                Location: {marker.location}
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/* Polylines */}
                            {routesData.map((route, idx) => {
                                if (!route.coords) return null;

                                // 1-based index
                                const label = idx + 1;

                                // midpoint of the line for placing the label
                                const [start, end] = route.coords as [LatLngExpression, LatLngExpression];
                                const midpoint: LatLngExpression = [
                                    // @ts-ignore start and end are [number,number]
                                    (start[0] + end[0]) / 2,
                                    // @ts-ignore
                                    (start[1] + end[1]) / 2,
                                ];

                                const isSelected = route.traceID === selectedTraceID;

                                return (
                                    <React.Fragment key={route.traceID}>
                                        <Polyline
                                            positions={route.coords as LatLngExpression[]}
                                            pathOptions={{
                                                color:  isSelected ? 'red'  : '#238BE6',
                                                weight: isSelected ? 4      : 2,
                                            }}
                                        />
                                        <Marker
                                            position={midpoint}
                                            interactive={false}      // so clicks pass through
                                            icon={L.divIcon({
                                                className: 'route-label',
                                                html: !isSelected ?
                                                    `<div style="background: #238BE6; width: 30px; height: 30px; border-radius: 15px; color: white; display: flex; justify-content: center; font-size: 20px">${idx + 1}</div>`
                                                :
                                                    `<div style="background: red; width: 30px; height: 30px; border-radius: 15px; color: white; display: flex; justify-content: center; font-size: 20px">${idx + 1}</div>`
                                                ,
                                            })}
                                        />

                                    </React.Fragment>
                                );
                            })}
                        </MapContainer>
                    </div>
                </Flex>
            </Flex>
        </Box>
    );
};
