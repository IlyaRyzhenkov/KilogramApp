import React from "react";
import { ChatList } from "../ChatList/ChatList";
import styles from "./ChatSelection.module.css"

export class ChatSelection extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onStartCreateChat();
    }

    render() { 
        return ( 
            <div className={styles.chat_selection_panel}>
                <ChatList chats={this.props.chats} onChangeChat={this.props.onChangeChat}/>
                <button className={styles.add_new_chat_button} onClick={this.handleClick}>
                    Создать чат
                </button>
            </div>
        );
    }
}