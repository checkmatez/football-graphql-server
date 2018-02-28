const fetch = require('node-fetch')
const winston = require('winston')

const { BASE_URL } = require('../../constants')

const createAnswer = async (
  parent,
  { disputeId, comment, amount },
  { accessToken }
) => {
  try {
    const response = await fetch(`${BASE_URL}/disputes/respond`, {
      method: 'PUT',
      body: JSON.stringify({ disputeId, comment, amount }),
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

module.exports = createAnswer