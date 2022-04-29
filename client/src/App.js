import React, { useState, useEffect } from "react";
import "./App.css";
// constants
import { BG } from "./constants/images";
// components
import Message from "./components/message/Message";
// services
import socket from "./services/socket";
// material-ui
import { TextField, Button } from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

function App() {
  let key = 0;
  const [myId, setMyId] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [textErr, setTextErr] = useState(false);
  const [disable, setDisable] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("myKey", myKey => setMyId(myKey));
    socket.on("sentMessage", message => {
      setMessages(messages => [...messages, { ...message, time: new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }) }]);
      document.querySelector(".app__chatBox").scrollTop = document.querySelector(".app__chatBox").scrollHeight;
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setNameErr(!Boolean(name));
    setTextErr(!Boolean(text));

    if (name && text) {
      setDisable(true);
      const message = { sender: name, senderId: myId, text };
      setMessages(messages => [...messages, { ...message, time: new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }) }]);
      socket.emit("sendMessage", message);
      document.querySelector(".app__chatBox").scrollTop = document.querySelector(".app__chatBox").scrollHeight;
      setText("");
    };
  }

  return (
    <div className="app">
      <img className="app__bg" src={BG} alt="" />
      <div className="app__chatBox">
        {messages.map(message => <Message key={key++} myId={myId} senderId={message.senderId} sender={message.sender} text={message.text} time={message.time} />)}
      </div>
      <form className="app__send" onSubmit={(e) => sendMessage(e)}>
        <TextField
          value={name}
          label="Name"
          error={nameErr}
          disabled={disable}
          helperText={nameErr ? "What's your name ?" : ""}
          onChange={(e) => setName(e.target.value)} />
        <TextField
          value={text}
          label="Type your message"
          error={textErr}
          helperText={textErr ? "Where's your text ?" : ""}
          onChange={(e) => setText(e.target.value)} />
        <Button type="submit"><SendRoundedIcon /></Button>
      </form>
      <div>
      </div>
    </div>
  );
}

export default App;
