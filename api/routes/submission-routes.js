import express from 'express'

import {createSubmission} from '../controllers/submission-controller'

const router = express.Router()

router.post('/new', (req, res) => {
  createSubmission(req.body, res)
})

router.post('/like', (req, res) => {
  likeSubmission(req.body.submissionID, req.body.token, res)
})

router.get('/:questID', (req, res) => {
  fetchQuestSubmission(req.body.questID, res)
})

router.get('/:userID', (req, res) => {
  fetchUserSubmission(req.params.userID, res)
})

export default router
