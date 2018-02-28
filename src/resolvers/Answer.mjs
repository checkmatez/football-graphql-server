const Answer = {
  createdAt: ({ respondedAt }) =>
    `${respondedAt.substr(0, 10)}T${respondedAt.substr(11)}Z`,
  state: ({ state }) => state.toUpperCase(),
  creator: ({ user }) => user,
}

export default Answer