import fetch from 'node-fetch'
import querystring from 'querystring'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const deleteDispute = async (parent, { id }, { accessToken }) => {
  try {
    const url = `${BASE_URL}/disputes?${querystring.stringify({ id })}`
    const response = await fetch(url, {
      method: 'DELETE',
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

export default deleteDispute