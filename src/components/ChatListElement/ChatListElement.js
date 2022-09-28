import React from "react";
import Avatar from "../Avatar";
import styles from './ChatListElement.module.css';

export class ChatListElement extends React.Component {

    constructor(props) {
        super(props);

        this.chatId = props.chatId

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChangeChat(this.chatId);
    }


    render() {
        return (
            <li className={styles.chat_list_element}>
                <button onClick={this.handleClick} className={styles.chat_button}>
                    <Avatar className={styles.chat_image} image={this.props.image}/>
                    <span className={styles.chat_name}>{this.props.name}</span>
                </button>
            </li>
        );
    }
}