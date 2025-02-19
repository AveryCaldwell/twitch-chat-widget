// ChatWidget.jsx
import React, { useState, useEffect } from "react";
import tmi from "tmi.js"; // Import tmi.js to interact with Twitch chat
import "./ChatWidget.css";

// Import your PNG icons
import broadcasterIcon from "../assets/icons/broadcaster.png";
import modIcon from "../assets/icons/mod.png";
import subIcon from "../assets/icons/sub.png";
import defaultIcon from "../assets/icons/default.png";

const ChatWidget = () => {
  // Initialize state to store chat messages
  const [messages, setMessages] = useState([]);

  // An object that maps each role to the appropriate icon
  const roleIcons = {
    broadcaster: broadcasterIcon,
    mod: modIcon,
    sub: subIcon,
    default: defaultIcon,
  };

  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Create a new tmi.js client and specify the Twitch channel to connect to
    const client = new tmi.Client({
      channels: ["AvesTheAdventurer"],
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
          setMessages([]); // Clear all chat messages
          return; // Exit early so the command message isn't added to the chat
        }
      }

      // If not a command, add the new message to the chat state
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
      {/* // Determine the role class based on Twitch tags */}
      {messages.map((msg, index) => {
        let roleClass = "";
        let icon = roleIcons.default;

        // Check for broadcaster
        if (msg.tags?.badges?.broadcaster) {
          roleClass = "broadcaster";
          icon = roleIcons.broadcaster;
        }
        // Check for mod
        else if (msg.tags?.mod) {
          roleClass = "mod";
          icon = roleIcons.mod;
        }
        // Check for subscriber
        else if (msg.tags?.subscriber) {
          roleClass = "sub";
          icon = roleIcons.sub;
        }

        return (
          <div key={index} className="chat-message">
            <div className={`username-badge ${roleClass}`}>
              <img src={icon} alt="role icon" className="user-icon" />
              {msg.username}
            </div>
            <div className="message-text">{msg.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWidget;
