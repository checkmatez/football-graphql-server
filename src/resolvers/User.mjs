const User = {
  state: ({ state }) => (state ? state.toUpperCase() : 'ACTIVE'),
  avatar: ({ photoURL }) => photoURL,
  avatar100: ({ avatar }) => (avatar ? avatar[100] : null),
  avatar600: ({ avatar }) => (avatar ? avatar[600] : null),
}

export default User