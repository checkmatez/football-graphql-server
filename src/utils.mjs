/* eslint-disable import/prefer-default-export */
export const getSaneDate = insaneDate =>
  `${insaneDate.substr(0, 10)}T${insaneDate.substr(11)}Z`
