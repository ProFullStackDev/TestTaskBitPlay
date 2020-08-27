import React, { useState, useEffect } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import Card from "../Cards/Card";
import NewCard from "../Cards/NewCard";
import AddBtn from '../Buttons/AddBtn';
import Drawer from "../Drawer/Drawer";
import "./Calender.scss";
import Calender from '../../screens/Calender/CalenderList'
const moment = require("moment");
const DateCircle = (props) => {
  const [data, setData] = useState([]);
  const [date,setDate]=useState('')
  const [show, setSow] = useState(false);
  let today = new Date();
  let userData=JSON.parse(localStorage.getItem("userData"));
  let lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 13
  );
  useEffect(()=>{
    userData= JSON.parse(localStorage.getItem("userData"));
  },[data])
  var now = new Date();
  var daysOfYear = [];
  for (var d = lastWeek; d <= now; d.setDate(d.getDate() + 1)) {
    daysOfYear.push(new Date(d));
  }
  daysOfYear.sort((a, b) => b - a);
  const dateFt=(d,t)=>{
    return moment(d).format(t)
  }

  let NewuserData = [];
  const checkSameDate=(date)=>{
    return userData&&userData.journals!==undefined&&userData.journals.filter((e)=>{return dateFt(e.date,"DDMMYY")===dateFt(date,"DDMMYY")})
  }
  const handleCard = (date) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newData = userData.journals&&userData.journals.filter(
      (e) => dateFt(e.date,'DDMMYY')=== date
    );
    props.userData(newData);
    setData(newData);
  };

  const cardSwitch = () => {
    if ( data&&data.length === 0||data===undefined) {
      return <NewCard new={true}  id={false} date={date} handleClose={props.cb} />;
    } else {
      return (
        <>
          <div className="date-circle-container" style={{justifyContent: 'center'}}>
            <div style={{ display: "flex", marginLeft: 25}} >
              <div
             
                className="d-c2"
                
              >
                <div className="d-c3">
                  <span>{moment(date).format("DD")}</span>
                  <span>{moment(date).format("MMM")}</span>
                </div>
                
              </div>
            </div>
        
          </div>
          

          <Card userData={data}   cb={handleClose} search={props.search} />
        
          <AddBtn
            cb={() => props.cb ()}
       item={<NewCard id={false} 
       date={date}
       new={true} />}
       winHistory="/"
       history={props.history}
     />
        </>
      );
    }
  };
 const handleClose=()=>{
    props.cb();
    handleCard(dateFt(date,'DDMMYY'))
  }
  return (
    <div className="date-circle-container">
      <Drawer 
         style={false}
      handleClose={props.cb}
        winHistory={props.winHistory}
        tiny={data&&data.length === 0?'close':'back'}
        listStyle={((data&&data.length) === 0||data===undefined)?true:false}
        list={cardSwitch()}
        button={
          <div style={{ display: "flex", marginLeft: 25 }}>
            {
        
            daysOfYear
              .sort((a, b) => b - a)
              .map((e) => (
                  <div
                style={{background:checkSameDate(e).length>0?"#33b8a6":"black",
                 color:checkSameDate(e).length>0?"black":"white"}}
               
                  className="d-c2"
                  onClick={() => {handleCard(dateFt(e,'DDMMYY')); setDate(e)}}
                >

                  <div className="d-c3">
                    <span>{dateFt(e,'DD')}</span>
                    <span>{dateFt(e,'MMM')}</span>
                  </div>
                </div>
              ))}

          </div>
        }
      ></Drawer>
       <Drawer     style={false} listStyle={false} history={props.history} handleClose={props.cb} tiny="close" winHistory={props.winHistory} 
        list={<Calender handleClose={props.cb}/>} button={ <div style={{ display: "flex", paddingRight: 10 }}>
        <div
          className="d-c2"
          style={{ background: "white" }}
        
        >
          <div className="d-c3 cal-icon">
            <span>
              <BiCalendarEvent width={100} />
            </span>
          </div>
        </div>
      </div>}></Drawer>
     
    </div>
  );
};
export default DateCircle;
