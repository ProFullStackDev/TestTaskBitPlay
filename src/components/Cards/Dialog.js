import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogMB = props => {
  return (
    <Dialog
      open={props.show}
      onClose={() => props.handleClose ()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"  style={{textAlign:'center'}}>{props.title}</DialogTitle>
      <DialogContent>
        {props.contant}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
        {props.button2 &&
          <Button color="primary" autoFocus onClick={props.handleDelete}>
            {props.btn2Txt}
          </Button>}
      </DialogActions>
    </Dialog>
  );
};
export default DialogMB;
