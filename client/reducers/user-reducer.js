import {USER_LOGIN_SUBMITTED, USER_LOGIN_SUCCEDED, USER_LOGIN_FAILED, USER_REGISTER_SUBMITTED, USER_REGISTER_SUCCEDED, USER_REGISTER_FAILED, USER_AUTH_SUBMITTED, USER_AUTH_SUCCEDED, USER_AUTH_FAILED } from '../constants/action-types'

const initialState = {
  error: '',
  isLoggedIn: false,
  isLoggingIn: false
}

export function userReducer(state=initialState, action){
  switch (action.type) {
    case USER_LOGIN_SUBMITTED:
      return {state, isLoggingIn: true}
      break;
    case USER_LOGIN_SUCCEDED:
      const token = action.token
      localStorage.setItem('token', token)
      return {...state, isLoggedIn: true, isLoggingIn: false}
      break;
    case USER_LOGIN_FAILED:
      return {...state, error: action.error.response.data, isLoggingIn: false}
      break;
    case USER_AUTH_SUBMITTED:
      return state
      break;
    case USER_AUTH_SUCCEDED:
      return action.user
      break;
    case USER_AUTH_FAILED:
      return {...state, error: action.error.response.data}
      break;
    default:
    return state
  }
}
