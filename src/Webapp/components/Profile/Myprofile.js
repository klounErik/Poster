import React from 'react'

class MyProfile extends React.Component{
  render(){
    return <h1>Welcome {this.props.user}</h1>
  }
}

export default MyProfile
