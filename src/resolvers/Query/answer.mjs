import fetch from 'node-fetch'
import querystring from 'querystring'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const answer = async (parent, { id }, { accessToken }) => {
  try {
    const url = `${BASE_URL}/responses/?${querystring.stringify({ id })}`
    const response = await fetch(url, {
      headers: { Authorization: accessToken }
    })
    const result = await response.json()
    if (result.error) {
      throw new Error(result.error.message || 'Server error')
    }
    return result.data.find(ans => `${ans.id}` === id)
  } catch (error) {
    throw error
  }
}

export default answer