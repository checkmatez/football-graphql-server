module.exports = {
  id: ({ championatId }) => championatId,
  league: ({ leagueName }) => leagueName.toUpperCase(),
}
