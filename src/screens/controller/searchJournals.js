export default (strng, tag) => {
  const userData = JSON.parse (localStorage.getItem ('userData'));
  if (strng && !tag) {
    const filterData = userData.journals.filter (str => {
      const dataString = str.body.toLowerCase ();
      if (dataString.includes (strng.toLowerCase ())) {
        return str;
      }
    });

    return filterData;
  } else if (tag && !strng) {
    let filterdData = [];
    tag.forEach (element => {
      userData.journals.filter (str => {
        str.tags.forEach (e => {
          if (e.toLowerCase () === element.toLowerCase ()) {
            filterdData.push (str);
          }
        });
      });
    });
    return filterdData;
  } else if (strng && tag) {
    const filterData = userData.journals.filter (str => {
      const dataString = str.body.toLowerCase ();
      if (dataString.includes (strng.toLowerCase ())) {
        return str;
      }
    });

    let filterdData = [];
    tag.forEach (element => {
      userData.journals.filter (str => {
        str.tags.forEach (e => {
          if (e.toLowerCase () === element.toLowerCase ()) {
            filterdData.push (str);
          }
        });
      });
    });

    const res = filterData.concat (filterdData);

    const unique = [...new Set (res.map (item => item))];
    return unique;
  }
};
