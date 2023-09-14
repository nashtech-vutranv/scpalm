'use client'

import { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { UploadService } from '@/service/api'
import { Select, FormInput } from '@/components'
import { environments, reportTypes, minimumSeverities } from '@/appConstants'

const exampleScanId = '1b1a055e-1563-4dff-bc24-7260f0b796b4'

export default function Upload() {
  const [file, setFile] = useState<any>(null)

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e: any) => {
    if (!file) return
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('scanId', exampleScanId)

    await new UploadService().uploadFile(formData)
  }

  return (
    <>
      <br />
      <Row>
        <Col xl={6}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="environment" column md={3}>
                Environment
              </Form.Label>
              <Col md={9}>
                <Select options={environments} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="completeDate" column md={3}>
                Complete Date
              </Form.Label>
              <Col md={9}>
                <FormInput type="date" name="date" key="date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="reportType" column md={3}>
                Report type
              </Form.Label>
              <Col md={9}>
                <Select options={reportTypes} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="minimumSeverity" column md={3}>
                Minimum severity
              </Form.Label>
              <Col md={9}>
                <Select options={minimumSeverities} />
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formFile"
              className="mb-3"
              onChange={handleChangeFile}>
              <Form.Label>Choose report file</Form.Label>
              <Form.Control type="file" />
              <br />
              <div className="d-flex justify-content-end">
                <Button type="button" variant="info" onClick={handleSubmit}>
                  <i className="mdi mdi-cloud me-1"></i> <span>Upload</span>
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  )
}
