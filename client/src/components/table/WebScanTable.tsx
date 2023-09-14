'use client'

import { Card, Table } from 'react-bootstrap'

export default function WebScanTable(props: any) {
  const { data, onChangeWebUrl } = props

  const handleChooseWebUrl = (scanId: string, scanUrl: string) => {
    onChangeWebUrl(scanId, scanUrl)
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Web Scans Result</h4>

        <Table className="table-centered mb-0" style={{ height: '400px' }}>
          <thead className="table-light">
            <tr>
              <th>WEB SITE URL</th>
              <th>LAST REPORT</th>
              <th>LAST AUDIT TRIGGERED</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => {
              return (
                <tr key={item.scanId}>
                  <td>
                    <a
                      href="#"
                      onClick={() =>
                        handleChooseWebUrl(item.scanId, item.scanUrl)
                      }>
                      {item.scanUrl}
                    </a>
                  </td>
                  <td>{item.scanDate.toString()}</td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
