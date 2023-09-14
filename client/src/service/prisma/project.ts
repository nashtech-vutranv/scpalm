import { PrismaClient } from '@prisma/client'

export default class ProjectService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getProjects(): Promise<any> {
    try {
      const projects = await this.prisma.project.findMany()

      return projects
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async findProjectsById(userId: string): Promise<any> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          userId
        }
      })

      return projects
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
