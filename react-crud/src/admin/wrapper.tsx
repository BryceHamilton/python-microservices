import React from 'react';
import Menu from './menu';
import Nav from './nav';

const Wrapper: React.FC = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className='container-fluid'>
        <div className='row'>
          <Menu />
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
