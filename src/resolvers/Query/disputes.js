const fetch = require('node-fetch')
const querystring = require('querystring')
const winston = require('winston')

const { BASE_URL } = require('../../constants')

const disputes = async (parent, { pagination, creatorId }, { accessToken }) => {
  const params = querystring.stringify({
    start: pagination.start,
    limit: pagination.limit,
    ...(creatorId && { userId: creatorId })
  })
  const url = `${BASE_URL}/disputes?${params}`
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

module.exports = disputes