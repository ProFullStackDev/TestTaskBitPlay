import * as types from '../types';
import {handleLoader} from './app/index';
// import cookie from 'js-cookie';
import axios from 'axios';

axios.defaults.baseURL = 'https://careerninjatestbackend.herokuapp.com/';
//   axios.interceptors.request.use(function (config) {
//     config.headers.Authorization =  cookie.get("token");
//     return config;
// });

export const getBattleData_action = params => {
  return dispatch => {
    dispatch (handleLoader (true));
    axios
      .get (`list`)
      .then (async res => {
        dispatch ({type: types.BATTLE_DATA, data: res.data});
        dispatch (handleLoader (false));
      })
      .catch (error => {
        console.log (error);
      });
  };
};

export const loginUser = userData => dispatch => {
  dispatch ({
    type: 'LOGIN_USER',
    payload: userData,
  });
};
