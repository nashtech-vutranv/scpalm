import { prisma } from "../../utils/dbconnect"
import { SeverityCount } from "../../utils/zap/types"

/**
 * Function returns an object containing the amount of vulnerabilities, sorted by types and the sum of said types
 * @param scanUrl - Accepts a string that is the url to query
 * @returns an object of type SeverityCount
 */
async function getSumSeverity(scanUrl: string): Promise<SeverityCount> {
    const counts = await prisma.zAPScanResult.groupBy({
    by: ['vulnScore'],
    where: {
        scanUrl: scanUrl
    },
    _count: {
      vulnScore: true
    }
    })

    const critical = counts.find((count) => count.vulnScore === 4)?._count?.vulnScore || 0
    const high = counts.find((count) => count.vulnScore === 3)?._count?.vulnScore || 0
    const medium = counts.find((count) => count.vulnScore === 2)?._count?.vulnScore || 0
    const low = counts.find((count) => count.vulnScore === 1)?._count?.vulnScore || 0
    const info = counts.find((count) => count.vulnScore === 0)?._count?.vulnScore || 0
    const total = critical + high + medium + low + info
    
    const sevCount: SeverityCount = {
        critical: critical,
        high: high,
        medium: medium,
        low: low,
        info: info,
        total: total
    }

    return Promise.resolve(sevCount)
}

export { getSumSeverity }