import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

class AmountExceededError extends Error {
  constructor(amountAvailable) {
    super(`Превышена ставка, доступное количество: ${amountAvailable}`)
  }
}

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
      if (result.error.code === 103) {
        throw new AmountExceededError(result.error.amountAvailable)
      }
      throw new Error(result.error.message)
    }
    return result.data
  } catch (error) {
    winston.error(error)
    throw error
  }
}

export default createAnswer
