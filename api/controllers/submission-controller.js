import jwt from 'jsonwebtoken'
import validator from 'validator'
import {Submission} from '../models/submission-model'
import {UserSecret, PasswordResetSecret} from '../constants/secrets'

export function createSubmission(submissionInfo, res, err) {
  if(err){
    res.status(500).send('Service unavailable.')
  }
  let {content, token, parentQuestID} = submissionInfo
  if(!content || validator.isEmpty(content)){
    res.status(400).send('Invalid or empty submission.')
  } else if(!token || validator.isEmpty(token)){
    res.status(400).send('Invalid or unauthorized user.')
  } else {
    jwt.verify(token, UserSecret, (err, decoded) => {
      if(err){
        res.status(400).send('Unauthorized token.')
      } else {
        User.findById(decoded.data, 'id username', (err, user) => {
          if(err) res.status(400).send('User not found.')
          const newSubmission = new Submission({
            content: content,
            parentQuestID: parentQuestID,
            ownerID: user._id,
            ownerUsername: user.username,
            isWinner: false,
            likes: 0,
            likedUsers: []
          })
          newSubmission.save(function(err, submission){
            if(err){
              res.status(400).send('Submission can not be created.')
            } else {
              res.status(200).send('Submission created')
            }
          })
        })
      }
    })
  }
}
