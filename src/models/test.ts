// Root
export interface IPMP {
    passID: string;
    creationDate: string;
    validityPeriod: string;
    insectProtein: InsectProtein;
    qualityAssessment: QualityAssessment;
    SustainabilityReq: SustainabilityReq;
    regCertifs: RegulatoryCertificate[];
    supplyChain: SupplyChain;
}

// Insect Protein
export interface InsectProtein {
    insectName: string;
    insectSpecies: {
        genus: string;
        species: string;
    };
    batchID: string;
    batchSize: number;
    specInfo: SpecInfo;
    rearInfo: RearingInfo[];
}

export interface SpecInfo {
    feedType: string;
    feedSource: string[];
    manufacturingDate: string;
    feedConversionRatio: number;
    expiryDate: string;
}

export interface RearingInfo {
    rearingMethodology: string[];
    rearingFacility: RearingFacility;
    rearingEnvCond: RearingEnvCond;
    diseaseMonitoring: string;
    biosecurityMeasures: string;
}

export interface RearingFacility {
    location: string;
    approvalNumber: string;
    standards: string;
}

export interface RearingEnvCond {
    temperature: string;
    humidity: string;
    ventilation: string;
}

// Quality Assessment
export interface QualityAssessment {
    assessmentID: string;
    assessDate: string;
    procFacility: ProcessingFacility;
    labTestReports: LabTestReport[];
    storeHandleReq: StoreHandleReq;
}

export interface ProcessingFacility {
    procFacilityID: string;
    location: string;
    approvalNumber: string;
    standards: string;
    processingMethods: ProcessingMethod[];
}

export interface ProcessingMethod {
    procMethodID: string;
    name: string;
    temperature: string;
    time: string;
    mealFormat: string;
}

export interface LabTestReport {
    testID: string;
    testName: string;
    testStartDate: string;
    testEndDate: string;
    amendment: string;
    labFacility: LabFacility;
    testParameters: TestParameter[];
    documents?: Document[];
}

export interface LabFacility {
    labID: string;
    labName: string;
    labLocation: string;
    approvalNumber: string;
}

// Two different keys: paramID/parameterId, paramName/parameterName, method/testingMethod
export type TestParameter = {
    paramID?: string;
    paramName?: string;
    testingMethod?: string;
    parameterId?: string;
    parameterName?: string;
    method?: string;
    result: number;
    unit: string;
};

export interface Document {
    documentID: string;
    documentType: string;
    fileName: string;
    filePath: string;
    URL: string;
}

// Store & Label
export interface StoreHandleReq {
    storeHandleReqID: string;
    storageCond: string;
    packaging: string;
    labelling: Labelling;
    handlingRequirement: string;
    shelfExpirationPeriod: string;
}

export interface Labelling {
    labellingID: string;
    productName: string;
    intendedUse: string;
    netWeight: string;
    expiryDate: string;
    manufacturerDetails: CompanyDetails;
    importerDetails: CompanyDetails;
    analyticalComponent: AnalyticalComponent;
}

export interface CompanyDetails {
    name: string;
    address: string;
    email: string;
}

export interface AnalyticalComponent {
    ProteinContent: string;
    FatContent: string;
    Salmonella: string;
    Lead: string;
    TotalBacterialCount: string;
}

// Sustainability
export interface SustainabilityReq {
    susID: string;
    susDescription: string;
    resourceUse: ResourceUse;
    environmentalImpact: EnvironmentalImpact;
    circularity: Circularity;
    socialAndEconomicImpact: SocialEconomicImpact;
    sustReport: SustainabilityReport;
    lifecycleAssessmentReport: LifeCycleAssessmentReport;
    chartsData: ChartsData;
    systemBoundaryDescription: SystemBoundaryDescription[];
}

export interface ResourceUse {
    waterUsage: string;
    waterFootprint: string;
    energyUse: string;
}

export interface EnvironmentalImpact {
    carbonFootprint: string;
    landUse: string;
    wasteManagement: string;
}

export interface Circularity {
    contributionCE: string;
}

export interface SocialEconomicImpact {
    labourStandards: string;
    costSavings: string;
    humanHealthMonitoring: string;
}

export interface SustainabilityReport {
    reportID: string;
    generatedDate: string;
    summary: string;
    resourceUseSummary: string;
    environmentalImpactSummary: string;
    socialEconomicImpactSummary: string;
    circularitySummary: string;
}

export interface LifeCycleAssessmentReport {
    goal: string;
    boundaries: LcaBoundaries;
    functionalUnit: string;
    impactCategories: string;
}

export interface LcaBoundaries {
    system: string;
    geographical: string;
    time: string;
}

export interface ChartsData {
    carbonFootprint: ChartMetric;
    ecosystem: ChartMetric;
    resources: ChartMetric;
    humanHealth: ChartMetric;
    environmentalImpact: EnvironmentalImpactItem[];
}

export interface ChartMetric {
    title: string;
    subtitle: string;
    text: string;
    unit: string;
    values: {
        Rearing: number;
        Production: number;
        Transportation: number;
    };
}

export interface EnvironmentalImpactItem {
    category: string;
    label: string;
    value: number;
    unit: string;
}

export interface SystemBoundaryDescription {
    stage: string;
    description: string;
}

// Regulatory Certificates
export interface RegulatoryCertificate {
    RegCertID: string;
    RegCertDescription: string;
    complianceCategories: ComplianceCategory[];
}

export interface ComplianceCategory {
    complianceID: string;
    complianceName: string;
    complianceDescription: string;
    regulations: Regulation[];
}

export interface Regulation {
    regulationID: string;
    regulationName: string;
    regulationIssuer: string;
    complianceDate: string;
    regulatorySpecificities: RegulatorySpecificity[];
    documents: Document[];
}

export interface RegulatorySpecificity {
    requirement?: string;
    details?: string;
}

// Supply Chain
export interface SupplyChain {
    SupplyChainID: string;
    description: string;
    actors: SupplyChainActor[];
    traceLog: SupplyChainTrace[];
}

export interface SupplyChainActor {
    actorId: string;
    name: string;
    type: string;
    location: string;
    contact: string;
    email: string;
    activity: SupplyChainActivity[];
}

export interface SupplyChainActivity {
    activityId: string;
    type: string;
    timestamp: string;
    documents?: Document[];
}

export interface SupplyChainTrace {
    traceID: string;
    actorRole: string;
    companyName: string;
    location: string;
    coords: [number, number];
    logistics: SupplyChainLogistics;
}

export interface SupplyChainLogistics {
    mode?: string;
    carrier?: string;
    departureDate?: string;
    arrivalDate?: string;
    departureLocation?: string;
    departureCoords?: [number, number];
    arrivalLocation?: string;
    arrivalCoords?: [number, number];
    temperatureCond?: string;
}
