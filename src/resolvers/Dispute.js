const fetch = require('node-fetch')
const querystring = require('querystring')
const winston = require('winston')

const { BASE_URL } = require('../constants')

const Dispute = {
  createdAt: ({ createdAt }) =>
    `${createdAt.substr(0, 10)}T${createdAt.substr(11)}Z`,
  updatedAt: ({ updatedAt }) =>
    `${updatedAt.substr(0, 10)}T${updatedAt.substr(11)}Z`,
  state: ({ state }) => state.toUpperCase(),
  result: ({ result }) => (result ? result.toUpperCase() : null),
  confirmation: ({ confirmation }) =>
    confirmation ? confirmation.toUpperCase() : null,
  creator: ({ user }) => user,
  answers: ({ responses }) => responses || [],
  match: async ({ match, matchId }, args, { accessToken }) => {
    if (match) {
      return match
    }
    const params = querystring.stringify({
      championatId: matchId
    })
    const url = `${BASE_URL}/matches?${params}`
    winston.info('url', url)
    try {
      const response = await fetch(url, {
        headers: { Authorization: accessToken }
      })
      const result = await response.json()
      if (result.error) {
        throw new Error(result.error.message || 'Server error')
      }
      winston.info('result', JSON.stringify(result, null, 2))
      return result.data.find(m => m.championatId === matchId)
    } catch (error) {
      throw error
    }
  }
}

module.exports = Dispute
