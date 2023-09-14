'use client'

import React from 'react'
import { Card } from 'react-bootstrap'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { convertPolarChartData } from '@/helpers'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

interface IPolarChart {
  title: string
  data: any
  scanId: string
}

export default function PolarChart({ title, data, scanId }: IPolarChart) {
  const polarChartOpts: ChartOptions<'polarArea'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      }
    }
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">{title}</h4>

        <div
          className="chartjs-chart"
          style={{ height: '400px', maxWidth: '100%' }}>
          <PolarArea
            data={convertPolarChartData(data, scanId)}
            options={polarChartOpts}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
