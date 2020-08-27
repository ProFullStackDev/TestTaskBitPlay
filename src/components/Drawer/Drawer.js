import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {SearchHeader,DeleteHeader,CloseHeader,BackHeader}from '../Layout/TinyHeader';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let style1={}
  let style2={}
  let listStyle={width:'100%',display: 'flex',justifyContent: 'center'}
if(props.style){
  style1={width:'100%'}
  style2={display: 'flex',justifyContent: 'center'}
  listStyle={width:'100%',display: 'flex',justifyContent: 'center'}
}else if(props.search){
    style1={width:'100%',minHeight: 353,
    maxHeight: 510,
    height: 500}
  style2={display: 'flex',justifyContent: 'center'}
  listStyle={width:'100%',display: 'flex',justifyContent: 'center'}
}
useEffect(()=> {
      if (open) {
        if (process.browser) {
          window.onpopstate = (e) => {
            e.preventDefault();
            if (window.location.pathname !== '/') {
             props.history.reload('/');
             
            }
            toggleDrawer()
          };
       window.history.pushState(null, null, window.location.href);
         
        
        } else if (open === false) {
          window.onpopstate = (e) => {
            toggleDrawer()
          };
        }
      }
})
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(false);
      props.handleClose();
      };
  return (
    <div style={style1} className={props.className} >
      <div style={style2} onClick={handleClickOpen}>
      {props.button}
      </div>

      <Dialog  fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
              {props.tiny==='search'?<SearchHeader 
                onTagChange={e=>props.onTagChange(e)}
                tagValue={props.tagValue} 
              
              userData={props.userData}  value={props.value} onChange={props.onChange} onClick={toggleDrawer}/>:
     props.tiny==='delete'? <DeleteHeader delete={props.delete} onClick={toggleDrawer}/>:
     props.tiny==='close'?<CloseHeader onClick={toggleDrawer}/>:
     props.tiny==='back'&&<BackHeader onClick={toggleDrawer}/>
      } <div style={props.listStyle?listStyle:{}}>
        {props.list}
        </div>
      </Dialog>
    <style>{`
    .MuiDialog-paperFullScreen{
      background:black;
    }`}</style>
    </div>
  );
}

