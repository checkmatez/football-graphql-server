import { IMAGES_HOST } from '../constants.mjs'

const Team = {
  id: ({ championatId }) => championatId,
  league: ({ leagueName }) => leagueName.toUpperCase(),
  logo: ({ logo }) => `${IMAGES_HOST}${logo}`
}

export default Team
