import fetch from 'node-fetch'
import querystring from 'querystring'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const answers = async (
  parent,
  { pagination, creatorId, states, disputeStates },
  { accessToken }
) => {
  const params = querystring.stringify({
    start: pagination.start,
    limit: pagination.limit,
    ...(creatorId && { userId: creatorId }),
    ...(states && { state: states.join(',').toLowerCase() }),
    ...(disputeStates && {
      disputeState: disputeStates.join(',').toLowerCase()
    })
  })
  const url = `${BASE_URL}/responses?${params}`
  try {
    const response = await fetch(url, {
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

export default answers
