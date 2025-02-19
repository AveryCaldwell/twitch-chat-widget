// ChatWidget.jsx
import React, { useState, useEffect } from "react";
import tmi from "tmi.js"; // Import tmi.js to interact with Twitch chat
import "./ChatWidget.css";

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

      // Check if the message is the "!clear" command
      if (tags.mod || tags.badges?.broadcaster) {
        if (message.trim() === "!clear") {
          // Optionally, you could restrict this to mods or the broadcaster:
          //   console.log("Tags:", tags);
          //   console.log("Channel:", channel);
          setMessages([]); // Clear all chat messages
          return; // Exit early so the command message isn't added to the chat
        }
      }
      // Update the messages state by adding the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: tags["display-name"] || tags.username, message, tags },
      ]);
    });

    // Cleanup function: disconnect the client when the component unmounts
    return () => {
      client.disconnect();
    };
  }, []); // The empty dependency array ensures this runs only once on mount

  // Render the chat widget UI
  return (
    <div className="chat-widget">
      {messages.map((msg, index) => {
        // Determine the role class based on Twitch tags
        let roleClass = "";
        // The ?. operator checks if msg.tags exists before trying to access badges.
        // If msg.tags is undefined or null, this expression returns undefined instead of throwing an error.
        //   Similarly, msg.tags?.badges checks if the badges property exists before trying to access the broadcaster property.
        if (msg.tags?.badges?.broadcaster) {
          roleClass = "broadcaster";
        } else if (msg.tags?.mod) {
          roleClass = "mod";
        } else if (msg.tags?.subscriber) {
          roleClass = "sub";
        }

        return (
          //   <div key={index} className={`chat-message ${roleClass}`}>
          <div key={index} className="chat-message">
            <div className={`username-badge ${roleClass}`}> {msg.username}</div>
            <div className="message-text">{msg.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWidget;
