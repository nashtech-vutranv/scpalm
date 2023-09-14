'use client'
import { Form } from 'react-bootstrap'

export default function Select({ options }: any) {
  return (
    <Form.Select className="custom-select" aria-label="Default select example">
      {options.map((option: any, idx: number) => (
        <option key={`idx-${idx}`}>{option.label}</option>
      ))}
    </Form.Select>
  )
}
