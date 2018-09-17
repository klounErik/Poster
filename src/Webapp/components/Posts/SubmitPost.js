import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import './SubmitPost.css'
export default class SubmitPost extends Component {
  state = {
    timestamp: new Date().toLocaleString(),
    title: '',
    content: '',
    username: 'Kloun',
  }

  handleSubmit = async () => {
    if (!this.props.loggedIn) {
      console.log('must be logged in to submit posts')
    } else {
      this.setState({timestamp: new Date().toLocaleString()})
      const {username, title, content, timestamp} = this.state
      const res = await fetch('http://localhost:1234/api/submitpost', {
        method: 'POST',
        headers: {
          authorization: 'Bearer ',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, title, content, timestamp}),
      })
      if (res.ok) {
        console.log(res)
      } else {
        console.log('something went wrong')
      }
    }
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  render() {
    const {title, content} = this.state
    return (
      <div className="submitPost">
        <h1>{this.props.loggedIn ? 'Submit post' : 'You must be logged in to submit a post'}</h1>
        <Form  className="form" onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group>
            <Form.Input size="massive" onChange={this.handleChange.bind(this)} name="title" value={title} />
            <Form.TextArea style={{width: '100%'}} onChange={this.handleChange.bind(this)} name="content" value={content} />
          </Form.Group>
          <Button style={{width: '100%'}} type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
