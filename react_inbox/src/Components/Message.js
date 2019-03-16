import React from 'react'

const Message = (props) => {
  let {subject, read, starred, labels, body, id} = props.message
  console.log('Message PROPS', props.message)



  // const element1 = <input type="checkbox" checked={ !!this.person.isSelected } />;


return (
<div>
  <div className={read ? 'row message read' : "row message unread"} >
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" 
          // checked="checked" 
          onClick={ (e) => props.toggleSelect()}
          />
        </div>
        <div className="col-xs-2">
          <i onClick={ (e) => props.updateMessage(id, "star")}  className={ starred ? 'star fa fa-star' : 'star fa fa-star-o' }></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
    { labels ? labels.map( (lable) => <span className="label label-warning">{lable}</span>): null }
      <a htmlFor="#">
        {subject} 
      </a>
    </div>
  </div>




</div>
)



}

export default Message