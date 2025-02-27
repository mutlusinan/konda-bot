import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "KondaBot",
  initialMessages: [
    createChatBotMessage("Hangi konuda bilgi almak istiyorsunuz?"),
  ],
};

export default config;
