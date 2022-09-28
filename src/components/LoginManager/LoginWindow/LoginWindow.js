import React from "react";

import styles from "./LoginWindow.module.css"
import AuthorizationService from "../../../service/AuthorizationService";

export class LoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordValue: "",
            loginValue: "",
            loginErrorMessage: null,
        }

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onLoginComplete = this.onLoginComplete.bind(this);
    }


    handleChangeLogin(event) {
        this.setState({loginValue: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({passwordValue: event.target.value});
    }

    handleLogin() {
        AuthorizationService.signIn(this.state.loginValue, this.state.passwordValue, this.onLoginComplete);
        this.setState({passwordValue: ""});
    }

    onLoginComplete(servResponse) {
        switch (servResponse.status) {
            case AuthorizationService.STATUS_CONNECTION_ERROR:
            case AuthorizationService.STATUS_AUTH_ERROR:
                this.setState({loginErrorMessage: servResponse.errorMessage});
                break;
            case AuthorizationService.STATUS_OK:
                this.props.loginOk(servResponse.login, servResponse.token);
                break;
            default:
                throw new TypeError("Unknown state " + servResponse.status);
        }
    }

    handleRegister() {
        this.props.loginRegister();
    }

    render() {
        const registerMessage = this.props.registerMsg ? <span className={styles.login_register_message}>{this.props.registerMsg}</span> : null;
        const loginErrorMessage = this.state.loginErrorMessage ?
            <span className={styles.login_error_message}>{this.state.loginErrorMessage}</span> : null
        return (
            <div className={styles.login_window}>
                <span>Авторизация</span>
                <label for="login">Логин</label>
                <input type="text" name="login" value={this.state.loginValue} onChange={this.handleChangeLogin}/>
                <label for="password">Пароль</label>
                <input type="password" name="password" value={this.state.passwordValue}
                       onChange={this.handleChangePassword}/>
                <button className={styles.login_button} onClick={this.handleLogin}>Авторизация</button>
                {loginErrorMessage}
                <button className={styles.login_button} onClick={this.handleRegister}>Зарегистрироваться</button>
                {registerMessage}
            </div>
        );
    }
}