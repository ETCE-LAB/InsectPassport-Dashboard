import React from 'react';
import { Card, Text, Title, Accordion } from '@mantine/core';
import {InsectProtein, IPMPModel, QualityAssessment, RegCertif, SupplyChain, SustainabilityReq} from "../models/test";


// Main visualizer component
export const IPMPVisualizer: React.FC<{ data: IPMPModel }> = ({ data }) => {
    const { passID, creationDate, validityPeriod } = data.IPMP;
    return (
        <div style={{ padding: '1rem' }}>
            <Title order={2}>IPMP Details</Title>
            <Text>Pass ID: {passID}</Text>
            <Text>Creation Date: {creationDate}</Text>
            <Text>Validity Period: {validityPeriod}</Text>

            <Accordion multiple mt="md">
                <Accordion.Item value="insectProtein">
                    <Accordion.Control>Insect Protein</Accordion.Control>
                    <Accordion.Panel>
                        <InsectProteinView data={data.IPMP.insectProtein} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="qualityAssessment">
                    <Accordion.Control>Quality Assessment</Accordion.Control>
                    <Accordion.Panel>
                        <QualityAssessmentView data={data.IPMP.qualityAssessment} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="sustainabilityReq">
                    <Accordion.Control>Sustainability Requirements</Accordion.Control>
                    <Accordion.Panel>
                        <SustainabilityReqView data={data.IPMP.SustainabilityReq} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="regCertifs">
                    <Accordion.Control>Regulatory Certifications</Accordion.Control>
                    <Accordion.Panel>
                        <RegCertifView data={data.IPMP.regCertifs} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="supplyChain">
                    <Accordion.Control>Supply Chain</Accordion.Control>
                    <Accordion.Panel>
                        <SupplyChainView data={data.IPMP.supplyChain} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

// --------------------------
// Insect Protein View
// --------------------------
const InsectProteinView: React.FC<{ data: InsectProtein }> = ({ data }) => {
    return (
        <Card withBorder shadow="sm" padding="md" mb="md">
            <Title order={4}>{data.insectName}</Title>
            <Text>
                Species: {data.insectSpecies.genus} {data.insectSpecies.species}
            </Text>
            <Text>Batch ID: {data.batchID}</Text>
            <Text>Batch Size: {data.batchSize}</Text>

            <Title order={5} mt="sm">
                Spec Info
            </Title>
            <Text>Feed Type: {data.specInfo.feedType}</Text>
            <Text>Feed Sources: {data.specInfo.feedSource.join(', ')}</Text>
            <Text>Manufacturing Date: {data.specInfo.manufacturingDate}</Text>
            <Text>Feed Conversion Ratio: {data.specInfo.feedConversionRatio}</Text>
            <Text>Expiry Date: {data.specInfo.expiryDate}</Text>

            <Title order={5} mt="sm">
                Rear Info
            </Title>
            {data.rearInfo.map((item, index) => (
                <Card key={index} withBorder shadow="xs" padding="sm" mt="sm">
                    <Text>
                        <strong>Rearing Methodology:</strong> {item.rearingMethodology.join(', ')}
                    </Text>
                    <Text>
                        <strong>Facility Location:</strong> {item.rearingFacility.location}
                    </Text>
                    <Text>
                        <strong>Approval Number:</strong> {item.rearingFacility.approvalNumber}
                    </Text>
                    <Text>
                        <strong>Standards:</strong> {item.rearingFacility.standards}
                    </Text>
                    <Text mt="xs">
                        <strong>Environmental Conditions:</strong>
                    </Text>
                    <Text>Temperature: {item.rearingEnvCond.temperature}</Text>
                    <Text>Humidity: {item.rearingEnvCond.humidity}</Text>
                    <Text>Ventilation: {item.rearingEnvCond.ventilation}</Text>
                    <Text>Disease Monitoring: {item.diseaseMonitoring}</Text>
                    <Text>Biosecurity Measures: {item.biosecurityMeasures}</Text>
                </Card>
            ))}
        </Card>
    );
};

// --------------------------
// Quality Assessment View
// --------------------------
const QualityAssessmentView: React.FC<{ data: QualityAssessment }> = ({ data }) => {
    return (
        <Card withBorder shadow="sm" padding="md" mb="md">
            <Text>Assessment ID: {data.assessmentID}</Text>
            <Text>Assessment Date: {data.assessDate}</Text>

            <Title order={5} mt="sm">
                Processing Facility
            </Title>
            <Text>Facility ID: {data.procFacility.procFacilityID}</Text>
            <Text>Location: {data.procFacility.location}</Text>
            <Text>Approval Number: {data.procFacility.approvalNumber}</Text>
            <Text>Standards: {data.procFacility.standards}</Text>

            <Title order={6} mt="sm">
                Processing Methods
            </Title>
            {data.procFacility.processingMethods.map((method, index) => (
                <Card key={index} withBorder shadow="xs" padding="sm" mt="sm">
                    <Text>Method ID: {method.procMethodID}</Text>
                    <Text>Name: {method.name}</Text>
                    <Text>Temperature: {method.temperature}</Text>
                    <Text>Time: {method.time}</Text>
                    <Text>Meal Format: {method.mealFormat}</Text>
                </Card>
            ))}

            <Title order={5} mt="sm">
                Lab Test Reports
            </Title>
            {data.labTestReports.map((report, index) => (
                <Card key={index} withBorder shadow="xs" padding="sm" mt="sm">
                    <Text>Test ID: {report.testID}</Text>
                    <Text>Test Name: {report.testName}</Text>
                    <Text>Start Date: {report.testStartDate}</Text>
                    <Text>End Date: {report.testEndDate}</Text>
                    <Text>Amendment: {report.amendment}</Text>
                    <Text>
                        Lab: {report.labFacility.labName} ({report.labFacility.labLocation})
                    </Text>
                    <Title order={6} mt="xs">
                        Test Parameters
                    </Title>
                    {report.testParameters.map((param, i) => (
                        <Card key={i} withBorder shadow="xs" padding="xs" mt="xs">
                            <Text>
                                {param.paramName || param.parameterName}: {param.result} {param.unit}
                            </Text>
                            <Text>Method: {param.testingMethod || param.method}</Text>
                        </Card>
                    ))}
                </Card>
            ))}

            <Title order={5} mt="sm">
                Store Handling Requirements
            </Title>
            <Text>Storage Condition: {data.storeHandleReq.storageCond}</Text>
            <Text>Packaging: {data.storeHandleReq.packaging}</Text>
            <Title order={6} mt="xs">
                Labelling
            </Title>
            <Text>Product Name: {data.storeHandleReq.labelling.productName}</Text>
            <Text>Intended Use: {data.storeHandleReq.labelling.intendedUse}</Text>
            <Text>Net Weight: {data.storeHandleReq.labelling.netWeight}</Text>
            <Text>Expiry Date: {data.storeHandleReq.labelling.expiryDate}</Text>
            <Text>
                Manufacturer: {data.storeHandleReq.labelling.manufacturerDetails.name}
            </Text>
            <Text>
                Importer: {data.storeHandleReq.labelling.importerDetails.name}
            </Text>
        </Card>
    );
};

// --------------------------
// Sustainability Requirements View
// --------------------------
const SustainabilityReqView: React.FC<{ data: SustainabilityReq }> = ({ data }) => {
    return (
        <Card withBorder shadow="sm" padding="md" mb="md">
            <Text>Sustainability ID: {data.susID}</Text>
            <Text>Description: {data.susDescription}</Text>

            <Title order={6} mt="sm">
                Resource Use
            </Title>
            <Text>Water Usage: {data.resourceUse.waterUsage}</Text>
            <Text>Water Footprint: {data.resourceUse.waterFootprint}</Text>
            <Text>Energy Use: {data.resourceUse.energyUse}</Text>

            <Title order={6} mt="sm">
                Environmental Impact
            </Title>
            <Text>Carbon Footprint: {data.environmentalImpact.carbonFootprint}</Text>
            <Text>Land Use: {data.environmentalImpact.landUse}</Text>
            <Text>Waste Management: {data.environmentalImpact.wasteManagement}</Text>

            <Title order={6} mt="sm">
                Circularity
            </Title>
            <Text>Waste Reduction Strategy: {data.circularity.wasteReductionStrategy}</Text>
            <Text>Contribution CE: {data.circularity.contributionCE}</Text>

            <Title order={6} mt="sm">
                Social & Economic Impact
            </Title>
            <Text>Labour Standards: {data.socialAndEconomicImpact.labourStandards}</Text>
            <Text>Cost Savings: {data.socialAndEconomicImpact.costSavings}</Text>
            <Text>Human Health Monitoring: {data.socialAndEconomicImpact.humanHealthMonitoring}</Text>

            <Title order={6} mt="sm">
                Sustainability Report
            </Title>
            <Text>Report ID: {data.SustReport.reportID}</Text>
            <Text>Generated Date: {data.SustReport.generatedDate}</Text>
            <Text>Summary: {data.SustReport.summary}</Text>
        </Card>
    );
};

// --------------------------
// Regulatory Certifications View
// --------------------------
const RegCertifView: React.FC<{ data: RegCertif[] }> = ({ data }) => {
    return (
        <div>
            {data.map((cert, index) => (
                <Card key={index} withBorder shadow="sm" padding="md" mb="md">
                    <Text>Certification ID: {cert.RegCertID}</Text>
                    <Text>Description: {cert.RegCertDescription}</Text>

                    <Title order={6} mt="sm">
                        Compliance Categories
                    </Title>
                    {cert.complianceCategories.map((cat, i) => (
                        <Card key={i} withBorder shadow="xs" padding="sm" mt="sm">
                            <Text>Category ID: {cat.complianceID}</Text>
                            <Text>Name: {cat.complianceName}</Text>
                            <Text>Description: {cat.complianceDescription}</Text>

                            <Title order={6} mt="xs">
                                Regulations
                            </Title>
                            {cat.regulations.map((reg, j) => (
                                <Card key={j} withBorder shadow="xs" padding="xs" mt="xs">
                                    <Text>Regulation ID: {reg.regulationID}</Text>
                                    <Text>Name: {reg.regulationName}</Text>
                                    <Text>Issuer: {reg.regulationIssuer}</Text>
                                    <Text>Compliance Date: {reg.complianceDate}</Text>
                                    <Title order={6} mt="xs">
                                        Specificities
                                    </Title>
                                    {reg.regulatorySpecificities.map((spec, k) => (
                                        <Text key={k}>
                                            {spec.requirement && `${spec.requirement} - `}{spec.details}
                                        </Text>
                                    ))}
                                    <Title order={6} mt="xs">
                                        Documents
                                    </Title>
                                    {reg.documents.map((doc, l) => (
                                        <Text key={l}>
                                            {doc.documentType}: {doc.fileName} -{' '}
                                            <a href={doc.URL} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        </Text>
                                    ))}
                                </Card>
                            ))}
                        </Card>
                    ))}
                </Card>
            ))}
        </div>
    );
};

// --------------------------
// Supply Chain View
// --------------------------
const SupplyChainView: React.FC<{ data: SupplyChain }> = ({ data }) => {
    return (
        <Card withBorder shadow="sm" padding="md" mb="md">
            <Text>Supply Chain ID: {data.SupplyChainID}</Text>
            <Text>Description: {data.description}</Text>

            <Title order={6} mt="sm">
                Actors
            </Title>
            {data.actors.map((actor, index) => (
                <Card key={index} withBorder shadow="xs" padding="sm" mt="sm">
                    <Text>Actor ID: {actor.actorId}</Text>
                    <Text>Name: {actor.name}</Text>
                    <Text>Type: {actor.type}</Text>
                    <Text>Location: {actor.location}</Text>
                    <Text>Contact: {actor.contact}</Text>
                    <Title order={6} mt="xs">
                        Activities
                    </Title>
                    {actor.activity.map((act, j) => (
                        <Card key={j} withBorder shadow="xs" padding="xs" mt="xs">
                            <Text>Activity ID: {act.activityId}</Text>
                            <Text>Type: {act.type}</Text>
                            <Text>Timestamp: {act.timestamp}</Text>
                            <Text>Performed By: {act.performedBy}</Text>
                            {act.documents &&
                                act.documents.map((doc, k) => (
                                    <Text key={k}>
                                        Document: {doc.fileName} -{' '}
                                        <a href={doc.URL} target="_blank" rel="noopener noreferrer">
                                            View
                                        </a>
                                    </Text>
                                ))}
                        </Card>
                    ))}
                </Card>
            ))}

            <Title order={6} mt="sm">
                Trace Log
            </Title>
            {data.traceLog.map((trace, index) => (
                <Card key={index} withBorder shadow="xs" padding="sm" mt="sm">
                    <Text>Trace ID: {trace.traceID}</Text>
                    <Text>Actor Role: {trace.actorRole}</Text>
                    <Text>Company: {trace.companyName}</Text>
                    <Text>Location: {trace.location}</Text>
                    <Title order={6} mt="xs">
                        Logistics
                    </Title>
                    <Text>
                        Mode: {trace.logistics.mode} | Carrier: {trace.logistics.carrier}
                    </Text>
                    <Text>
                        Departure: {trace.logistics.departureDate} ({trace.logistics.departureLocation})
                    </Text>
                    <Text>
                        Arrival: {trace.logistics.arrivalDate} ({trace.logistics.arrivalLocation})
                    </Text>
                    <Text>Temperature: {trace.logistics.temperatureCond}</Text>
                </Card>
            ))}
        </Card>
    );
};
