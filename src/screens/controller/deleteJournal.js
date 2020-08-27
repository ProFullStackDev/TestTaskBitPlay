export default journalID => {
  const userData = JSON.parse (localStorage.getItem ('userData'));

  let journals = userData.journals.filter (val => val.id !== journalID);

  const newData = {...userData, journals: journals};

  localStorage.removeItem ('userData');

  localStorage.setItem ('userData', JSON.stringify (newData));

  let usersData = JSON.parse (localStorage.getItem ('users'));

  const newUsersData = usersData.filter (e => e.email !== newData.email);

  const data = [...newUsersData, newData];

  localStorage.setItem ('users', JSON.stringify (data));
};
