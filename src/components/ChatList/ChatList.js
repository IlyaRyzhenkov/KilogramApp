import React from "react";
import styles from './ChatList.module.css'
import ChatListElement from "../ChatListElement";

export class ChatList extends React.Component {
    render() {
        let id = 0;
        const chats = this.props.chats;
        const chatItems = chats.map((chat) => (
            <ChatListElement key={id++} image={chat.image} name={chat.name} chatId={chat.id} onChangeChat={this.props.onChangeChat}/>
        ));
        return (
            <div className={styles.chat_list_layout}>
                <ul className={styles.chat_list}>
                    {chatItems}
                </ul>
            </div>
        );
    }
}