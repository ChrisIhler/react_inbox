import React, { Component } from 'react';
import Toolbar from './Components/Toolbar'
import Message from './Components/Message'
import MessageList from './Components/MessageList'

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      selected: []
    }
  }

async componentDidMount () {
 this.updateState()
 console.log('DidMount',this.state.messages)
}

updateState = async () => {
  const response = await fetch('http://localhost:8082/api/messages')
  const json = await response.json()
  this.setState({messages: json})
  console.log('UpdateState',this.state.messages)

}

updateMessage = async (id, command) => {
  console.log('working')
  const response = await fetch('http://localhost:8082/api/messages',  {
    method: "PATCH",
    body: JSON.stringify({
      messageIds: [id],
      command: command
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log(id)
  const json = await response.json()
  // const messageUpdate = json.filter( (message) => id === message.id)
  // const messages = this.state.messages
  // const indexOfMessageUpdate = messages.indexOf( message.id === id)
  // messages = messages.splice(indexOfMessageUpdate)
  // console.log(indexOfMessageUpdate )
  this.setState({...this.state.messages, messages: json})
  this.setState({messages: json})
  console.log('UpdateState',this.state.messages)
}

toggleSelect = (id) => {
  console.log('clicked')
  this.setState({selected: id})
}

onClearselected = () => {
  this.setState({ selected: [] });
}

  render() {
    return (
      <div className="App">
      <Toolbar updateState={this.updateState} messages={this.state.messages}></Toolbar>

      {this.state.messages.map( (message) => <Message updateMessage={this.updateMessage} key={message.id} toggleSelect={this.toggleSelect} updateState={this.updateState} message={message}></Message>)}
      
      {/* <Message updateState={this.updateState} messages={this.state.messages}></Message> */}
      <MessageList updateState={this.updateState} messages={this.state.messages}></MessageList>
      </div>
    );
  }
}

export default App;
