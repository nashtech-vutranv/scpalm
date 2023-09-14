export default class OrganizationService {
  async getAllOrganizations(): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SEVER_URL}/GetAllOrganizations`
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

  async getOrganizationById(orgId: string): Promise<any[] | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SEVER_URL}/GetOrganizationById/${orgId}`
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
