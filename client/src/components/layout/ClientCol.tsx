'use client'

import { Col } from 'react-bootstrap'

export default function ClientCol(props: any) {
  return <Col {...props}>{props.children}</Col>
}
