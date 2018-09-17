import React, {Component} from 'react'
import './Posts.css'
import Postbox from './Postbox'
import SubmitPost from './SubmitPost'

const posts = 'http://localhost:1234/api/posts'
//TODO: LEGGE TIL FUNKSJON FOR REDIGERING AV POSTS
export default class Posts extends Component {
  state = {
    postData: [],
  }

  async componentDidMount() {
    if (!this.props.isloggedin) {
      return <p>Please log in to see posts</p>
    } else {
      this.getPosts()
    }
  }
  async componentDidUpdate() {
    if (!this.props.isloggedin) {
      return <p>Please log in to see posts</p>
    } else {
      this.getPosts()
    }
  }

  getPosts = async () => {
    const req = await fetch(posts)
    const resp = await req.json()
    this.setState({postData: resp})
  }

  render() {
    const Liste = this.state.postData.map((post, index) => {
      return (
        <Postbox
          postId={post._id}
          key={index}
          username={post.username}
          timestamp={post.timestamp}
          title={post.title}
          content={post.content}
        />
      )
    })
    if(this.props.isloggedin){
      return(
        <div>
        <h1>{this.props.isloggedin ? 'Latest posts' : 'Please log in to see posts'}</h1>
        {Liste}
        <SubmitPost loggedIn={this.props.isloggedin} />
        </div>
      )
    }else{
      return (
        <div>
          <h1>{this.props.isloggedin ? 'Latest posts' : 'Please log in to see posts'}</h1>
          </div>
      )}
  }
}
