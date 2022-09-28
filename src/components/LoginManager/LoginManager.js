import React from "react";
import SubmitLoginWindow from "./SubmitLoginWindow";
import LoginWindow from "./LoginWindow";
import RegisterWindow from "./RegisterWindow";
import CookieService from "../../service/CookieService";

export class LoginManager extends React.Component {
    static #KILOGRAM_TOKEN_COOKIE_NAME = "kilogramToken";
    static #KILOGRAM_LOGIN_COOKIE_NAME = "kilogramLogin";

    constructor(props) {
        super(props);
        const tokenCookie = CookieService.getCookie(LoginManager.#KILOGRAM_TOKEN_COOKIE_NAME);
        const loginCookie = CookieService.getCookie(LoginManager.#KILOGRAM_LOGIN_COOKIE_NAME);
        if (tokenCookie && loginCookie) {
            this.state = {
                loginStatus: LoginStatus.SubmitLogin,
                token: tokenCookie,
                login: loginCookie,
            }
        } else {
            this.state = {
                loginStatus: LoginStatus.LoginInProgress
            };
        }

        this.onLoginSubmit_Ok = this.onLoginSubmit_Ok.bind(this);
        this.onLoginSubmit_Reject = this.onLoginSubmit_Reject.bind(this);
        this.onLoginInProgress_LoginOk = this.onLoginInProgress_LoginOk.bind(this);
        this.onLoginInProgress_Register = this.onLoginInProgress_Register.bind(this);
        this.onRegisterInProgress_RegisterOk = this.onRegisterInProgress_RegisterOk.bind(this);
    }

    onLoginSubmit_Ok() {
        this.props.loginCompleted(this.state.login, this.state.token);
        this.setState({loginStatus: LoginStatus.LoginCompleted});
    }

    onLoginSubmit_Reject() {
        this.setState({loginStatus: LoginStatus.LoginInProgress});
        CookieService.clearCookie(LoginManager.#KILOGRAM_TOKEN_COOKIE_NAME);
        CookieService.clearCookie(LoginManager.#KILOGRAM_LOGIN_COOKIE_NAME);
    }

    onLoginInProgress_LoginOk(username, token) {
        this.props.loginCompleted(username, token);
        this.setState({loginStatus: LoginStatus.LoginCompleted});
        CookieService.setCookie(LoginManager.#KILOGRAM_LOGIN_COOKIE_NAME, username, 1);
        CookieService.setCookie(LoginManager.#KILOGRAM_TOKEN_COOKIE_NAME, token, 1);
    }

    onLoginInProgress_Register() {
        this.setState({loginStatus: LoginStatus.RegisterInProgress});
    }

    onRegisterInProgress_RegisterOk(registerMsg) {
        this.setState({loginStatus: LoginStatus.RegisterCompleted, registerMsg: registerMsg});
    }

    render() {
        let registerMsg;
        switch (this.state.loginStatus) {
            case LoginStatus.LoginCompleted:
                return null;
            case LoginStatus.SubmitLogin:
                return (
                    <SubmitLoginWindow login={this.state.login} submitOk={this.onLoginSubmit_Ok} submitReject={this.onLoginSubmit_Reject}/>
                );
            case LoginStatus.RegisterCompleted:
                registerMsg = this.state.registerMsg;
                return (
                    <LoginWindow loginOk={this.onLoginInProgress_LoginOk}
                                 loginRegister={this.onLoginInProgress_Register} registerMsg={registerMsg}/>
                );
            case LoginStatus.LoginInProgress:
                registerMsg = this.state.registerMsg;
                return (
                    <LoginWindow loginOk={this.onLoginInProgress_LoginOk}
                                 loginRegister={this.onLoginInProgress_Register} registerMsg={registerMsg}/>
                );
            case LoginStatus.RegisterInProgress:
                return (
                    <RegisterWindow registerOk={this.onRegisterInProgress_RegisterOk}/>
                );
            default:
                return null;
        }
    }
}

class LoginStatus {
    static LoginCompleted = new LoginStatus(0);
    static SubmitLogin = new LoginStatus(1);
    static LoginInProgress = new LoginStatus(2);
    static RegisterInProgress = new LoginStatus(3);
    static RegisterCompleted = new LoginStatus(4);

    constructor(statusId) {
        this.statusId = statusId;
    }
}
