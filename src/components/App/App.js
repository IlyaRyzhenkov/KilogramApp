import React from 'react';
import { ChatManager } from '../ChatManager/ChatManager';
import LoginManager from '../LoginManager';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: false,
      login: "",
      token: ""
    }

    this.loginCompleted = this.loginCompleted.bind(this);
  }

  loginCompleted(login, token) {
    this.setState({isUserLoggedIn: true, login: login, token: token});
  }

  render() {
    return this.state.isUserLoggedIn ? <ChatManager login={this.state.login} token={this.state.token}/> : <LoginManager loginCompleted={this.loginCompleted}/>
  }
}
