"use client";
import React, { useEffect, useRef, useState } from "react";
import Message from "./message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type MessageType = {
  id: string;
  content: string;
  date: string;
  sender: "bot" | "user";
};

function formatMessageDateNow() {
  const date = new Date();
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.toTimeString().slice(0, 5)}`;
}

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content:
        "Hello! I'm Embedchain Bot, ready to answer any questions you have about the sources you provide. Feel free to ask away!",
      date: formatMessageDateNow(),
      sender: "bot",
    },
  ]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleOnSendMessage = async () => {
    if (userMessage.length > 0) {
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: Math.random().toString(),
            content: userMessage,
            date: formatMessageDateNow(),
            sender: "user",
          },
        ];
      });
      setUserMessage("");

      setMessages((prev) => {
        return [
          ...prev,
          {
            id: "loader-div",
            content: '<div class="loader"></div>',
            date: formatMessageDateNow(),
            sender: "bot",
          },
        ];
      });

      const response = await fetch("http://127.0.0.1:5000/api/v1/chat", {
        method: "POST",
        body: JSON.stringify({
          message: userMessage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setMessages((prev) => {
        return [
          ...prev.filter((message) => message.id !== "loader-div"),
          {
            id: Math.random().toString(),
            content: data.message,
            date: formatMessageDateNow(),
            sender: "bot",
          },
        ];
      });
    }
  };

  return (
    <div className="chat-area flex-1 flex flex-col max-w-2xl mx-auto mt-10 max-h-[400px]">
      <h2 className="text-xl border-b-2 border-gray-200">
        Chatting with <b>Embedchain Bot</b>
      </h2>
      <div className="flex-1 overflow-y-scroll min-h-[450px] pt-4 bg-zinc-100">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            date={message.date}
            sender={message.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Ask me any question! For example: When did Elon became CEO of Tesla?"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOnSendMessage();
            }
          }}
        />
        <Button type="submit" onClick={handleOnSendMessage}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
