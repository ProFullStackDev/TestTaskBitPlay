import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import {BiLogOut} from 'react-icons/bi';
import auth from '../../utils/auth';
import Drawer from '../../components/Drawer/Drawer';
const Header = ({history,item,winHistory,value,onChange,cb,userData,onTagChange,tagValue}) => {
  
  return (
    <div className="header-container">
      <div className="header-items">
        <div>Journal  App</div>
        
        <div className="h-1">
        <Drawer
           onTagChange={e=>onTagChange(e)}
           tagValue={tagValue} 
        userData={userData} width={true} history={history} onChange={onChange} handleClose={cb} value={value} tiny="search" listClass="menu-card-list" winHistory={winHistory} anchor="bottom" height="100%" list={item} 
        button={<AiOutlineSearch style={{marginRight:10}} />}></Drawer>
          

          <BiLogOut
            onClick={() =>
              auth.logout (() => {
                history.push ('/login');
              })}
          />
        </div>
      </div>
      <style>{`

.header-container{
    width: 100%;
    color:white;
    max-width: 500px;
    padding:20px 25px;
    font-size:20px;
    display:flex;
}
.input-box{
    width:50px;
}
.h-1{

    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-items{
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

export default Header;
