import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Auth from './Auth/Auth';
import * as serviceWorker from './serviceWorker';
import { Router, Route } from "react-router-dom";
import history from './app-history';
import Callback from './Callback/Callback';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


ReactDOM.render(
  <Router history={history}>
    <div>
    <Route path="/" render={(props) => <App auth={auth} {...props} />} />
    <Route path="/callback" render={(props) => {
      handleAuthentication(props);
      return <Callback {...props} />
    }}/>
    </div>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
