import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const confirmDispute = async (
  parent,
  { id, confirmation },
  { accessToken }
) => {
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
      throw new Error(result.error.message || 'Server error')
    }
    return result.data
  } catch (error) {
    winston.error(error)
    throw error
  }
}

export default confirmDispute
