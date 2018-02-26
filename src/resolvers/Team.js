const { IMAGES_HOST } = require('../constants')

module.exports = {
  id: ({ championatId }) => championatId,
  league: ({ leagueName }) => leagueName.toUpperCase(),
  logo: ({ logo }) => `${IMAGES_HOST}${logo}`
}
