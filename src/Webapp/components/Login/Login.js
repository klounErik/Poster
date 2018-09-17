import React, {Component} from 'react'
import './Login.css'
import {Form} from 'semantic-ui-react'

//TODO: Sende brukeren videre til en annen side
export default class Login extends Component {
  state = {
    email: '',
    isLoggedIn: this.props.isLoggedIn,
    password: '',
    text: '',
    user: [],
    loginError: '',
  }

  componentWillMount() {
    this.setState({text: this.state.loggedin ? 'Log Out' : 'Log In'})
  }

  getUser = async () => {
    const {email} = this.state
    const res = await fetch('http://localhost:1234/api/finduser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    })
    const resp = await res.json()
    this.setState({
      user: resp.username,
    })
  }

  handleSubmit = async e => {
    const {email, password} = this.state
      const res = await fetch('http://localhost:1234/api/login',{
        method: 'POST',
        headers: {
          Authorization: 'Bearer',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })
      if (res.ok === true) {
        localStorage.setItem('Bearer',  'token')
        await this.getUser()
        this.props.getuser(this.state.user)
        this.setState({
          text: this.props.isloggedin ? 'Log Out' : 'Log In',
          email: '',
          password: '',
          loginError: '',
        })
      } else {
        this.setState({loginError: 'The Username / Password is wrong'})
      }
      e.persist()
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  render() {
    const {email, password} = this.state
      return (
        <div className="loginWrapper">
          <h1>Login</h1>
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <h3 id="error">{this.state.loginError}</h3>
            <Form.Group>
              <Form.Input
                id="email"
                onChange={this.handleChange.bind(this)}
                name="email"
                value={email}
                type="email"
                placeholder="Username"
              />
              <Form.Input
                id="password"
                onChange={this.handleChange.bind(this)}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group>
              <button className="login-form-button" id="login" type="submit">{this.state.text}</button>
            </Form.Group>
          </Form>
        </div>
      )
    }
  }

