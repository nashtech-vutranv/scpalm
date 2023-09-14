import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { prisma } from "../../utils/dbconnect"
import { ZapReport } from "../../utils/zap/types"
import { updateVulnCount } from "./update.service"
import { getSumSeverity } from "./utils.service"
import { log } from "../../utils/logger"

/**
 * Function to save the content of a report file to the database
 * @param object - Accepts an array of type ZapReport[]
 */
async function saveReportDb(object: ZapReport[]): Promise<void> {
    const records = object.map(zapReport => ({
        scanId: zapReport.scanId,
        scanUrl: zapReport.scanUrl,
        title: zapReport.title,
        description: zapReport.description,
        solution: zapReport.solution,
        reference: zapReport.reference,
        vulnScore: Number(zapReport.score)
    }))

    try {
        await prisma.zAPScanResult.createMany({
            data: records,
            // skipDuplicates: true
        })    
    } catch (err: any) {
        if (err instanceof PrismaClientKnownRequestError) {
            throw err
        }
        throw err
    }

    /**
     * This part of the function will perform update and syncs up the actual amount of vulnerabilities by type to the WebScan table
     */
    const _scanId = object[0].scanId
    const _scanUrl = object[0].scanUrl

    const sevCount = await getSumSeverity(_scanUrl)
    const sync = await updateVulnCount(_scanId, sevCount)
}

export { saveReportDb }