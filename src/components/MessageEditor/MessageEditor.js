import React from "react";
import styles from "./MessageEditor.module.css"

export class MessageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        this.props.sendMessage(this.state.value)
        this.setState({value: ""})
    }

    render() {
        return (
            <div className={styles.text_editor_container}>
                <div className={styles.text_editor_layout}>
                    <textarea className={styles.message_input} value={this.state.value} onChange={this.handleChange} />
                    <button className={styles.send_message_button} onClick={this.handleSubmit}>Отправить</button>
                </div>
            </div>
        );
    }
}