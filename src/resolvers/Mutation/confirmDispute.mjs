import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const confirmDispute = async (parent, { id, confirmation }, { accessToken }) => {
  try {
    const response = await fetch(`${BASE_URL}/confirm/dispute`, {
      method: 'POST',
      body: JSON.stringify({ id, confirmation }),
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      }
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

export default confirmDispute