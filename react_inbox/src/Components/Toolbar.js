import React from 'react'

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
    <form  onSubmit={props.createMessage} className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input onChange={ (e) => props.updatePendingMessage('subject', e.target.value)} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea onChange={ (e) => props.updatePendingMessage('body', e.target.value)} name="body" id="body" className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary"/>
        </div>
      </div>
    </form> 
    : null }


  </div>
  )
}

export default Toolbar