class FetchUser {
  static async getUser() {
    try {
      const response = await fetch(`/api/v1/current-user`)
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        return responseBody
      }
    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }
}

export default FetchUser