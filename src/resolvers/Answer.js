const fetch = require('node-fetch')
const winston = require('winston')

const baseUrl = 'https://api.football.dev.highglossy.com'

module.exports = {
  createdAt: ({ respondedAt }) =>
    `${respondedAt.substr(0, 10)}T${respondedAt.substr(11)}Z`,
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
  dispute: async ({ disputeId }, args, { accessToken }) => {
    try {
      const response = await fetch(`${baseUrl}/disputes/?id=${disputeId}`, {
        headers: { Authorization: accessToken }
      })
      const result = await response.json()
      if (result.error) {
        winston.error(result.error.message, result)
        throw new Error(result.error.message || 'Server error')
      }
      return result.data
    } catch (error) {
      throw error
    }
  }
}
