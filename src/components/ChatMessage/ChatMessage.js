import React from "react";
import Avatar from "../Avatar";
import styles from './ChatMessage.module.css'
import DateService from "../../service/DateService";

export class ChatMessage extends React.Component {
    render() {
        return (
            <li className={styles.message_item}>
                <div className={styles.user_info}>
                    <Avatar className={styles.user_avatar} image={this.props.user.image}/>
                    <span className={styles.user_name}>{this.props.user}</span>
                </div>
                <span className={styles.message_text}>{this.props.message}</span>
                <span className={styles.message_date}>{DateService.getDateString(this.props.date)}</span>
            </li>
        );
    }
}