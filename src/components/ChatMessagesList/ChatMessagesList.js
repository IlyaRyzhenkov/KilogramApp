import React from "react";
import ChatMessage from "../ChatMessage";
import styles from './ChatMessagesList.module.css'

export class ChatMessagesList extends React.Component {
    render() {
        const messages = this.props.messages;
        const messagesItems = messages.map((message, index) => (
            <ChatMessage key={index} image={message.image} message={message.text} date={message.createdAt}
                         user={message.createdBy.name}/>
        ));
        return (
            <ul className={styles.messages_list}>
                {messagesItems}
            </ul>
        );
    }
}