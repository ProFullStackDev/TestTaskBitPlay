export default updatedJournalData => {
  const userData = JSON.parse (localStorage.getItem ('userData'));

  let journals = userData.journals.filter (e => e.id !== updatedJournalData.id);

  journals.push (updatedJournalData);

  const newData = {...userData, journals: journals};
  // console.log (newData);

  localStorage.setItem ('userData', JSON.stringify (newData));

  let usersData = JSON.parse (localStorage.getItem ('users'));

  const newUsersData = usersData.filter (e => e.email !== newData.email);

  const data = [...newUsersData, newData];

  localStorage.setItem ('users', JSON.stringify (data));
};
