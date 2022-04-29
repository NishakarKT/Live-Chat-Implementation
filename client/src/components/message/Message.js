import React from "react";
import "./Message.css";

const Message = ({ myId, senderId, sender, text, time }) => {
    const mine = Boolean(myId === senderId);
    return (
        <div className={`message ${mine ? "message__mine" : ""}`}>
            <h1>{sender}</h1>
            <h2>{text}</h2>
            <h3>{time}</h3>
        </div>
    );
};

export default Message;
