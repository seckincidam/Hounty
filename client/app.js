import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import Navbar from './components/navbar'
import Routes from './utils/routes'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes />
        </div>
      </Router>
    )
  }
}

export default App
