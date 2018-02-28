const fetch = require('node-fetch')
const winston = require('winston')

const { BASE_URL, API_KEY } = require('../../constants')

const sendPinCode = async (parent, { phone }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify({ username: phone, key: API_KEY }),
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

module.exports = sendPinCode
