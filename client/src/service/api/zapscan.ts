export default class ZAPScanService {
  async getAllZapScans(): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetAllZapScans`
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

  async getZapScanById(id: string): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetZapScanByVulnId/${id}`
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

  async getZapScanByUrl(scanUrl: string): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetZapScanByScanUrl`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ scanUrl })
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

  async getZapScanByUrlAndScanId(
    scanUrl: string,
    scanId: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/GetZapScanByScanUrlId`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ scanUrl, scanId })
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
}
