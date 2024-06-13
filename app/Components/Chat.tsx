import { useEffect, useRef, useState } from "react";
import Button from "../Shared/button";
import { uuid } from "uuidv4";
import { socket } from "../socket";
import { Player } from "../types";

interface Message {
  playerId: string;
  name: string;
  message: string;
}
type Props = {
  currentPlayer: Player | undefined;
};
const Chat = ({ currentPlayer }: Props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("updateMessagesList", (data) => {
      setMessages(data);
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      socket.off("updateMessagesList");
    };
  }, []);

  useEffect(() => {}, [currentPlayer]);

  const handleSendMessage = () => {
    socket.emit("newMessage", {
      playerId: socket.id,
      name: currentPlayer!.name,
      message,
    });
    setMessage("");
  };
  const submitDisabled = !currentPlayer || message.length < 1;
  return (
    <div className="bg-mid-dark rounded-lg overflow-hidden">
      <div className="h-32 p-3 overflow-y-auto">
        <ul className="list-none p-0 m-0 grid gap-y-2">
          {messages.map((message) => (
            <li className="flex gap-3 items-center" key={uuid()}>
              <span className="text-pink font-semibold text-sm">
                {message.name}:
              </span>
              <span className="px-2 py-1 bg-gray-700 text-slate-300 rounded-md text-xs ">
                {message.message}
              </span>
            </li>
          ))}
        </ul>
        <div className="py-2" />
        <div className="py-1" ref={messageRef} />
      </div>
      <div className="p-3 bg-low-dark flex items-center gap-3">
        <input
          type="text"
          className="p-2 bg-mid-dark rounded-lg grow outline-none"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyUp={(e) => {
            if (e.key === "Enter" && !submitDisabled) {
              handleSendMessage();
            }
          }}
        />
        <Button
          className="shrink w-fit w-28 py-2 mt-0"
          title="Send"
          onClick={handleSendMessage}
          disabled={submitDisabled}
        />
      </div>
    </div>
  );
};

export default Chat;
