// Root model
export interface IPMPModel {
    IPMP: IPMP;
}

export interface IPMP {
    passID: string;
    creationDate: string;
    validityPeriod: string;
    insectProtein: InsectProtein;
    qualityAssessment: QualityAssessment;
    SustainabilityReq: SustainabilityReq;
    regCertifs: RegCertif[];
    supplyChain: SupplyChain;
}

// Insect Protein Section
export interface InsectProtein {
    insectName: string;
    insectSpecies: InsectSpecies;
    batchID: string;
    batchSize: number;
    specInfo: SpecInfo;
    rearInfo: RearInfo[];
}

export interface InsectSpecies {
    genus: string;
    species: string;
}

export interface SpecInfo {
    feedType: string;
    feedSource: string[];
    manufacturingDate: string;
    feedConversionRatio: number;
    expiryDate: string;
}

export interface RearInfo {
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

// Quality Assessment Section
export interface QualityAssessment {
    assessmentID: string;
    assessDate: string;
    procFacility: ProcFacility;
    labTestReports: LabTestReport[];
    storeHandleReq: StoreHandleReq;
}

export interface ProcFacility {
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
}

export interface LabFacility {
    labID: string;
    labName: string;
    labLocation: string;
    approvalNumber: string;
}

// Some test parameters use different property names; both options are allowed.
export interface TestParameter {
    // Either form may be present in your JSON
    paramID?: string;
    parameterId?: string;
    paramName?: string;
    parameterName?: string;
    testingMethod?: string;
    method?: string;
    result: number;
    unit: string;
}

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
    manufacturerDetails: ManufacturerDetails;
    importerDetails: ImporterDetails;
    analyticalComponent: AnalyticalComponent;
}

export interface ManufacturerDetails {
    name: string;
    address: string;
    email: string;
}

export interface ImporterDetails {
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

// Sustainability Requirement Section
export interface SustainabilityReq {
    susID: string;
    susDescription: string;
    resourceUse: ResourceUse;
    environmentalImpact: EnvironmentalImpact;
    circularity: Circularity;
    socialAndEconomicImpact: SocialAndEconomicImpact;
    SustReport: SustReport;
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
    wasteReductionStrategy: string;
    contributionCE: string;
}

export interface SocialAndEconomicImpact {
    labourStandards: string;
    costSavings: string;
    humanHealthMonitoring: string;
}

export interface SustReport {
    reportID: string;
    generatedDate: string;
    summary: string;
    resourceUseSummary: string;
    environmentalImpactSummary: string;
    socialEconomicImpactSummary: string;
    circularitySummary: string;
}

// Regulatory Certifications Section
export interface RegCertif {
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

export interface Document {
    documentID: string;
    documentType: string;
    fileName: string;
    filePath: string;
    URL: string;
}

// Supply Chain Section
export interface SupplyChain {
    SupplyChainID: string;
    description: string;
    actors: Actor[];
    traceLog: TraceLog[];
}

export interface Actor {
    actorId: string;
    name: string;
    type: string;
    location: string;
    contact: string;
    activity: Activity[];
}

export interface Activity {
    activityId: string;
    type: string;
    timestamp: string;
    performedBy: string;
    documents?: Document[];
}

export interface TraceLog {
    traceID: string;
    actorRole: string;
    companyName: string;
    location: string;
    logistics: Logistics;
}

export interface Logistics {
    mode: string;
    carrier: string;
    departureDate: string;
    arrivalDate: string;
    departureLocation: string;
    arrivalLocation: string;
    temperatureCond: string;
}
