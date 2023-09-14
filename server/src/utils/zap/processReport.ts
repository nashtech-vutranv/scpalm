import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { saveReportDb } from "../../zap/service/report.service"
import { log } from "../logger"
import { isJSONFormat, isXMLFormat, parseZAPJson, parseZapXML } from "./parser"
import { SeverityType } from "./types"

async function processZAPReport(buffer: Buffer, scanId: string, severity: SeverityType) {
    try {
        if (isJSONFormat(buffer)) {
            const parsedReport = await parseZAPJson(scanId, buffer, severity)
            await saveReportDb(parsedReport)
        } else if (isXMLFormat(buffer)) {
            const parsedReport = await parseZapXML(scanId, buffer, severity)
            await saveReportDb(parsedReport)
        } else {
            throw 'Invalid Report Format'
        }
    } catch (error: any) {
        if (error instanceof Error || PrismaClientKnownRequestError) {
            throw error
        }
        throw error
    }
}

export { processZAPReport }