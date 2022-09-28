import React from 'react';
import Chat from '../Chat';
import { ChatCreation } from '../ChatCreation/ChatCreation';
import ChatSelection from '../ChatSelection';

import styles from './ChatManager.module.css';
import MessageService from "../../service/MessageService";

export class ChatManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedChatId: "",
            chats: [],
            mode: "view"
        };

        this.setState = this.setState.bind(this);
        this.onChangeChat = this.onChangeChat.bind(this);
        this.onStartCreateChat = this.onStartCreateChat.bind(this);
        this.onCloseCreateChat = this.onCloseCreateChat.bind(this);
        this.onChatCreated = this.onChatCreated.bind(this);
        this.onNewMessageRecv = this.onNewMessageRecv.bind(this);

        this.token = this.props.token;
        this.login = this.props.login;
    }

    componentDidMount() {
        MessageService.getChatList(this.setState, this.token);
    }

    componentWillUnmount() {
        if (this.controller) {
            this.controller.abort();
        }
    }

    onChangeChat(newChatId) {
        this.setState({selectedChatId: newChatId});
        if(this.controller) {
            this.controller.abort();
        }
        this.createMessageSubscription(newChatId);
    }
    
    onStartCreateChat() {
        this.setState({mode: "createChat"});
    }

    onCloseCreateChat() {
        this.setState({mode: "view"});
    }

    onChatCreated() {
        this.setState({mode: "view"});
        MessageService.getChatList(this.setState, this.token);
    }

    createMessageSubscription(chatId) {
        this.controller = new AbortController();
        MessageService.createMessageSubscription(this.onNewMessageRecv, chatId, this.controller, this.token);
    }

    onNewMessageRecv(newMessage, chatId) {
        let chats = this.state.chats;
        let selectedChat = chats.find(chat => chat.id === chatId);
        selectedChat.messages.push(newMessage);
        this.setState({chats: chats});
    }


    render() {
        if (this.state.chats != null) {
            const selectedChat = this.state.chats.find(chat => chat.id === this.state.selectedChatId);
            if (this.state.mode === "view") {
                return (
                <div className={styles.chat_wrapper}>
                    <ChatSelection chats={this.state.chats} onChangeChat={this.onChangeChat} onStartCreateChat={this.onStartCreateChat}/>
                    { selectedChat ? (<Chat id={selectedChat.id} chatImage={selectedChat.image} chatInfo={selectedChat.name}
                                        messages={this.sortMessagesByDate(selectedChat.messages)} token={this.token} />) : null
                    }
                </div>
                );
            } else {
                return (
                <div className={styles.chat_wrapper}>
                    <ChatCreation onCloseCreateChat={this.onCloseCreateChat} onChatCreated={this.onChatCreated} login={this.login} token={this.token}/>
                </div>
                ); 
            }
        }
    }
    
    sortMessagesByDate(messages) {
        return messages.sort(
            function(a, b) {
            const dateA = a.createdAt.split(".")[0]
            const dateB = b.createdAt.split(".")[0]
            return new Date(dateA) - new Date(dateB)
            }
            )
    }
}