import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const createDispute = async (parent, { matchId, text, amount }, { accessToken }) => {
  try {
    const response = await fetch(`${BASE_URL}/disputes`, {
      method: 'POST',
      body: JSON.stringify({ matchId, text, amount }),
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    if (result.error) {
      throw new Error(result.error.message || 'Server error')
    }
    return result.data
  } catch (error) {
    throw error
  }
}

export default createDispute