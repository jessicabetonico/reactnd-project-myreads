import React from 'react';
import './App.css';

const NoMatch = ({location}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="center-text">
      <h1>404 Page not found for path <code>{location.pathname}</code></h1>
    </div>
  </div>
)

export default NoMatch;
