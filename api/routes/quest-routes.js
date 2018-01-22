import express from 'express'

import {createQuest, upvoteQuest, fetchQuests, fetchSingleQuest} from '../controllers/quest-controller'

const router = express.Router()

router.post('/new', (req, res) => {
  createQuest(req.body, res)
})

router.post('/upvote', (req, res) => {
  upvoteQuest(req.body.questID, req.body.token, res)
})

router.get('/', (req, res) => {
  fetchQuests(req.body.skip,req.body.limit, res)
})

router.get('/:questID', (req, res) => {
  fetchSingleQuest(req.params.questID, res)
})

export default router
