'use client'

import { Row, Col } from 'react-bootstrap'
import { PageTitle } from '..'
import LineChart from './LineChart'
import BarChart from './BarChart'
import DonutChart from './DonutChart'
import RadarChart from './RadarChart'
import BubbleChart from './BubbleChart'

export default function ChartJs() {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Charts', path: '/features/charts/chartjs' },
          { label: 'Chartjs', path: '/features/charts/chartjs', active: true }
        ]}
        title={'Chartjs Charts'}
      />

      <Row>
        <Col xl={6}>
          <LineChart />
        </Col>

        <Col xl={6}>
          <BarChart />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <DonutChart />
        </Col>

        <Col xl={6}>
          <RadarChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BubbleChart />
        </Col>
      </Row>
    </>
  )
}
