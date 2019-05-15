import React, { Component } from 'react';
import Toolbar from './Components/Toolbar'
import Message from './Components/Message'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      selected: [],
      expanded: [],
      compose: false,
      pendingMessage: {
        body: "",
        subject: ""
      }
    }
  }

async componentDidMount () {
  this.updateState()
}

updateState = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
  const json = await response.json()
  this.setState({messages: json})
}

updateMessage = async (id, command, input) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`,  {
    method: "PATCH",
    body: JSON.stringify({
      messageIds: id,
      command: command,
      read: input,
      label: input
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const json = await response.json()
  this.setState({...this.state.messages, messages: json})
  this.setState({messages: json})
}

createMessage = async (e) => {
  e.preventDefault()
  let message = this.state.pendingMessage
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
    method: "POST",
    body: JSON.stringify(
      message
    ),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  this.updateState()
}

updatePendingMessage = (property, value) => {
  this.setState({pendingMessage: { ...this.state.pendingMessage, [property]: value}})
}

toggleSelect = (id) => {
  if (this.state.selected.includes(id)) {
    let newArray = this.state.selected.filter( SelectedID => id !== SelectedID)
    this.setState({selected: newArray})
  } else {
    this.setState({selected: [...this.state.selected, id]})
  }
}

onSelectButton = () => {
  if (this.state.selected.length === this.state.messages.length){
    this.setState({ selected: [] })
  } else {
    const allMessageIDs = this.state.messages.map( message => message.id)
    this.setState({ selected: allMessageIDs})
  }
}

toggleExpand = (id) => {
  if (this.state.expanded.includes(id)) {
    let newArray = this.state.expanded.filter( expandedID => id !== expandedID)
    this.setState({expanded: newArray})
  } else {
    this.setState({ expanded: [...this.state.expanded, id]})
  }
}

toggleCompose = (compose) => {
  this.setState({compose: !this.state.compose})
}



  render() {
    return (
      <div className="App">
        <div className='container'>
          <Toolbar onSelectButton={this.onSelectButton}
          updateState={this.updateState} 
          messages={this.state.messages}
          updateMessage={this.updateMessage}
          selectedMessages={this.state.selected}
          compose={this.state.compose}
          toggleCompose={this.toggleCompose}
          createMessage={this.createMessage}
          pendingMessage={this.state.pendingMessage}
          updatePendingMessage={this.updatePendingMessage}>
          </Toolbar>
          
          {this.state.messages.map( (message) => 
            <Message 
            updateMessage={this.updateMessage} 
            key={message.id} 
            toggleSelect={this.toggleSelect}
            toggleExpand={this.toggleExpand}
            expanded={this.state.expanded.includes(message.id)}
            updateState={this.updateState} 
            message={message}
            select={this.state.selected.includes(message.id)}>
            </Message>
            )
          }
        </div>
      </div>   
    );
  }
}

export default App;
