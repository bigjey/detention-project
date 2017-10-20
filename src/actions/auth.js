export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (email) => {
  return {
    type: LOGIN,
    email
  }
}

export const logout = () => {
  localStorage.removeItem('email');
  return {
    type: LOGOUT
  }
}