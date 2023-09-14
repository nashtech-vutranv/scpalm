import { PrismaClient } from '@prisma/client'

export default class ZAPScanService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getZapScans(): Promise<any> {
    try {
      const zapScans = await this.prisma.zAPScanResult.findMany()
      return zapScans
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getZapScansByWebScanIdAndUrl(
    scanId: string,
    scanUrl: string
  ): Promise<any> {
    try {
      const zapScans = await this.prisma.zAPScanResult.findMany({
        where: {
          scanId,
          scanUrl
        }
      })

      return zapScans
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
