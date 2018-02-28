const fetch = require('node-fetch')
const querystring = require('querystring')
const winston = require('winston')

const { BASE_URL } = require('../../constants')

const answers = async (
  parent,
  { pagination, creatorId, states },
  { accessToken }
) => {
  const params = querystring.stringify({
    start: pagination.start,
    limit: pagination.limit,
    ...(creatorId && { userId: creatorId }),
    ...(states && { states: states.join(',').toLowerCase() })
  })
  const url = `${BASE_URL}/responses?${params}`
  winston.info('url', url)
  try {
    const response = await fetch(url, {
      headers: { Authorization: accessToken }
    })
    const result = await response.json()
    if (result.error) {
      throw new Error(result.error.message || 'Server error')
    }
    winston.info('result', result.data.length)
    return result.data
  } catch (error) {
    throw error
  }
}

module.exports = answers