/**
 * Represents the structure of a ZAP Report
 */
type ZapReport = {
    scanId: string,
    scanUrl: string,
    title: string,
    description: string,
    solution: string,
    score: number,
    reference: string
}

/**
 * Represents the amount (in number) of vulnerabilities of each type, including a sum of these types
 */
type SeverityCount = {
    critical: number,
    high: number,
    medium: number,
    low: number,
    info: number,
    total: number,
}

/**
 * Represents the structure of a detailed ZAP Report
 */
type ZAPScan = {
    vulnId: string,
    scanId: string,
    scanUrl: string,
    title: string,
    vulnScore: number,
    description: string | null,
    solution: string | null,
    reference: string | null
}

/**
 * Represents the structure of a WebScan 
 */
type WebScan = {
    scanId: string,
    scanUrl: string,
    scanDate: Date,
    projectId: string,
    vulnTotal: number,
    vulnCritical: number,
    vulnHigh: number,
    vulnMedium: number,
    vulnLow: number,
    vulnInfo: number,
    createdTime: Date,
    isActive: boolean,
    organizationOrgId: string | null 
}

type SeverityType = 'Info' | 'Low' | 'Medium' | 'High'| 'Critical' | undefined


export { ZapReport, SeverityCount, ZAPScan, WebScan, SeverityType }