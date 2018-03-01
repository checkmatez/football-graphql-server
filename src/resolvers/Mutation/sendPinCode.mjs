import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const sendPinCode = async (parent, { phone }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify({ username: phone, key: process.env.AUTH_API_KEY }),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    if (result.error) {
      throw new Error(result.error.message || 'Server error')
    }
    return parseInt(result.data.PIN, 10)
  } catch (error) {
    throw error
  }
}

export default sendPinCode
