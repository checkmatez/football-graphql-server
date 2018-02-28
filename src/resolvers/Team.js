const { IMAGES_HOST } = require('../constants')

const Team = {
  id: ({ championatId }) => championatId,
  league: ({ leagueName }) => leagueName.toUpperCase(),
  logo: ({ logo }) => `${IMAGES_HOST}${logo}`,
}

module.exports = Team