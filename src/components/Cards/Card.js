import React,{useState} from 'react';
import Capsule from '../Buttons/Capsule'
import NewCard from '../Cards/NewCard'
import "./Card.scss"
import deleteJournal from '../../screens/controller/deleteJournal'
import Drawer from './../Drawer/Drawer';
const moment = require('moment');
const Card=(props)=>{
    const [id,setId]=useState('')

    const sup=(e)=>{
        switch (e) {
            case 1:
            return 'st'
            case 2:
            return 'nd'
            case 3:
            return 'rd'
            default:
            return 'th';
        }
    }
    const handleDelete=()=>{
        props.cb()
        deleteJournal (id);
    }

    console.log(props.userData)
    return(

        <Drawer 
        handleClose={props.cb}
        style={props.search?false:true}
        search={props.search}
        listStyle={true}
        delete={handleDelete} tiny="delete" anchor="bottom" list={<NewCard new={false} id={id}/>} button={<div className="row row-container"  >{
            props.userData!==undefined&&props.userData.sort((a, b) => moment(b.date).format('DDMMYY')- moment(a.date).format('DDMMYY')).map((e)=>(
            <div className="card-main-container col-12" onClick={()=>setId(e.id)}>
                <div className="card-container">
                    <div className="cd-1">
                    <h5>{moment(e.date).format('MMMM')} {moment(e.date).format('DD')}  <sup style={{marginLeft: -2}}>{sup(moment(e.date).format('DD'))}</sup></h5>
                    <p>{e.body}</p>
                    </div>
                  <div class="cap-1"><div className="cap-2"> {e.tags.map((e)=>( 
                  <Capsule style={{marginLeft:23}} badge={e}/>))}</div></div>
                </div>                
            </div>))}
        </div>}>
            <style>{`
              
            `}</style>
        </Drawer>
    )
}
export default Card;