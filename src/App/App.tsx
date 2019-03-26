import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import logo from '../logo.svg';
import './App.css';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

interface IAppRouterProps {

}

interface IProps extends RouteComponentProps<IAppRouterProps> {
  history: History,
  auth: any //TODO: add a type for Auth
}

class App extends Component<IProps> {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    console.log('log in')
    this.props.auth.login();
  }

  logout() {
    console.log('log out')
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated();
    let button;
    if (isAuthenticated) {
      button = <Button variant="contained" color="primary" onClick={this.logout}>Logout</Button>
    }
    else {
      button = <Button variant="contained" color="primary" onClick={this.login} >Login</Button>
    }
    return (
      <div className="App">
        <header className="App-header">
        <NavBar />
          <img src={logo} className="App-logo" alt="logo" />
          {button}
        </header>
      </div>
    );
  }
}

export default withRouter(App);
