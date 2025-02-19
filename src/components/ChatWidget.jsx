// ChatWidget.jsx
import React, { useState, useEffect } from "react";
import tmi from "tmi.js"; // Import tmi.js to interact with Twitch chat

const ChatWidget = () => {
  // Initialize state to store chat messages
  const [messages, setMessages] = useState([]);

  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Create a new tmi.js client and specify the Twitch channel to connect to
    const client = new tmi.Client({
      channels: ["AvesTheAdventurer"], // Replace with your actual Twitch channel name
    });

    // Connect to Twitch chat using the client
    client.connect();

    // Listen for incoming messages from the Twitch channel
    client.on("message", (channel, tags, message, self) => {
      // Ignore messages that come from the client itself
      if (self) return;

      // Update the messages state by adding the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: tags["display-name"] || tags.username, message },
      ]);
    });

    // Cleanup function: disconnect the client when the component unmounts
    return () => {
      client.disconnect();
    };
  }, []); // The empty dependency array ensures this runs only once on mount

  // Render the chat widget UI
  return (
    // This will render each chat message as it arrives, using the username and message from your state.
    <div className="chat-widget">
      {/* loop through each message in the state. */}
      {messages.map((msg, index) => (
        // Each message gets a unique key (here, using the index) to help React efficiently update the DOM.
        <div key={index} className="chat-message">
          {/* For every message, we show the username in bold followed by the
          message text. */}
          <strong>{msg.username}: </strong>
          <span>{msg.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWidget;
