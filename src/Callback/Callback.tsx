import React, { Component } from 'react';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ICallbackRouterProps {

}

interface IProps extends RouteComponentProps<ICallbackRouterProps> {
  history: History
}

class Callback extends Component<IProps> {

  constructor(props) {
    super(props)
  }

  render(){
    return(
      <p>Loading...</p>
    )
  }

}

export default Callback
