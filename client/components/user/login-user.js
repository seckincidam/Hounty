import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {loginUser} from '../../actions/user-actions'

class UserLogin extends Component {

  handleChange(event){
    let name = event.target.name
    let value = event.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let {email, password} = this.state
    this.props.loginUser(email, password)
  }

  render(){
    if(this.props.user.isLoggedIn){
      return(
        <Redirect to="/" />
      )
    }
    return (
      <div className="container mt-5">
        {this.props.user.error &&
          <div className="alert alert-danger" role="alert">
            {this.props.user.error}
          </div>
        }
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Email address</label>
            <input name="email" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange.bind(this)}/>
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="form-control" placeholder="Password"  onChange={this.handleChange.bind(this)}/>
          </div>
          {!this.props.user.isLoggingIn &&
            <button type="submit" className="btn btn-primary">Submit</button>
          }
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginUser
}

function mapStateToProps(state){
  return { user: state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
