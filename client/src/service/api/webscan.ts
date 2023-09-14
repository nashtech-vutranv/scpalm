export default class WebScanService {
  async getAllWebScans(): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetAllWebScans`
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

  async getWebScansByProjectId(projectId: string): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetWebScansByProjectId`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ projectId })
        }
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

  async getWebScanById(selectedScanId: string): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetWebScansByScanId`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ scanId: selectedScanId })
        }
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

  async getLatestWebScan(): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/GetLatestWebScanId`
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
