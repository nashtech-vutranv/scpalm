import { PrismaClient } from '@prisma/client'

export default class UserService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getUsers(): Promise<any> {
    try {
      const users = await this.prisma.user.findMany()

      return users
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
