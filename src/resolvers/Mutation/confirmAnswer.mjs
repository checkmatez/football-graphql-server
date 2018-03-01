import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const confirmAnswer = async (parent, { id, confirmation }, { accessToken }) => {
  try {
    const response = await fetch(`${BASE_URL}/confirm/response`, {
      method: 'POST',
      body: JSON.stringify({ id, confirmation }),
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

export default confirmAnswer
