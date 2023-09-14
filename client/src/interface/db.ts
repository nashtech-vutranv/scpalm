type Role = 'USER' | 'ADMIN'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: Role
  orgId: string
  Project: Project
  Organization: Organization
}

interface Project {
  id: string
  pName: string
  pOwner: string
  pStatus: string
  orgId: string
  userId: string
  Organization: Organization
  User: User
  WebScanResults: WebScanResults[]
}

interface Organization {
  orgId: string
  name: string
  description?: string
  logo?: string
  contact: string
  address: string
  Project: Project[]
  User: User[]
  WebScanResults: WebScanResults[]
}

interface WebScanResults {
  scanId: string
  scanUrl: string
  scanDate: string
  projectId: string
  vulnTotal: number
  vulnCritical: number
  vulnHigh: number
  vulnMedium: number
  vulnLow: number
  vulnInfo: number
  createdTime: string
  isActive: boolean
  organizationOrgId?: string
  Organization: Organization
  Project: Project
  ZAPScanResult: ZAPScanResult[]
}

interface ZAPScanResult {
  vulnId: string
  scanId: string
  scanUrl: string
  title: string
  solution?: string
  description?: string
  instance?: string
  reference?: string
  vulnScore: number
  WebScanResults: WebScanResults
}

export type { User, Organization, Project, WebScanResults, ZAPScanResult }
