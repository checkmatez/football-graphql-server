const fetch = require('node-fetch')
const winston = require('winston')

const { BASE_URL } = require('../../constants')

const confirmAnswer = async (parent, { id, confirmation }, { accessToken }) => {
  try {
    const response = await fetch(`${BASE_URL}/confirm/response`, {
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

module.exports = confirmAnswer