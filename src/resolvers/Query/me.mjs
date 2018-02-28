import fetch from 'node-fetch'
import querystring from 'querystring'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const me = async (parent, args, { accessToken }) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: { Authorization: accessToken }
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

export default me