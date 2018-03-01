import fetch from 'node-fetch'

import { BASE_URL } from '../constants.mjs'
import { getSaneDate } from '../utils.mjs'

const Answer = {
  createdAt: ({ respondedAt }) => getSaneDate(respondedAt),
  state: ({ state }) => state.toUpperCase(),
  creator: async ({ user, userId }, args, { accessToken }) => {
    if (user) {
      return user
    }
    /* TODO: if no user is present, we have to fetch him by userId,
       but at the moment there is no such route. Most probably,
       user isn't present because we just created Answer, so
       we set creator as current user. */
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
}

export default Answer
