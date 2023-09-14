'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'

interface IZAPCard {
  title: string
  data: any
  scanUrl: string
  scanTitle: string
}

export default function ZAPCard({ title, data, scanUrl, scanTitle }: IZAPCard) {
  const dataRef = useRef(data)
  const [zapScans, setZapScans] = useState(data)

  useEffect(() => {
    scanUrl !== '' &&
      setZapScans(
        dataRef.current
          ? dataRef.current.filter((item: any) => item.scanUrl === scanUrl)
          : []
      )
  }, [scanUrl, data])

  useEffect(() => {
    scanUrl !== '' &&
      scanTitle !== '' &&
      setZapScans(
        dataRef.current
          ? dataRef.current.filter(
              (item: any) =>
                item.scanUrl === scanUrl && item.title === scanTitle
            )
          : []
      )
  }, [scanTitle, data])

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">{title}</h4>
        <div style={{ height: '400px', overflowY: 'scroll' }}>
          {zapScans &&
            zapScans.map((item: any) => {
              return (
                <>
                  <Card.Title
                    style={{
                      backgroundColor: 'orange',
                      padding: '8px 5px',
                      color: 'white'
                    }}>
                    {item.title}
                  </Card.Title>
                  <Card.Title
                    style={{
                      backgroundColor: '#eef2f7',
                      padding: '8px 0px 8px 5px'
                    }}>
                    {'Description'}
                  </Card.Title>
                  <Card.Text>{item.description || ''}</Card.Text>
                  <Card.Title
                    style={{
                      backgroundColor: '#eef2f7',
                      padding: '8px 0px 8px 5px'
                    }}>
                    {'Solution'}
                  </Card.Title>
                  <Card.Text>{item.solution || ''}</Card.Text>
                  <Card.Title
                    style={{
                      backgroundColor: '#eef2f7',
                      padding: '8px 0px 8px 5px'
                    }}>
                    {'Url'}
                  </Card.Title>
                  <Card.Text>{item.scanUrl}</Card.Text>
                  <Card.Title
                    style={{
                      backgroundColor: '#eef2f7',
                      padding: '8px 0px 8px 5px'
                    }}>
                    {'Reference'}
                  </Card.Title>
                  <Card.Text>{item.reference || ''}</Card.Text>
                  <Card.Title
                    style={{
                      backgroundColor: '#eef2f7',
                      padding: '8px 0px 8px 5px'
                    }}>
                    {'Instance'}
                  </Card.Title>
                  <Card.Text>{item.isntance || ''}</Card.Text>
                </>
              )
            })}
        </div>
      </Card.Body>
    </Card>
  )
}
