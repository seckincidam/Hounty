import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux'

import Navbar from './components/navbar'
import Routes from './utils/routes'

import {loginUser, authUser} from './actions/user-actions'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar authUser={this.props.authUser}/>
          <Routes {...this.props}/>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return state
}

const mapDispatchToProps = {
  loginUser,
  authUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
