import { ZapReport } from './types'
import { SeverityType } from './types'
import { log } from '../logger'

import jsdom from 'jsdom'
import xml2js from 'xml2js'


const filterReportBySeverity = (severity: SeverityType, zapReports: ZapReport[]) => {
    switch(severity) {
        case undefined: return zapReports
        case 'Info': return zapReports.filter(report => Number(report.score) === 0)
        case 'Low': return zapReports.filter(report => Number(report.score) === 1)
        case 'Medium': return zapReports.filter(report => Number(report.score) === 2)
        case 'High': return zapReports.filter(report => Number(report.score) === 3)
        case 'Critical': return zapReports.filter(report => Number(report.score) === 4)
        default: return zapReports
    }
}

async function parseZapXML(id: string, fileBuffer: Buffer | undefined, severity: SeverityType): Promise<ZapReport[]> {
    const zapReports: ZapReport[] = []
    const dom = new jsdom.JSDOM(fileBuffer)

    const url = dom.window.document.querySelector('site')!.getAttribute('name')

    const vulnerability = dom.window.document.querySelectorAll('alertitem')

    vulnerability.forEach((reports: any) => {
        const report: ZapReport = {
            scanId: id,
            scanUrl: url!,
            title: reports.querySelector('name')?.textContent,
            description: reports.querySelector('desc')?.textContent,
            solution: reports.querySelector('solution')?.textContent,
            reference: reports.querySelector('reference')?.textContent,
            score: Number(reports.querySelector('riskcode')?.textContent),
        }
        zapReports.push(report)
    })

    return filterReportBySeverity(severity, zapReports)
}

async function parseZAPJson(id: string, fileBuffer: Buffer, severity: SeverityType): Promise<ZapReport[]> {
    const data = JSON.parse(fileBuffer.toString('utf8'))
    const zapReports: ZapReport[] = []
    
    if (data.OWASPZAPReport && data.OWASPZAPReport.site) {
        const sites = data.OWASPZAPReport.site

        if (Array.isArray(sites)) {
            for (const site of sites) {
                const url = site.$.name
                if (site.alerts) {
                    const alerts = site.alerts

                    if (Array.isArray(alerts)) {
                        for (const alert of alerts) {
                            if (alert.alertitem) {
                                for (const alertItem of alert.alertitem) {
                                    const zapReport: ZapReport = {
                                        scanId: id,
                                        scanUrl: url,
                                        title: alertItem.name[0],
                                        score: alertItem.riskcode[0],
                                        description: alertItem.desc[0],
                                        solution: alertItem.solution[0],
                                        reference: alertItem.reference[0],
                                    }
                                    zapReports.push(zapReport)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    const results = filterReportBySeverity(severity, zapReports)
    return Promise.resolve(results)
}

function isJSONFormat(fileBuffer: Buffer): Boolean {
    try {
        JSON.parse(fileBuffer.toString())
        return true
    } catch (err: any) {
        return false
    }
}

function isXMLFormat(fileBuffer: Buffer): Boolean {
    const content = fileBuffer.toString()

    if (content.trim().startsWith('<?xml')) {
        const parser = new xml2js.Parser({
            explicitRoot: false,
            explicitArray: false,
            mergeAttrs: true
        })
        
        try {
            parser.parseString(fileBuffer)
            return true
        } catch (error: any) {
            return false
        }
    }

    return false
}

export { parseZapXML, parseZAPJson, isJSONFormat, isXMLFormat }