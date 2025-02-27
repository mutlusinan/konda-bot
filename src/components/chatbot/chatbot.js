import React from "react";
import ReactChatbotKit from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatbotComponent = () => {
  return <ReactChatbotKit config={config} messageParser={MessageParser} actionProvider={ActionProvider} />;
};

export default ChatbotComponent;
