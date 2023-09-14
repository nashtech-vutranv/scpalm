'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, Table } from 'react-bootstrap'
import { convertSeverity } from '@/helpers'

export default function VulTable({ data, scanUrl, onSelectZapScan }: any) {
  const dataRef = useRef(data)
  const [vulnScans, setVulnScans] = useState(data)

  useEffect(() => {
    scanUrl !== '' &&
      setVulnScans(
        dataRef.current
          ? dataRef.current
              .filter((item: any) => item.scanUrl === scanUrl)
              .sort((a: any, b: any) => b.vulnScore - a.vulnScore)
          : []
      )
  }, [scanUrl])

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Vulnerabilities Table</h4>
        <div className="table-custom-layout">
          <Table
            className="table-centered mb-0"
            style={{
              height: '400px',
              display: 'block',
              overflowY: `${vulnScans.length > 7 ? 'scroll' : 'auto'}`
            }}>
            <thead className="table-dark">
              <tr>
                <th>Ref.</th>
                <th>Vulnerability</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vulnScans &&
                vulnScans.map((item: any, index: number) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectZapScan(item.title)}>
                      <th scope="row">{index + 1}</th>
                      <td>{item && item.title}</td>
                      <td
                        className={convertSeverity(
                          item.vulnScore
                        ).toLowerCase()}
                        style={{
                          fontWeight: 'bold'
                        }}>
                        {item && convertSeverity(item.vulnScore)}
                      </td>
                      <td>{''}</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  )
}
