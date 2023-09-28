import Image from "next/image";
import React from "react";

type MessageProps = {
  content: string;
  date: string;
  sender: "bot" | "user";
};

const Message = ({ sender = "bot", content, date }: MessageProps) => {
  return (
    <div className={`message mb-4 flex ${sender === "user" && "text-right"}`}>
      {sender === "bot" && (
        <div className="flex-2">
          <div className="w-12 h-12 relative">
            <Image
              className="w-12 h-12 rounded-full mx-auto"
              src="https://photos.wellfound.com/startups/i/9710172-74139dbc1fb6938ae41a1c738bd79b23-medium_jpg.jpg?buster=1692319792"
              alt="chat-user"
              width={30}
              height={30}
            />
            <span className="absolute w-4 h-4 bg-green-500 rounded-full right-0 bottom-0 border-2 border-white"></span>
          </div>
        </div>
      )}
      <div className="flex-1 px-2">
        <div
          className={`inline-block ${
            sender === "bot" ? "bg-gray-300" : "bg-blue-600"
          } rounded-xl p-2 px-6 ${
            sender === "bot" ? "text-gray-800" : "text-white"
          }`}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">{date}</small>
        </div>
      </div>
    </div>
  );
};

export default Message;
