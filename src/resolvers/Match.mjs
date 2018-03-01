import { getSaneDate } from '../utils.mjs'

const Match = {
  id: ({ championatId }) => championatId,
  startedAt: ({ startedAt }) => getSaneDate(startedAt),
  state: ({ state }) => state.toUpperCase()
}

export default Match
