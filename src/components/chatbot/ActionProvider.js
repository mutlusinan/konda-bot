class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
    if (message.length < 1 || message.length > 30) {
      const botMessage = this.createChatBotMessage(
        "Mesajınız 1 ila 30 karakter arasında olmalıdır."
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
      return;
    }
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const listItems =
        data.relevantQuestions.length > 0 ? (
          data.relevantQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))
        ) : (
          <p>Bu konuda elimde bilgi yok.</p>
        );

      const botMessage = this.createChatBotMessage(<ul>{listItems}</ul>);

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.log("errorerror", error);
      const botMessage = this.createChatBotMessage(
        "Bir hata oluştu, lütfen tekrar deneyin."
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };
}

export default ActionProvider;
