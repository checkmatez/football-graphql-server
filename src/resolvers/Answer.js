const fetch = require('node-fetch')

const baseUrl = 'https://api.football.dev.highglossy.com'

module.exports = {
  state: ({ state }) => state.toUpperCase(),
  creator: async ({ userId }, args, { accessToken }) => {
    try {
      const response = await fetch(`${baseUrl}/ratings?id=${userId}`, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
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
  // dispute: async ({ disputeId }) => {
  //   try {
  //     const response = await fetch(`${baseUrl}/ratings?id=${userId}`, {
  //       headers: {
  //         Authorization: accessToken,
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const result = await response.json()
  //     if (result.error) {
  //       throw new Error(result.error.message || 'Server error')
  //     }
  //     return result.data.user
  //   } catch (error) {
  //     throw error
  //   }
  // },
}
