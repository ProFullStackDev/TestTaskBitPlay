import React, {useState} from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Drawer from '../../components/Drawer/Drawer';
import NewCard from '../../components/Cards/NewCard';

const CalenderList = props => {
  let today = new Date ();
  const [date, setDate] = useState (today);
  const moment = require ('moment');
  return (
    <Drawer
      style={false}
      listStyle={true}
      handleClose={props.handleClose}
      tiny="close"
      list={<NewCard id={false} new={true} date={date} />}
      button={
        <InfiniteCalendar
          width={'100%'}
          height={600}
          selected={today}
          onSelect={e => setDate (e)}
        />
      }
    >

      <style>
        {`
  .drawerStyle{}
  `}
      </style>

    </Drawer>
  );
};
export default CalenderList;
