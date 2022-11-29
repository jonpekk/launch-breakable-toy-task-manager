class FetchBoards {
  static async getBoards() {
    try {
      const response = await fetch('/api/v1/boards')
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

  static async getIndividualBoard(urlParam) {
    try {
      const response = await fetch(`/api/v1/boards/${urlParam}`)
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

  static async patchCard(payload) {
    try {
      const response = await fetch(`/api/v1/boards/${payload.card.board}/cards/${payload.card.id}`, {
        credentials: "same-origin",
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
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

export default FetchBoards