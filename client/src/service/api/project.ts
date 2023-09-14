export default class ProjectScanService {
  async getAllProjects(): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetAllProjects`
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }

  async getProjectById(projectId: string): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetAllProjects/${projectId}`
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }

  async getSpecifyProject(): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetAllProjects`
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = await response.json()
      return data[0]
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }

  async getLatestWebScanId(): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetLatestWebScanId`
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }

  async getWebScanByUrl(scanUrl: string): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetScansByUrl/${scanUrl}`
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }
}
