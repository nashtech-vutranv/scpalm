import { prisma } from "../../utils/dbconnect";
import { ZapReport, SeverityCount } from "../../utils/zap/types";

/**
 * Function to update the content of a specific vulnerability
 * @param object - Accepts a ZapReport
 */
async function updateVulnerability(vulnId: string, object: Omit<ZapReport, 'scanId'>): Promise<void> {
    await prisma.zAPScanResult.update({
        where: {
            vulnId: vulnId
        },
        data: {
            title: object.title,
            description: object.description,
            solution: object.solution,
            vulnScore: object.score,
            reference: object.reference
        }
    })
}

/**
 * Function to update the number of vulnerabilities, sorted by type and the sum of said types
 * @param scanId - Accepts a string of scanId to query
 * @param severity - Accepts an object of type SeverityCount
 */
async function updateVulnCount(scanId: string, severity: SeverityCount): Promise<void> {

    const updateRecord = await prisma.webScanResults.update({
      where: {
          scanId: scanId
      },
      data: {
          vulnTotal: severity.total,
          vulnCritical: severity.critical,
          vulnHigh: severity.high,
          vulnMedium: severity.medium,
          vulnLow: severity.low,
          vulnInfo: severity.info
      }
    })
}

export { updateVulnerability, updateVulnCount }
