import React from 'react'
import Form from './Form'
function unreadMessages(messages){
  let value = messages.filter( message => message.read === false   ).length
  let message = 'unread messages'
  if (value === 1){
    message = 'unread message'
  }
  return (
      <p className="pull-right">
        <span className="badge badge">
        {value}
        </span>
        {message}
      </p>
  )
}

function selector(selected=0, messages=0){
  let selectedValue = selected.length
  let messagesValue = messages.length
  if (selectedValue === 0){
    return "fa fa-square-o"
  }
  if (selectedValue === messagesValue ){
    return "fa fa-check-square-o"
  }
  if (selectedValue <=messagesValue ) {
    return "fa fa-minus-square-o"
  }
}

function disabledButton(selected){
  if (selected.length === 0) return true
  return null
}

const Toolbar = (props) => {

return (
  <div>
    <div className="row toolbar">
      <div className="col-md-12">
        {unreadMessages(props.messages)}
        <a className="btn btn-danger" onClick={ (e) => props.toggleCompose()}>
          <i className="fa fa-plus">
          </i>
        </a>

        <button className="btn btn-default">
          <i className={selector(props.selectedMessages, props.messages)}
            onClick={ (e) => props.onSelectButton()}>
          </i>
        </button>

        <button className="btn btn-default"
          disabled={disabledButton(props.selectedMessages)}
          onClick={ (e) => props.updateMessage(props.selectedMessages, 'read', true)} >
          Mark As Read
        </button>

        <button className="btn btn-default"
          disabled={disabledButton(props.selectedMessages)}
          onClick={ (e) => props.updateMessage(props.selectedMessages, 'read', false)}>
          Mark As Unread
        </button>

        <select onChange={(e) => props.updateMessage(props.selectedMessages, 'addLabel', e.target.value)} className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={(e) => props.updateMessage(props.selectedMessages, 'removeLabel', e.target.value)} className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default"
            disabled={disabledButton(props.selectedMessages)}
            onClick={ (e) => props.updateMessage(props.selectedMessages, 'delete')}>
            
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

    {props.compose ? 
    <Form createMessage={props.createMessage}
    updatePendingMessage={props.updatePendingMessage}
    />
    : null }


  </div>
  )
}

export default Toolbar