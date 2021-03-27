export const getToken = (state) => {
  return state.token;
}

export const isLoggedIn = (state) => {
  return state.token != null;
}

export const getUser = (state) => {
  return state.user;
}