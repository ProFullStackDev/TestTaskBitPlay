import React from 'react';


const Layout = ({children, settings = {}, history}) => {
  return (
    <div className="main-container">
      {children}
    </div>
  );
};

export default Layout;
