import React from "react";
import styles from "./Avatar.module.css"

export class Avatar extends React.Component {
    render() {
        let image;
        if (this.props.image === undefined || this.props.image === null) {
            image = "icons/user-svgrepo-com.svg";
        } else {
            image = "data:image/png;base64," + this.props.image;
        }
        return (
            <img className={styles.user_avatar} src={image} alt="User Avatar"/>
        );
    }
}