module.exports = {
  id: ({ championatId }) => championatId,
  startedAt: ({ startedAt }) =>
    `${startedAt.substr(0, 10)}T${startedAt.substr(11)}Z`,
}