import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import login from './screens/Login/login';
import {ProtectedRoute} from './utils/protectedRoute';
import Home from './screens/Home/Home';

import Calender from './screens/Calender/CalenderList';
import {AuthContext} from './Context/auth';
function App (props) {
  const [authTokens, setAuthTokens] = useState ('dd');
  const setTokens = data => {
    localStorage.setItem ('tokens', JSON.stringify ('ddd'));
    setAuthTokens ('ss');
  };

  return (
    <BrowserRouter forceRefresh={true}>
      <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/calender" component={Calender} />
            <Route path="*" component={() => '404 NOT FOUND'} />
          </Switch>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
