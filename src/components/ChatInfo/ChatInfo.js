import React from "react";
import Avatar from "../Avatar";
import styles from "./ChatInfo.module.css"

export class ChatInfo extends React.Component {
    render() {
        return (
            <div className={styles.chat_info_wrapper}>
                <Avatar className={styles.chat_info_image} image={this.props.chatImage}/>
                <span className={styles.chat_name}>{this.props.chatName}</span>
            </div>
        );
    }
}