import React, { useEffect } from "react";
import ReactChatbotKit from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatbotComponent = () => {
  const [messageHistory, setMessageHistory] = React.useState([]);
  useEffect(() => {
    const messages = loadMessages();
    if (messages) {
      setMessageHistory(messages);
    }
  }, []);
  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };
  return (
    <ReactChatbotKit
      config={config}
      messageParser={MessageParser}
      messageHistory={messageHistory.length > 0 ? messageHistory : undefined}
      saveMessages={saveMessages}
      actionProvider={ActionProvider}
    />
  );
};

export default ChatbotComponent;
