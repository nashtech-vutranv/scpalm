import { SeverityColor } from '@/appConstants'

export const convertSeverity = (severityNumber: number) => {
  switch (severityNumber) {
    case 0:
      return 'INFO'
    case 1:
      return 'LOW'
    case 2:
      return 'MEDIUM'
    case 3:
      return 'HIGH'
    case 4:
      return 'CRITICAL'
    default:
      return 'INFO'
  }
}

export const detectSeverityColor = (severityNumber: number) => {
  switch (severityNumber) {
    case 0:
      return `${SeverityColor.INFO} !important`
    case 1:
      return `${SeverityColor.LOW} !important`
    case 2:
      return `${SeverityColor.MEDIUM} !important`
    case 3:
      return `${SeverityColor.HIGH} !important`
    case 4:
      return `${SeverityColor.CRITICAL} !important`
    default:
      return `${SeverityColor.INFO} !important`
  }
}

export const convertPolarChartData = (data: any, scanId: string) => {
  const scanData = data?.find((item: any) => item.scanId === scanId)
  return {
    datasets: [
      {
        data: !scanData
          ? []
          : [
              scanData.vulnCritical,
              scanData.vulnHigh,
              scanData.vulnMedium,
              scanData.vulnLow,
              scanData.vulnInfo
            ],
        backgroundColor: [
          SeverityColor.CRITICAL,
          SeverityColor.HIGH,
          SeverityColor.MEDIUM,
          SeverityColor.LOW,
          SeverityColor.INFO
        ],
        hoverBackgroundColor: [
          SeverityColor.CRITICAL,
          SeverityColor.HIGH,
          SeverityColor.MEDIUM,
          SeverityColor.LOW,
          SeverityColor.INFO
        ],
        label: 'Vulnerabilites' // for legend
      }
    ],
    labels: ['Critical', 'High', 'Medium', 'Low', 'Info']
  }
}

export const convertChartData = (scanData: any) => {
  return {
    datasets: [
      {
        data: [
          scanData.vulnCritical,
          scanData.vulnHigh,
          scanData.vulnMedium,
          scanData.vulnLow,
          scanData.vulnInfo
        ],
        backgroundColor: [
          SeverityColor.CRITICAL,
          SeverityColor.HIGH,
          SeverityColor.MEDIUM,
          SeverityColor.LOW,
          SeverityColor.INFO
        ],
        hoverBackgroundColor: [
          SeverityColor.CRITICAL,
          SeverityColor.HIGH,
          SeverityColor.MEDIUM,
          SeverityColor.LOW,
          SeverityColor.INFO
        ],
        label: 'Vulnerabilites' // for legend
      }
    ],
    labels: ['Critical', 'High', 'Medium', 'Low', 'Info']
  }
}
