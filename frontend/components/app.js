import React, { Component } from 'react';
import Navbar from './navbar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import css from '../style/style.scss';

injectTapEventPlugin();

const App = ({children}) => {
  return (
    <div className="site">
        <Navbar />
        {children}
    </div>
  );
};

export default App;
