import fetch from 'node-fetch'
import querystring from 'querystring'
import winston from 'winston'

import { BASE_URL } from '../constants.mjs'
import { getSaneDate } from '../utils.mjs'

const Dispute = {
  createdAt: ({ createdAt }) => getSaneDate(createdAt),
  updatedAt: ({ updatedAt }) => getSaneDate(updatedAt),
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
    try {
      const response = await fetch(url, {
        headers: { Authorization: accessToken }
      })
      const result = await response.json()
      if (result.error) {
        throw new Error(result.error.message || 'Server error')
      }
      return result.data.find(m => m.championatId === matchId)
    } catch (error) {
      throw error
    }
  }
}

export default Dispute
