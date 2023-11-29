import React from "react";
import { useAuthState } from "../Context/auth";
import classNames from "classnames";

export default function Chat({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.data.email;
  const reciever = !sent;

  return (
      <div
        className={classNames("chat-style", {
          sender: sent,
          reciever: reciever,
        })}
      >
        <p key={message.uuid}>{message.content}</p>
      </div>
  );
}
