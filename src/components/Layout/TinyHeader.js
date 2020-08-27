import React, { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import {BiLogOut,BiDotsVerticalRounded} from 'react-icons/bi';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import auth from '../../utils/auth';
import {IoMdClose} from 'react-icons/io'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {MDCDialog} from '@material/dialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import {BsFillTagFill} from 'react-icons/bs'
import { Badge } from 'react-bootstrap';
import Capsule from '../Buttons/Capsule'
import '../Buttons/Button.scss'

export const HeaderLayout = (props) => {
  return (
    <div className="tiny-container">
      <div className="tiny-items">
          {props.children}
        
      </div>
      <style>{`

.tiny-container{
    width: 100%;
    color:white;
    max-width: 500px;
    padding:15px 25px;
    font-size:20px;
    display:flex;
}
.input-box{
    width:50px;
}
.t-1{

    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tiny-items{
    font-size: 20px;
    display: flex;
    display: flex;
    width: 100%;
    justify-content: space-between;
}


`}</style>
    </div>
  );
};

export const Capsule2=(props)=>{
  const [state,setState]=useState(false)

  const handleClick=()=>{
    setState(!state)
    props.onTagChange()
  }
  return (
    <Badge       onClick={()=>handleClick()}
    // tagValue={tagValue} 
      style={{marginRight:8,color:state?'red':'blue'}} pill variant="primary">
      <BsFillTagFill/> {props.value}
      </Badge>
  )
}

export const SearchHeader=(props)=>{
  const userdata= props.userData.tags;


    return <div className="main-search" >
<div className="search-box"><span onClick={props.onClick}><AiOutlineArrowLeft/></span>
<input className="search-input" value={props.value} onChange={e=>props.onChange(e.target.value)} placeholder="Search"/></div>
<div className="flag-box">

{userdata&&userdata.map((e)=><Capsule2 onTagChange={()=>props.onTagChange(e)} value={e}/>)}
  
</div>
<style>{`
.main-search{
    width: 100%;
    color:white;
    flex-direction: column;
    max-width: 500px;
    padding:15px 25px;
    font-size:20px;
    display:flex;
}
.search-box{
  font-size: 20px;
  display: flex;
  display: flex;
  width: 100%;
 
}
.flag-box{
  overflow: auto;
  width:100%;
}
.search-input{
  margin-left:20px;
    border:none;
    width: 100%;
    margin-left: 20px;
    background:black;
    color:white;
    outline:none;
    box-shadow:none;
}

`}</style>
</div> 
}

export const DeleteHeader=(props)=>{
    const [anchorEl,setState]=useState(false)
    const handleClick=()=>{
        setState(true)
    }
    const handleClose=()=>{
        setState(false)
    }
    const handleDelete=()=>{
      setState(false)
      props.delete();
      props.onClick();
  
  
    }
    return <HeaderLayout>
        <span  onClick={props.onClick}><IoMdClose/></span>
        <span onClick={handleClick}><BiDotsVerticalRounded/></span>
<Dialog
        open={anchorEl}
        onClose={()=>handleDelete()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Journal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={()=>handleDelete()} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </HeaderLayout> 
}
export const CloseHeader=(props)=>{
    return <HeaderLayout>
        <span  onClick={()=>props.onClick()}><IoMdClose/></span></HeaderLayout> 
}
export const BackHeader=(props)=>{
    return <HeaderLayout>
    <span onClick={()=>props.onClick()}><AiOutlineArrowLeft/></span> 
</HeaderLayout> 
}