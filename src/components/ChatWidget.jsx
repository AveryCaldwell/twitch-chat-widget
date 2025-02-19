// ChatWidget.jsx
// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
// import tmi from "tmi.js";

const ChatWidget = () => {
  //   const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: Initialize tmi.js client and connect to Twitch chat

    // TODO: Set up an event listener to handle incoming messages

    return () => {
      // TODO: Disconnect the tmi.js client when the component unmounts
    };
  }, []);

  return (
    <div className="chat-widget">
      {/* TODO: Render chat messages here */}
      Chat widget will appear here.
    </div>
  );
};

export default ChatWidget;
