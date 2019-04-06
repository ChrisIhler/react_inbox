import React from 'react'

function rowStyles(read, selected){
  let style = 'row message'
  style = read ? `${style} read`  : `${style} unread`
  style = selected ? `${style} selected`  : `${style}`
  return style
}

const Message = (props) => {
  let {subject, read, starred, labels, body, id} = props.message

return (
  <div >
    <div className={rowStyles(read, props.select)}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" 
            checked={props.select} 
            onChange={ (e) => props.toggleSelect(id)}/>
          </div>
          <div className="col-xs-2">
            <i onClick={ (e) => props.updateMessage([id], "star")}  className={ starred ? 'star fa fa-star' : 'star fa fa-star-o' }></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={ (e) => props.toggleExpand(id)}>
      { labels ? labels.map( (label,id) => <span key={id} className="label label-warning">{label}</span>): null }
        <a htmlFor="#">
          {subject} 
        </a>
      </div>
    </div>

    { props.expanded ?
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        {body}
      </div>
    </div>
    : null
    }
  </div>
  )
}

export default Message