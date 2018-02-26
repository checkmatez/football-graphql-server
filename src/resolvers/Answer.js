const fetch = require('node-fetch')

const baseUrl = 'https://api.football.dev.highglossy.com'

module.exports = {
  createdAt: ({ respondedAt }) => respondedAt,
  state: ({ state }) => state.toUpperCase(),
  creator: async ({ userId }, args, { accessToken }) => {
    try {
      const response = await fetch(`${baseUrl}/ratings?id=${userId}`, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      if (result.error) {
        throw new Error(result.error.message || 'Server error')
      }
      return result.data.user.user
    } catch (error) {
      throw error
    }
  },
  dispute: async (parent, { disputeId }, { accessToken }) => {
    try {
      const response = await fetch(`${baseUrl}/disputes/?id=${disputeId}`, {
        headers: { Authorization: accessToken }
      })
      const result = await response.json()
      if (result.error) {
        throw new Error(result.error.message || 'Server error')
      }
      console.log('result', result)
      return result.data
    } catch (error) {
      throw error
    }
  }
}
