import React from "react";
import ChatMessagesList from "../ChatMessagesList";
import MessageEditor from "../MessageEditor";
import ChatInfo from "../ChatInfo";
import styles from "./Chat.module.css"
import MessageService from "../../service/MessageService";

export class Chat extends React.Component {

    render() {
        return (
            <div className={styles.chat_wrapper}>
                <ChatInfo chatImage={this.props.chatImage} chatName={this.props.chatInfo}/>
                <div className={styles.messages_container}>
                    <div className={styles.messages_layout}>
                        <ChatMessagesList messages={this.props.messages}/>
                    </div>
                    <MessageEditor sendMessage={MessageService.createSendMessage(this.props.token, this.props.id)}/>
                </div>
            </div>
        );
    }
}