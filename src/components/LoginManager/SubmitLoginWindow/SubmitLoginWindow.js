import React from "react";

import styles from "./SubmitLoginWindow.module.css"

export class SubmitLoginWindow extends React.Component {
    render() {
        return (
            <div className={styles.submit_window}>
                <span>{"Зарегистрирован как " + this.props.login}</span>
                <button className={styles.submit_button} onClick={this.props.submitOk}>Войти</button>
                <button className={styles.submit_button} onClick={this.props.submitReject}>Выйти</button>
            </div>
        );
    }
}