import React from "react";

import styles from "./RegisterWindow.module.css"
import AuthorizationService from "../../../service/AuthorizationService";

export class RegisterWindow extends React.Component {
    static #REGISTER_NOT_EQUAL_PASSWORDS_ERROR_MESSAGE = "Пароли не совпадают";

    constructor(props) {
        super(props);
        this.state = {
            loginValue: "",
            nameValue: "",
            passwordValue: "",
            password2Value: "",
            registerErrorMessage: null,
        };

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onRegisterComplete = this.onRegisterComplete.bind(this);
    }

    handleChangeLogin(event) {
        this.setState({loginValue: event.target.value});
    }

    handleChangeName(event) {
        this.setState({nameValue: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({passwordValue: event.target.value});
    }

    handleChangePassword2(event) {
        this.setState({password2Value: event.target.value});
    }

    handleRegister() {
        if (this.state.passwordValue !== this.state.password2Value) {
            this.setState({registerErrorMessage: RegisterWindow.#REGISTER_NOT_EQUAL_PASSWORDS_ERROR_MESSAGE});
            return;
        }
        AuthorizationService.register(this.state.loginValue, this.state.passwordValue, this.state.nameValue, this.onRegisterComplete);
        this.setState({passwordValue: "", password2Value: ""});
    }

    onRegisterComplete(servResponse) {
        switch (servResponse.status) {
            case AuthorizationService.STATUS_CONNECTION_ERROR:
            case AuthorizationService.STATUS_AUTH_ERROR:
                this.setState({registerErrorMessage: servResponse.errorMessage});
                break;
            case AuthorizationService.STATUS_OK:
                this.props.registerOk("Зарегистрирован пользователь с логином " + servResponse.login + " и именем " + servResponse.name);
                break;
            default:
                throw new TypeError("Unknown status " + servResponse.status);
        }
    }

    render() {
        const registerErrorMessage = this.state.registerErrorMessage ?
            (<span className={styles.register_error_message}>{this.state.registerErrorMessage}</span>) : null;
        return (
            <div className={styles.register_window}>
                <span>Регистрация</span>
                <label for="login">Логин</label>
                <input type="text" name="login" value={this.state.loginValue} onChange={this.handleChangeLogin}/>
                <label for="name">Имя</label>
                <input type="text" name="name" value={this.state.nameValue} onChange={this.handleChangeName}/>
                <label for="password1">Пароль</label>
                <input type="password" name="password1" value={this.state.passwordValue} onChange={this.handleChangePassword}/>
                <label for="password2">Повторите пароль</label>
                <input type="password" name="password2" value={this.state.password2Value} onChange={this.handleChangePassword2}/>
                <button type={styles.register_button} onClick={this.handleRegister}>Зарегистрироваться</button>
                {registerErrorMessage}
            </div>
        );
    }
}