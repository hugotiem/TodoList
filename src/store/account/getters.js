export const getToken = (state) => {
  return state.token;
}

export const isLoggedIn = (state) => {
  return state.token != null;
}