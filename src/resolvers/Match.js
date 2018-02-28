const Match = {
  id: ({ championatId }) => championatId,
  startedAt: ({ startedAt }) =>
    `${startedAt.substr(0, 10)}T${startedAt.substr(11)}Z`,
  state: ({ state }) => state.toUpperCase(),
}

module.exports = Match