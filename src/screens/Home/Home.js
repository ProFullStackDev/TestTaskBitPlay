import React, {useState} from 'react';

import Card from '../../components/Cards/Card';

import AddBtn from '../../components/Buttons/AddBtn';
import DateCircle from '../../components/Calender/DateCircle';
import NewCard from '../../components/Cards/NewCard';
import './Home.scss';
import Header from '../../components/Layout/Header';
import searchJournals from '../../screens/controller/searchJournals';

const Home = props => {
  const [input, setInput] = useState ('');
  const [tagValue, setTagValue] = useState ([]);
  const [data, setData] = useState ([]);
  const [userData, setUserData] = useState (
    JSON.parse (localStorage.getItem ('userData'))
  );
  const [tagData, setTagData] = useState ([]);
  const [tagArr, setTagArr] = useState ([]);
  const [update, setUpdate] = useState (0);
  let [taggArr, setTaggArr] = useState ([]);
  const [search, setSearch] = useState (true);
  React.useEffect (() => {
    const userData = JSON.parse (localStorage.getItem ('userData'));

    // console.log ({...userData, journals: [{date: 'new'}, {date: 'new'}]});
    setTagData (userData);
  }, []);
  const updateArr = () => {
    const data = JSON.parse (localStorage.getItem ('userData'));
    setUserData (data);
  };
  const callback = () => {
    const userData = JSON.parse (localStorage.getItem ('userData'));
    setUserData (userData);
    setTagData (userData);
  };
  const handleSearch = e => {
    const userData = JSON.parse (localStorage.getItem ('userData'));
    setInput (e);
    setData (searchJournals (e, tagArr));
    setUpdate (update + 1);
  };
  let tagarr = [];
  const handleTagSearch = e => {
    taggArr.push (e);
    setTimeout (() => {
      let outputArray = taggArr.filter (function (v, i, self) {
        // It returns the index of the first
        // instance of each value
        return i == self.indexOf (v);
      });

      outputArray = outputArray.filter (function (item) {
        return item !== e;
      });
      setTagArr (outputArray);
      setData (searchJournals (input, outputArray));
    }, 500);
  };

  return (
    <div>
      <div className="main-container" history={props.history}>

        <Header
          history={props.history}
          onChange={e => handleSearch (e)}
          onTagChange={e => handleTagSearch (e)}
          tagValue={tagArr}
          value={input}
          userData={tagData}
          cb={() => updateArr ()}
          item={<Card userData={data} winHistory="/" history={props.history} />}
        />
        <DateCircle
          history={props.history}
          search={search}
          onClick={() => setSearch (true)}
          cb={() => updateArr ()}
          userData={e => setUserData (e)}
        />
        <Card
          cb={() => updateArr ()}
          userData={userData ? userData.journals : []}
          winHistory="/"
          history={props.history}
        />

      </div>

      <AddBtn
        cb={() => callback ()}
        item={<NewCard id={false} new={true} />}
        winHistory="/"
        history={props.history}
      />
    </div>
  );
};

export default Home;
