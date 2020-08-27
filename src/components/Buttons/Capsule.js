import React from 'react';
import { Badge } from 'react-bootstrap';
import {BsFillTagFill} from 'react-icons/bs'
import './Button.scss'
const Capsule=(props)=>{
return <Badge  style={{marginRight:8,marginBottom:5}} pill variant="primary" onClick={props.addTag}>
  {props.badge==="Add Tag"?<span style={{fontSize:12,marginRight:5}}>+</span>:<BsFillTagFill/>}  {props.badge}
  </Badge>
}

export default Capsule