module.exports = {
  createdAt: ({ createdAt }) =>
    `${createdAt.substr(0, 10)}T${createdAt.substr(11)}Z`,
  updatedAt: ({ updatedAt }) =>
    `${updatedAt.substr(0, 10)}T${updatedAt.substr(11)}Z`,
  state: ({ state }) => state.toUpperCase(),
  result: ({ result }) => (result ? result.toUpperCase() : null),
  confirmation: ({ confirmation }) =>
    confirmation ? confirmation.toUpperCase() : null,
  creator: ({ user }) => user,
  answers: ({ responses }) => responses || []
}
