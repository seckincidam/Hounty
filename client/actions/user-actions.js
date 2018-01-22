import axios from 'axios'

import {USER_LOGIN_SUBMITTED, USER_LOGIN_SUCCEDED, USER_LOGIN_FAILED, USER_REGISTER_SUBMITTED, USER_REGISTER_SUCCEDED, USER_REGISTER_FAILED, USER_AUTH_SUBMITTED, USER_AUTH_SUCCEDED, USER_AUTH_FAILED } from '../constants/action-types'
import {apiHost} from '../constants/api-config'

export function loginUser(email, password){
  return(dispatch) => {
    dispatch({type: USER_LOGIN_SUBMITTED})
    axios.post( apiHost + '/api/users/login', { email: email, password: password })
    .then((res) => {
      dispatch({type: USER_LOGIN_SUCCEDED, token: res.data})
    })
    .catch((err) => {
      dispatch({type: USER_LOGIN_FAILED, error: err})
    })
  }
}

export function authUser(token){
  return(dispatch) => {
    dispatch({type: USER_AUTH_SUBMITTED})
    axios.post( apiHost + '/api/users/auth', { token: token })
    .then((res) => {
      dispatch({type: USER_AUTH_SUCCEDED, user: res.data})
    })
    .catch((err) => {
      dispatch({type: USER_AUTH_FAILED, error: err})
    })
  }
}
