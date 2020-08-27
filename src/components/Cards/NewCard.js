import React, {useState, useEffect} from 'react';
import Capsule from '../Buttons/Capsule';
import Delete from '../Buttons/deleteBtn';
import './Card.scss';
import {TextareaAutosize,TextField} from '@material-ui/core';
import addNewJournal from '../../screens/controller/createNewJournal';
import updateUserJournal from '../../screens/controller/updateUserJournal';
import Drawer2 from '../../components/Drawer/Drawer';
import deleteTag from '../../screens/controller/deleteTag';
import {useSelector} from 'react-redux';
import {BsDot} from 'react-icons/bs';
import tag from '../../screens/controller/addTag';
import DialogMB from '../../components/Cards/Dialog';
import {IoMdClose} from 'react-icons/io';
import addTag from '../../screens/controller/addTag';
import {AiOutlinePlus} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
const moment = require ('moment');
const Card = props => {
  const [usrData, setUserData] = useState ([]);
  const [journal, setJournal] = useState ({
    body: '',
    date: props.date ? props.date : new Date (),
    id: '',
    tags: [],
    edited: '',
  });
  
  const [edit, setEdit] = useState (props.new);
  const [tagArr, setTagArr] = useState ([]);
  const [showCapsule, setShowCapsule] = useState (false);
  const [show, setShow] = useState (false);
  const [showDelConfirm, setdelConfirm] = useState (null);
  const [showAddTag, setShowAddTag] = useState (false);
  const [tagVal, setTagVal] = useState ('');
  const [jrtag, setJrTag] = useState ([]);
  const [update, setUpdate] = useState (0);
  const fDate = new Date ();

  const dateFormat = (data, format) => {
    return moment (data).format (format);
  };
  console.log(props)
  const handleClick = () => {
    setShow (true);
  };
  const handleClosePop = () => {
    setShow (false);
  };

 
  useEffect (
    () => { 
      if(!props.new){
      journalUpdate()}

      tagArrayFunction()
    },
    []
  );
  useEffect(()=>{
    if(journal.id.length!==0){
      handleSave('tag')
      console.log('tag  ')
    }
  },[jrtag,showAddTag])
  const tagArrayFunction = () => {
    const userdata = JSON.parse (localStorage.getItem ('userData'));
    let newUserData = [];
    if (userdata.journals) {
      newUserData = userdata.journals.filter (e => e.id === (props.id||journal.id));
    }
    setUserData (userdata);

    if (journal.id==='') {
    return  setTagArr (userdata.tags);
    }else{
      newUserData.map (data => {
      const fill = userdata.tags.filter (e => {
        return data.tags.indexOf (e) === -1;
      });
    return  setTagArr (fill);
    });

  }
  };
  const journalUpdate = () => {
    const userdata = JSON.parse (localStorage.getItem ('userData'));
    setUserData (userdata);
    if (props.id||journal.id!=="") {
      const newUserData = userdata.journals.filter (e => e.id === (props.id||journal.id));
     return setJournal (...newUserData);
    } else if (journal.id==="") {
      return  userdata.journals &&
        userdata.journals.map (e => {
          setJournal (e);
        });
    }
    // return tagArrayFunction ();  
  };

  const handleSave = type => {
    if (type === 'save') {
      setEdit (false);
    }
    const d = dateFormat (fDate, 'DDMMYYYY');
  const J_id = d + fDate.getHours () + fDate.getMinutes () + fDate.getSeconds ();
    if (props.id||journal.id!=="") {
      updateUserJournal ({...journal, edited: dateFormat (fDate), tags: jrtag});
        return tagArrayFunction()
    } else if(journal.id===""&&props.new) {
    addNewJournal ({
      ...journal,
      id: J_id,
      edited: fDate,
      date: props.date ? props.date : fDate,
      tags: jrtag,
    });  

      journalUpdate() 
  setTimeout(() => {
    return    tagArrayFunction()
  }, 300);

    }  
  };
  const handleEdit = () => {
    setEdit (true);
    const userData = JSON.parse (localStorage.getItem ('userData'));
  };
  const sup = e => {
    switch (e) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  const handleClose = () => setShow (false);

  const handleAddTag = () => {
      tagArrayFunction ()
    const newUserData = tagArr.filter (e => e === tagVal);
    if (newUserData.length === 0) {
      tag (tagVal);
      setShowAddTag (false);
     return setTagArr ([...tagArr, tagVal]);
    }
  };
  const tagArrDelete = e => {
    // journalUpdate()
    tagArrayFunction ()
    setShow(false)
    const newtag = journal.tags.filter (d => d !== e);
    setJrTag (newtag);
    setJournal({...journal,tags:newtag})
    handleSave('tag')
    // return tagArrayFunction()
  };
  const handleTagArr = e => {
    tagArrayFunction ()
    let tag = journal.tags;
    tag.push (e);
    setJournal ({...journal, tags: tag});
    setShow (false)
    setJrTag (tag);
    handleSave('tag')
  //  return handleSave ('tags'); 
    
  };
  const handleDelTag = e => {
 return   setdelConfirm (e);
  };
  const deleteTag1 = () => {
    deleteTag (showDelConfirm);
    const newTags = tagArr.filter (e => e !== showDelConfirm);
    setTagArr (newTags);
    setdelConfirm (null);
    return journalUpdate()
  };
  return (
    <div className="row new-row-container">
      <div className="card-main-container col-12">
        {journal &&
          <div className="card-container">
            <div className="header-box1">
              <h5>
                {dateFormat (journal.date, 'MMMM')}{' '}
                {dateFormat (journal.date, 'DD')}{' '}
                <sup style={{marginLeft: -3}}>
                  {sup (dateFormat (journal.date, 'DD'))}
                </sup>
              </h5>
              {edit &&
                <button
                  className="save-btn"
                  onClick={() => handleSave ('save')}
                >
                  Save
                </button>}
            </div>
            <div className="header-box2">
              {(props.id||journal.id) &&
                <span className="edited">
                  EDITED:{dateFormat (journal.edited, 'DD/MM/YY')}
                  <BsDot /> 0 WORDS
                </span>}

              {!edit &&
                <span className="edit-btn" onClick={e => handleEdit ()}>
                  Edit
                </span>}
            </div>

            <div className="edit-container">
              <TextareaAutosize
                disabled={!edit}
                value={journal.body}
                onChange={e => setJournal ({...journal, body: e.target.value})}
                className="text-area"
                aria-label="empty textarea"
                placeholder="Add Your Journal"
              />
            </div>
            {showCapsule && <Capsule badge={'daily'} />}
          </div>}
      </div>
      <div className="card-main-container col-12">
        <div className="card-container">
          <div className="header-box1">
            <h5>Tags </h5>
          </div>
          <div style={{display: 'flex',alignItems: 'center',flexFlow: 'wrap'}}>
          <Capsule addTag={() => { tagArrayFunction(); setShow (true)}} badge="Add Tag" />{' '}
          {journal&&journal.tags!==undefined &&
            journal.tags.map (e => (
              <Capsule addTag={() => tagArrDelete (e)} badge={e} />
            ))}
            </div>
        </div>

        <span onClick={handleClick} />

        <DialogMB
          handleClose={() => handleClosePop ()}
          show={show}
          button2={false}
          title={
            tagArr &&
              tagArr.length !== 0 &&
              <div>
                <button  className="btn" onClick={e => setShowAddTag (true)}>
                  <AiOutlinePlus /> Create tag
                </button>
              </div>
          }
          contant={
            <div>
              {tagArr
                ? tagArr.length === 0
                    ? <div>
                        <button
                          className="btn"
                          onClick={e => setShowAddTag (true)}
                        >
                          <AiOutlinePlus /> Create Tag
                        </button>
                      </div>
                    : tagArr.map ((e, i) => (
                        <div key={`key${i}`} className="flag-box">
                          <span onClick={() => handleTagArr (e)}>{e}</span>

                          <Delete onPress={() => handleDelTag (e)} />
                        </div>
                      ))
                : <div />}
            </div>
          }
        />
      </div>

      <DialogMB
        handleClose={() => setdelConfirm (null)}
        handleDelete={deleteTag1}
        button2={true}
        btn2Txt="Delete"
        show={showDelConfirm === null ? false : true}
        title={'Delete Tag'}
        contant={'Do you want to delete tag?'}
      />

      <DialogMB
        handleClose={() => setShowAddTag (false)}
        handleDelete={() => handleAddTag ()}
        button2={true}
        btn2Txt="ADD"
        show={showAddTag}
        title={'Create New Tag'}
        contant={
          <TextField id="standard-basic" onChange={e => setTagVal (e.target.value)} value={tagVal} label="Add Tag" />
         
        }
      />
      <style>
        {`
      .modal-open .modal{
          z-index:9999;
      }
      
      `}
      </style>
    </div>
  );
};
export default Card;
