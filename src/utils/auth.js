class Auth {
  constructor () {
    this.authenticated = localStorage.getItem ('id');
  }

  login (cb) {
    this.authenticated = localStorage.getItem ('id');
    cb ();
  }

  logout (cb) {
    localStorage.removeItem ('id');
    localStorage.removeItem ('userData');

    cb ();
  }

  isAuthenticated () {
    return this.authenticated;
  }
}

export default new Auth ();
