import React from "react";
import styles from "./ChatCreation.module.css"

export class ChatCreation extends React.Component {
    static FETCH_USER_COUNT = 1000;

    constructor(props) {
        super(props);

        this.state = {
            nameValue: "",
            participaintLoginValue: "",
            participaints: [props.login],
            allUsers: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddParticipaint = this.handleAddParticipaint.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleParticipaintNameChange = this.handleParticipaintNameChange.bind(this);

        this.token = this.props.token;
    }

    componentDidMount() {
        this.getUserLogins();
      }

    handleNameChange(event) {
        this.setState({nameValue: event.target.value});
    }

    handleParticipaintNameChange(event) {
        this.setState({participaintLoginValue: event.target.value});
    }

    handleSubmit() {
        if (this.state.nameValue.length === 0 || this.state.participaints.length <= 1) {
            return;
        }
        let type = "PRIVATE";
        if (this.state.participaints.length > 2) {
            type = "GROUP";
        }
        this.createChat(this.token, type, this.state.nameValue, this.state.participaints);
        this.props.onChatCreated();
    }

    handleAddParticipaint() {
        if (this.state.allUsers.some(user => this.state.participaintLoginValue.toLowerCase() === user.login.toLowerCase())) {
            if (!this.state.participaints.some(user => this.state.participaintLoginValue.toLowerCase() === user.toLowerCase())) {
                this.state.participaints.push(this.state.participaintLoginValue);
            }
        }
        this.setState({participaintLoginValue: ""});
    }

    createChat(token, chatType, chatName, participaints) {
        fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                        'Authorization': token},
                body: JSON.stringify({
                    query: `mutation CreateChat($type: ChatType!, $name: String!, $members: [String!]!) {
                        createChat(type: $type, name: $name, members: $members) { id }
                }`,
                    variables: {type: chatType, name: chatName, members: participaints}
                })
            })
    }

    getUserLogins() {
        fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            query: `query GetLogns($first: Int) {
                        users(first: $first) {
                            login
                        }
                    }`,
              variables: {first: ChatCreation.FETCH_USER_COUNT}
          })
        })
            .then(response => response.json())
            .then(json => this.setState({allUsers: json.data.users}));
    }

    render() {
        const currentParticipaints = this.state.participaints.map(login => {
            return (
            <li key={login} className={styles.participaint_element}>
                {login}
            </li>
            );
        });

        return (
            <div className={styles.chat_creation_window}>
                <div className={styles.chat_name_block}>
                    <div className={styles.chat_name_title}>Название чата</div>
                    <input className={styles.chat_name_field} value={this.state.nameValue} onChange={this.handleNameChange}/>
                </div>
                <div className={styles.chat_participaints_block}>
                    <div className={styles.chat_name_title}>Добавить участников</div>
                    <input className={styles.participaint_name_field} value={this.state.value} onChange={this.handleParticipaintNameChange} />
                    <button className={styles.add_participaint_button} onClick={this.handleAddParticipaint}>Добавить</button>
                    <div className={styles.participaints_list_title}>Список участников</div>
                    <ul className={styles.participaints_list}>
                        {currentParticipaints}
                    </ul>
                </div>
                <div className={styles.control_block}>
                    <button className={styles.submit_button} onClick={this.handleSubmit}>Создать чат</button>
                    <button className={styles.close_button} onClick={this.props.onCloseCreateChat}>Назад</button>
                </div>
            </div>
        );
    }
}