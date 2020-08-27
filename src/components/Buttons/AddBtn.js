import React from 'react';
import './Button.scss';

import Drawer from '../../components/Drawer/Drawer';
const AddBtn = props => {
  const btnClicked = () => {
    props.cb ();
  };
  return (
    <Drawer
      style={false}
      className="add-btn-container"
      listStyle={true}
      history={props.history}
      handleClose={props.cb}
      tiny="close"
      listClass="menu-card-list"
      winHistory={props.winHistory}
      anchor="bottom"
      height="100%"
      list={props.item}
      button={
        <div className="add-btn" onClick={() => btnClicked ()}>
          +
        </div>
      }
    >

      <style>{`
 
    `}</style>

    </Drawer>
  );
};

export default AddBtn;
