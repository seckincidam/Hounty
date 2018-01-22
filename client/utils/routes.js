import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from '../containers/home'
import Quests from '../containers/quests'
import UserLogin from '../components/user/login-user'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quests" component={Quests} />
        <Route path="/login" component={UserLogin} loginUser={this.props.loginUser}/>
      </Switch>
    )
  }
}

export default Routes
