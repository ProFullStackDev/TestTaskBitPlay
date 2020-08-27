export default tag => {
  const userData = JSON.parse (localStorage.getItem ('userData'));

  let tags = userData.tags.filter (val => val !== tag);

  const newData = {...userData, tags: tags};

  localStorage.removeItem ('userData');

  localStorage.setItem ('userData', JSON.stringify (newData));

  let usersData = JSON.parse (localStorage.getItem ('users'));

  const newUsersData = usersData.filter (e => e.email !== newData.email);

  const data = [...newUsersData, newData];

  localStorage.setItem ('users', JSON.stringify (data));
};
