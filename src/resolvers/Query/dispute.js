const fetch = require('node-fetch')
const querystring = require('querystring')
const winston = require('winston')

const { BASE_URL } = require('../../constants')

const dispute = async (parent, { id }, { accessToken }) => {
  try {
    const url = `${BASE_URL}/disputes?${querystring.stringify({ id })}`
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

module.exports = dispute