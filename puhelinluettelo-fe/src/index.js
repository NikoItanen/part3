import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';


axios.get('http://localhost:3001/api/persons').then(response => {
  ReactDOM.render(
    <React.StrictMode>
      <App persons={response.data} />
    </React.StrictMode>,
    document.getElementById('root')
  );
});