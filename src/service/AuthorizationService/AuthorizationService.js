export class AuthorizationService {
    static STATUS_OK = 0;
    static STATUS_CONNECTION_ERROR = 1;
    static STATUS_AUTH_ERROR = 2;

    static #AUTH_NOT_AVAILABLE_ERROR_MESSAGE = "Сервис аутентификации недоступен";
    static #AUTH_INCORRECT_PASSWORD_ERROR_MESSAGE = "Неверный логин или пароль";
    static #AUTH_LOGIN_NOT_AVAILABLE_ERROR_MESSAGE = "Выбранный логин не доступен";

    static signIn(login, password, callback) {
        this.#fetchSignIn(login, password, callback);
    }

    static register(login, password, name, callback) {
        this.#fetchRegister(login, password, name, callback);
    }

    static #fetchSignIn(login, password, callback) {
        fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query SignIn($login: String!, $password: String!) {
                            signIn(login: $login, password: $password)
                        }`,
                variables: {login: login, password: password}
            })
        }).then(
            response => response.json().then(json => this.#handleSignInJson(login, json, callback))
        ).catch(error => callback({status: this.STATUS_CONNECTION_ERROR, errorMessage: this.#AUTH_NOT_AVAILABLE_ERROR_MESSAGE}));
    }

    static #handleSignInJson(login, json, callback) {
        if (json.hasOwnProperty("errors")) {
            callback({status: this.STATUS_AUTH_ERROR, errorMessage: this.#AUTH_INCORRECT_PASSWORD_ERROR_MESSAGE});
        } else {
            callback({status: this.STATUS_OK, login: login, token: json.data.signIn});
        }
    }

    static #fetchRegister(login, password, name, callback) {
        fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `mutation Register($login: String!, $password: String!, $name: String!) {
                            register(login: $login, password: $password, name: $name) {
                                login,
                                name
                            }
                        }`,
                variables: {login: login, password: password, name: name}
            })
        }).then(
            response => response.json().then(json => this.#handleRegisterJson(json, callback))
        ).catch(error => callback({status: this.STATUS_CONNECTION_ERROR, errorMessage: this.#AUTH_NOT_AVAILABLE_ERROR_MESSAGE}));
    }

    static #handleRegisterJson(json, callback) {
        if (json.hasOwnProperty("errors")) {
            callback({status: this.STATUS_AUTH_ERROR, errorMessage: this.#AUTH_LOGIN_NOT_AVAILABLE_ERROR_MESSAGE});
        } else {
            console.log(json);
            callback({status: this.STATUS_OK, login: json.data.register.login, name: json.data.register.name});
        }
    }
}