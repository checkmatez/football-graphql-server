export const IMAGES_HOST =
  'https://cdn.football.highglossy.com/72x72/ch/img.championat.com'

export const BASE_URL =
  process.env.STAGE === 'dev'
    ? 'https://api.football.dev.highglossy.com'
    : 'https://api.football.highglossy.com'
