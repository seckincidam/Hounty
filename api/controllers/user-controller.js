import jwt from 'jsonwebtoken'
import validator from 'validator'
import {User} from '../models/user-model'
import {UserSecret, PasswordResetSecret} from '../constants/secrets'

export function createUser(userInfo, res, err) {
  if(err){
    res.status(500).send('Service unavailable')
  }
  let {email, username, password} = userInfo
  if(!email || !validator.isEmail(email) || validator.isEmpty(email)){
    res.status(400).send('Invalid or empty email.')
  } else if(!password || validator.isEmpty(password) || validator.isLength(password, {min: 8, max: 16})) {
    res.status(400).send('Your password must be at least 8 characters.')
  } else if(!username || validator.isEmpty(username)) {
    res.status(400).send('Invalid or empty username')
  } else {
    email = validator.normalizeEmail(email, {all_lowercase: true})
    email = validator.unescape(email)
    password = validator.unescape(password)
    username = validator.unescape(username)
    const passwordResetToken = jwt.sign({data: email}, PasswordResetSecret)
    const newUser = new User({
      email: email,
      username: username,
      password: password,
      passwordResetToken: passwordResetToken,
      createdAt: new Date(),
      lastLogin: new Date(),
      points: 0,
      role: 'user'
    })
    newUser.save(function(err, user){
      if(err){
        res.status(400).send('This username or email is already in use.')
      } else {
        const token = jwt.sign({
          iss: 'Hounty',
          data: user._id
        }, UserSecret)
        res.status(201).send(token)
      }
    })
  }
}

export function loginUser(userInfo, res, err) {
  if(err){
    res.status(500).send('Service unavailable')
  }
  let {email, password} = userInfo
  if(!email || !password || !validator.isEmail(email) || validator.isEmpty(email) || validator.isEmpty(password) || validator.isLength(password, {min: 8, max: 16})){
    res.status(400).send('Invalid email or password')
  } else {
    User.findOne({email: email}, function(err, user){
      console.log(err);
      if(err || user === null){
        res.status(400).send('Invalid email or password')
      } else {
        if(password == user.password){
          const token = jwt.sign({
            iss: 'Hounty',
            data: user._id
          }, UserSecret)
          res.status(201).send(token)
        } else {
          res.status(400).send('Invalid email or password')
        }
      }
    })
  }
}

export function authUser(token, res, err) {
  if(err){
    res.status(500).send('Service unavailable')
  }
  jwt.verify(token, UserSecret, function(err, decoded) {
    if(err){
      res.status(401).send('Token unauthorized.')
    } else {
      let userID = decoded.data
      User.findById(userID, 'username role points _id email', function(err, user){
        if(err){
          res.status(401).send('Token unauthorized.')
        } else {
          res.status(200).send(user)
        }
      })
    }
  })
}
