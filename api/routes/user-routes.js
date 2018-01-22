import express from 'express'

import {createUser, loginUser, authUser} from '../controllers/user-controller'

const router = express.Router()

router.post('/register', (req, res) => {
  createUser(req.body, res)
})

router.post('/login', (req, res) => {
  loginUser(req.body, res)
})

router.post('/auth', (req, res) => {
  const {token} = req.body
  authUser(token, res)
})

router.get('/:userID', (req, res) => {
  res.send(req.params.userID)
})

export default router
