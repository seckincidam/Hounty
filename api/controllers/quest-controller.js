import jwt from 'jsonwebtoken'
import validator from 'validator'
import {Quest} from '../models/quest-model'
import {User} from '../models/user-model'
import {UserSecret, PasswordResetSecret} from '../constants/secrets'

export function createQuest(questInfo, res, err) {
  if(err){
    res.status(500).send('Service unavailable.')
  }
  let {text, token, endDate} = questInfo
  let reward = (questInfo.reward) ? questInfo.reward : ''
  if(!text || validator.isEmpty(text)){
    res.status(400).send('Invalid or empty quest text.')
  } else if(!token || validator.isEmpty(token)){
    res.status(400).send('Invalid or unauthorized user.')
  } else if(!endDate || validator.isEmpty(endDate)){
    res.status(400).send('Invalid or empty quest end date.')
  } else {
    jwt.verify(token, UserSecret, (err, decoded) => {
      if(err){
        res.status(400).send('Unauthorized token.')
      } else {
        User.findById(decoded.data, 'id username chanceMultiplier', (err, user) => {
          if(err) res.status(400).send('User not found.')
          const goldChance = 1 * user.chanceMultiplier
          const silverChance = 3 * user.chanceMultiplier
          const bronzeChance = 10 * user.chanceMultiplier
          let rarity = Math.floor(Math.random()*100)
          if(rarity < goldChance){
            rarity = 'gold'
          } else if(rarity < silverChance){
            rarity = 'silver'
          } else if(rarity < bronzeChance){
            rarity = 'bronze'
          } else {
            rarity = ''
          }
          const newQuest = new Quest({
            text: text,
            ownerID: user._id,
            ownerUsername: user.username,
            startDate: new Date(),
            endDate: endDate,
            points: 0,
            isCompleted: false,
            winner: '',
            submissions: [],
            rarity: rarity,
            reward: reward,
            upvotedUsers: [user._id]
          })
          newQuest.save(function(err, quest){
            if(err){
              res.status(400).send('Quest can not be created.')
            } else {
              res.status(200).send('Quest created')
            }
          })
        })
      }
    })
  }
}

export function upvoteQuest(questID, token, res, err){
  if(err){
    res.status(500).send('Service unavailable.')
  }
  jwt.verify(token, UserSecret, (err, decoded) => {
    if(err){
      res.status(400).send('Invalid token.')
    } else {
      Quest.findById(questID, 'points upvotedUsers', (err, quest) => {
        if(err){ res.status(400).send('Quest not found.'); return err }
        if(quest.upvotedUsers.indexOf(decoded.data) !== -1){
          res.status(400).send('already upvoted')
        } else {
          let points = quest.points + 1
          quest.upvotedUsers.push(decoded.data)
          let updatedQuest = {points: points, upvotedUsers: quest.upvotedUsers }
          Quest.update({_id: questID}, updatedQuest, (err, updated) => {
            if(err){ res.status(400).send(err); return err }
            res.status(200).send(updated)
          })
        }
      })
    }
  })
}

export function fetchQuests(skip, limit, res, err){
  Quest.find({}).skip(skip).limit(limit).exec((err, quests) => {
    if(err){ res.status(400).send('Can not fetch quests'); return err}
    res.status(200).send(quests)
  })
}

export function fetchSingleQuest(questID, res, err){
  Quest.findById(questID, (err, quest) => {
    if(err){ res.status(400).send('Can not fetch quests'); return err}
    if(!quest){
      res.status(404).send('Quest not found.')
    } else {
      res.status(200).send(quest)
    }
  })
}
