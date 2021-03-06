import fetch from 'node-fetch'
import winston from 'winston'

import { BASE_URL } from '../../constants.mjs'

const loginByPin = async (parent, { phone, pinCode }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: phone,
        password: `${pinCode}`
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    if (result.error) {
      throw new Error(result.error.message || 'Server error')
    }
    return {
      accessToken: result.data.accessToken,
      currentUser: result.data.user
    }
  } catch (error) {
    throw error
  }
}

export default loginByPin