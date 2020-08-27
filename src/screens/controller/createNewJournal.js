export default newJournalData => {
  const userData = JSON.parse (localStorage.getItem ('userData'));

  let journals = [];
  if (!userData.journals) {
    journals.push (newJournalData);
  } else if (userData.journals) {
    userData.journals.map (val => {
      journals.push (val);
    });
    journals.push (newJournalData);
  }

  const newData = {...userData, journals: journals};

  localStorage.removeItem ('userData');

  localStorage.setItem ('userData', JSON.stringify (newData));

  let usersData = JSON.parse (localStorage.getItem ('users'));

  const newUsersData = usersData.filter (e => e.email !== newData.email);

  const data = [...newUsersData, newData];

  localStorage.setItem ('users', JSON.stringify (data));
  console.log(data)
};
