export default tag => {
  const userData = JSON.parse (localStorage.getItem ('userData'));
console.log(tag)
  let tags = [];
  if (!userData.tags) {
    tags.push (tag);
  } else if (userData.tags) {
    userData.tags.map (val => {
      tags.push (val);
    });
    tags.push (tag);
  }

  const newData = {...userData, tags: tags};

  localStorage.removeItem ('userData');

  localStorage.setItem ('userData', JSON.stringify (newData));

  let usersData = JSON.parse (localStorage.getItem ('users'));

  const newUsersData = usersData.filter (e => e.email !== newData.email);

  const data = [...newUsersData, newData];

  localStorage.setItem ('users', JSON.stringify (data));
};
