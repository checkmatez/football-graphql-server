const fetch = require('node-fetch')
const querystring = require('querystring')
const winston = require('winston')

const { BASE_URL } = require('../../constants')

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

module.exports = me