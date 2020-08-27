import auth from '../../utils/auth';
import Layout from './LoginLayout';
import React, {useState, useEffect} from 'react';

const Login = props => {
  var [form, setForm] = useState ({
    userName: '',
    email: '',
    password: '',
    id: '',
  });
  const [signUp, setSignUp] = useState (
    localStorage.getItem ('users') ? false : true
  );
  const settings = {display: 'none'};
  const [usersData, setUsersData] = useState (
    JSON.parse (localStorage.getItem ('users'))
      ? JSON.parse (localStorage.getItem ('users'))
      : []
  );
  useEffect (
    () => {
      setUsersData (
        JSON.parse (localStorage.getItem ('users'))
          ? JSON.parse (localStorage.getItem ('users'))
          : []
      );
    },
    [signUp]
  );

  const onsubmit = e => {
    e.preventDefault ();
    if (signUp) {
      register ();
    } else {
      userLogin ();
    }
  };
  const userLogin = () => {
    let userData = JSON.parse (localStorage.getItem ('users'));
    userData &&
      userData.filter (e => {
        if (
          e.email === form.email.toLowerCase () &&
          e.password === form.password
        ) {
          auth.login (() => {
            localStorage.setItem ('id', e.id);
            localStorage.setItem ('userData', JSON.stringify (e));
            props.history.push ('/');
          });
        }
      });
  };
  const register = () => {
    const one = Math.random ().toString (36).substr (2);
    const two = Math.random ().toString (36).substr (2);
    let userData = JSON.parse (localStorage.getItem ('users'));
    if (userData) {
      let f;
      let found = userData.some (function (item, index) {
        f = index;
        return item.email == form.email;
      });
      if (found === false) {
        userData.push ({...form, id: one + two, tags: [], journals: []});
        localStorage.setItem ('users', JSON.stringify (userData));
        console.log (localStorage.getItem ('users'), 'yes');
        setSignUp (!signUp);
        resetValue ();
      }
    } else {
      localStorage.setItem (
        'users',
        JSON.stringify ([
          {
            ...form,
            id: one + two,
            email: form.email.toLowerCase (),
            tags: [],
            journals: [],
          },
        ])
      );
      console.log (localStorage.getItem ('users'), 'not');
      setSignUp (!signUp);
      resetValue ();
    }
  };
  const resetValue = () => {
    setForm ({userName: '', email: '', password: '', id: ''});
    setSignUp (!signUp);
  };

  return (
    <Layout settings={settings}>
      <main className="container">
        <div className="container-box">

          <div className="login-container">
            <div className="header">
              <div /><h1>{signUp ? 'Sign Up' : 'Login'}</h1>
            </div>
            <div className="form">
              {signUp &&
                <input
                  id="name"
                  placeholder="Name"
                  type="text"
                  value={form.userName}
                  onChange={e => setForm ({...form, userName: e.target.value})}
                />}
              <input
                id="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => setForm ({...form, email: e.target.value})}
              />
              <input
                id="password"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={e => setForm ({...form, password: e.target.value})}
              />

              {!signUp
                ? <div style={{color: 'white', marginTop: 20}}>
                    New User ? <a
                      style={{
                        color: '#5d9de2',
                        marginTop: 20,
                        cursor: 'pointer',
                      }}
                      onClick={e => {
                        resetValue ();
                      }}
                    >
                      Sign Up
                    </a>
                  </div>
                : <div style={{color: 'white', marginTop: 20}}>
                    Already have account ? <a
                      style={{color: '#5d9de2', cursor: 'pointer'}}
                      onClick={e => {
                        resetValue ();
                      }}
                    >
                      Login
                    </a>
                  </div>}
              <div className="login-button">
                <button onClick={e => onsubmit (e)}>
                  {signUp ? 'SIGNUP' : 'LOGIN'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <style>{`main {
  padding: 5rem 0;
  flex: 1;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}`}</style>

      <style jsx="true">{`
.container-box{
    width: 100%;
    border-radius: 10px;
    max-width:500px;
    box-shadow: 10px 10px 39px 0px rgba(0,0,0,0.75);
    background:#24272a;
}
.login-container{
    
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    background:transparent;
}

.box{
    justify-content: center;
    align-items: center;
    display: flex;
    color:white;
    flex-direction: column;
}
.header{
    margin-top:20px;
    display:flex;
    align-items:center;
  
}
.header>div{
    border-style: solid;
    border-style: solid;
    width: 4px;
    background: linear-gradient( #3aacc0, #69c9ac );
    border: none;
    height: 28px;
      
}
h1{
    background: -webkit-linear-gradient(#3aacc0, #69c9ac);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
    margin-bottom: 0;
    margin-left:2.5rem;
}
.form{
    display:flex;
    flex-direction:column;
    padding:45px;
    position:relative;
}
.form>input{
    padding-bottom: 8px;
    border: 0;
    outline: 0;
    border-bottom: 2px solid #3aacc0;
    color:#3aacc0;
    background:transparent;
}
#password{
    margin-top:20px;
}
#name{
    margin-bottom:20px;
}
.login-button{
    margin-top: 2.5rem;
    display:flex;
    justify-content: center;
    position:relative
}
.login-button>button{
    position: absolute;
    top: 22px;
    height: 49px;
    outline:none;
    width: 63%;
    max-width: 400px;
    border-radius: 50px;
    border: none;
    color:white;
    font-weight:600;
    font-size:1.25rem;
    min-width: 215px;
    background-image: linear-gradient(to bottom, #3aacc0 , #69c9ac);
}
    `}</style>
    </Layout>
  );
};

export default Login;
