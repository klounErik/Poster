import React, {Component} from 'react'
import './Header.css'

export default class Header extends Component {
  state = {
    text: 'Log In',
  }
  componentWillReceiveProps() {
    this.setState({text: this.props.isloggedin ? 'Log In' : 'Log Out'})
  }

  logout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <div className="headerWrapper">
        <div>
          <ul>
            <a href="home">Home</a>
            <a href="about">About</a>
            <a href="posts">Posts</a>
          </ul>
        </div>
        <a id="title" href="home">
          Poster
        </a>
        <div>
          <ul>
            <a href="register">{this.props.loggedin ? 'My Profile' : 'Register'}</a>
            <a href="login" onClick={this.logout}>{this.props.loggedin ? 'Log Out' : 'Log In'}</a>
          </ul>
        </div>
      </div>
    )
  }
}
