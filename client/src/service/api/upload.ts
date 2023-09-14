export default class UploadService {
  async uploadFile(formData: any): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/uploadReport`,
        {
          method: 'POST',
          body: formData
        }
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      console.log('Success upload file')
    } catch (error: any) {
      console.error('Error upload file:', error)
      throw error
    }
  }
}
