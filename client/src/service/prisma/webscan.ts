import { PrismaClient } from '@prisma/client'

export default class WebScanService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getWebScans(): Promise<any> {
    try {
      const webscans = await this.prisma.webScanResults.findMany()

      return webscans
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getWebScansByProjectId(projectId: string): Promise<any> {
    try {
      const webscans = await this.prisma.webScanResults.findMany({
        where: {
          projectId
        }
      })

      return webscans
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
