import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'

import './Webapp/style/App.css'
import Login from './Webapp/components/Login/Login'
import Header from './Webapp/components/Header/Header'
import Register from './Webapp/components/Register/Register'
import Posts from './Webapp/components/Posts/Posts'
import MyProfile from './Webapp/components/Profile/Myprofile'

class App extends Component {
  state = {
    loggedin: false,
    user: [],
  }

  componentDidMount(){
    const checkToken = localStorage.getItem('Bearer')
    if(checkToken){
      this.setState({loggedin : true})
    }
    else {
      this.setState({loggedin : false})
    }
    console.log(this.state.user)
  }

  getUser = user => {
    this.setState({
      user: user,
    })
    console.log(this.state.user)
  }

  //TODO: ROUTING
  render() {
    return (
      <Router>
        <div className="App">
          <Header loggedin={this.state.loggedin} />
          <Route
            path="/login"
            render={() => {
              return (
                <div className="login">
                  <Login
                    getuser={this.getUser.bind(this)}
                    isloggedin={this.state.loggedin}
                  />
                </div>
              )
            }}
          />
          <Route
            path="/posts"
            render={() => {
              return (
                <div className="posts">
                  <Posts isloggedin={this.state.loggedin} />
                </div>
              )
            }}
          />
          <Route
            path="/register"
            render={() => {
              if(!this.state.loggedin){
              return (
                <div className="register">
                  <Register />
                </div>
              )}else{
                return(
                  <div className="register">
                   <MyProfile user={this.state.user} />
                </div>
                )
              }
            }}
          />
          <Route
            path="/profile"
            render={() => {
              return (
                <div className="profile">
                  <MyProfile user={this.state.user} />
                </div>
              )
            }}
          />
        </div>
      </Router>
    )
  }
}

export default App
