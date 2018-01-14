import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from '../containers/home'
import Quests from '../containers/quests'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quests" component={Quests} />
      </Switch>
    )
  }
}

export default Routes
