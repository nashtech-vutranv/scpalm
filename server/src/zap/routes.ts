import { Request, Response, Router } from "express"
import { getAllZapScans, getAllZapScansByScanId, getZapScanByVulnId, getZapScansByUrl, getAllWebScans, getWebScanById, getWebScansByProjectId } from "./service/vulnerability.service"
import { updateVulnerability } from "./service/update.service"
import { log } from "../utils/logger"
import { isJSONFormat, isXMLFormat, parseZAPJson, parseZapXML } from "../utils/zap/parser"
import { saveReportDb } from "./service/report.service"
import { getSumSeverity } from "./service/utils.service"
import { updateVulnCount } from "./service/update.service"
import { ZapReport } from "../utils/zap/types"
import { ReportType } from "../report.types"

import multer from "multer"
import { processZAPReport } from "../utils/zap/processReport"

const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

const zapRouter = Router()

zapRouter.get('/GetAllZapScans', async (req: Request, res: Response) => {
    try {
        const zapScans = await getAllZapScans()
        res.status(200).send(zapScans)
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

zapRouter.get('/GetScansById/:scanId', async (req: Request, res: Response) => {

    if (!req.params.scanId) {
        res.status(400).send('Missing Parameters')
    }

    try {
        const zapScansByScanId = await getAllZapScansByScanId(req.params.scanId)
        res.status(200).send(zapScansByScanId)
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

zapRouter.get('/GetZapScanByVulnId/:vulnId', async (req: Request, res: Response) => {
    if (!req.params.vulnId) {
        res.status(400).send('Missing Parameters')
    }

    try {
        const zapScanByVulnId = await getZapScanByVulnId(req.params.vulnId)
        res.status(200).send(zapScanByVulnId)
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

zapRouter.post('/GetZapScanByScanUrl', async (req: Request, res: Response) => {
    const { scanUrl } = req.body
    try {
        if (scanUrl) {
            const zapScansByUrl = await getZapScansByUrl(scanUrl)
            res.status(200).send(zapScansByUrl)
        }
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

zapRouter.post('/GetTotalVuln', async (req: Request, res: Response) => {
    const scanUrl: string = req.body.url

    try {
        const sevCount = await getSumSeverity(scanUrl)

        res.status(200).send({
            Total: sevCount.total,
            Critical: sevCount.critical,
            High: sevCount.high,
            Medium: sevCount.medium,
            Low: sevCount.low,
            Info: sevCount.info
        })
    } catch (error: any) {
        log.info(error)
        res.status(500).send({ message: 'Something Went Wrong.'})
    }
})

zapRouter.post('/SyncTotalVuln', async (req: Request, res: Response) => {
    const scanId: string = req.body.scanId
    const scanUrl: string = req.body.url

    try {
        const sevCount = await getSumSeverity(scanUrl)

        updateVulnCount(scanId, sevCount)

        res.status(200).send({ message: "Vulnerabilities Count Updated!" })
    } catch (error: any) {
        log.info(error)
        res.status(500).send({ message: 'Something Went Wrong.'})
    }
})

zapRouter.get('/GetAllWebScans', async (req: Request, res: Response) => {
    try {
        const webScans = await getAllWebScans()
        res.status(200).send(webScans)
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

zapRouter.post('/GetWebScansByProjectId', async (req: Request, res: Response) => {
    const { projectId } = req.body
    try {
        if (projectId) {
            const webScansByProjectId = await getWebScansByProjectId(projectId)
            res.status(200).send(webScansByProjectId)
        }
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

zapRouter.post('/GetWebScansByScanId', async (req: Request, res: Response) => {
    const { scanId } = req.body
    try {
        if (scanId) {
            const webScansByScanId = await getWebScanById(scanId)
            res.status(200).send(webScansByScanId)
        }
    } catch (error: any) {
        res.status(500).send({ error: 'Something Went Wrong.'})
        log.info(error)
    }
})

const zapReportProcessing = Router()

zapReportProcessing.post('/uploadReport', upload.single('file'), async (req: Request, res: Response) => {

    if (!req.file) {
        res.send({ mesasge: "No File Received"})
    } else {
        const buffer = req.file.buffer
        const scanId = req.body['scanId']
        const severity = req.body['severity']
        const reportType: string = req.body['reportType']

        if (!(reportType in ReportType) && reportType === '') {
            res.status(400).send({ message: 'Missing Parameters' })
            return
        }

        switch(reportType) {
            case ReportType.ZAP:
                try {
                    await processZAPReport(buffer, scanId, severity)
                    res.status(200).send({ message: `${reportType} Report Uploaded`})
                } catch (err: any) {
                    log.info(err)
                    res.status(400).send({ message: err})
                }
                break
            case ReportType.SonarQube:
                res.status(200).send({ message: 'SonarQube Report' })
                break
            default:
                res.status(200).send({ message: 'Invalid Report Type' })
                return
        }
    }
})

zapReportProcessing.post('/updateVuln', async (req: Request, res: Response) => {
    const { vulnId, scanUrl, title, description, solution, score, reference } = req.body

    const updateData: Omit<ZapReport, 'scanId'> = {
        scanUrl: scanUrl,
        title: title,
        description: description,
        solution: solution,
        score: Number(score),
        reference: reference
    }

    const updateVuln = await updateVulnerability(vulnId, updateData)

    res.status(200).send({ message: "Updated With New Data!", data: updateData })
})

export { zapRouter, zapReportProcessing }