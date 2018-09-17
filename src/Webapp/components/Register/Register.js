import React, {Component} from 'react'
import './Register.css'
import {Form, Button} from 'semantic-ui-react'

//TODO: REGISTRERE BRUKER OG FORM VALIDERING
export default class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  }

  handleSubmit = async () => {
    const {firstname, lastname, email, username, password} = this.state
    const resp = await fetch('http://localhost:1234/api/createuser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstname, lastname, email, username, password}),
    })
    console.log(resp)
    if (resp.ok === true) {
      console.log('Succsessfully created user!')
    } else {
      console.log('Could not create user')
    }
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  render() {
    return (
      <div className="registerWrapper">
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Group>
            <label>First Name:</label>
            <Form.Input id="firstname" onChange={this.handleChange.bind(this)} type="text" name="firstname" />
          </Form.Group>
          <Form.Group>
            <label>Last Name:</label>
            <Form.Input id="lastname" onChange={this.handleChange.bind(this)} type="text" name="lastname" />
          </Form.Group>
          <Form.Group>
            <label>Email:</label>
            <Form.Input id="registeremail" onChange={this.handleChange.bind(this)} type="email" name="email" />
          </Form.Group>
          <Form.Group>
            <label>Username:</label>
            <Form.Input id="username" onChange={this.handleChange.bind(this)} type="text" name="username" />
          </Form.Group>
          <Form.Group>
            <label>Password:</label>
            <Form.Input id="registerpassword" onChange={this.handleChange.bind(this)} type="password" name="password" />
          </Form.Group>
          <Form.Group>
            <label>Confirm Password:</label>
            <Form.Input
              id="confirmpassword"
              onChange={this.handleChange.bind(this)}
              type="password"
              name="confirmpassword"
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" className="register-form-button">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
