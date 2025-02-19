// ChatWidget.jsx
import React, { useState, useEffect } from "react"; // Import React and its hooks for state and lifecycle management
import tmi from "tmi.js"; // Import tmi.js to interact with Twitch chat

// Define the ChatWidget component
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
    <div className="chat-widget">
      {/* TODO: Render chat messages dynamically here */}
      Chat widget will appear here.
    </div>
  );
};

export default ChatWidget; // Export the component for use in other parts of the app
