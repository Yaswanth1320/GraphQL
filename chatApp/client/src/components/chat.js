import React, { useState } from "react";
import { useAuthState } from "../Context/auth";
import classNames from "classnames";
import { useMutation } from '@apollo/client'
import { REACT_TO_MESSAGE } from "../Graphql/Queries";
import { OverlayTrigger,Popover } from 'react-bootstrap'

const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

export default function Chat({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.data.email;
  const reciever = !sent;
  const [showPopOver,setShowPopOver] = useState(false)
  const emojis = [...new Set(message.reactions.map(r => r.content))]

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE,{
    onError: err => console.log(err),
    onCompleted: (data) =>{
      setShowPopOver(false)
    }
  })

  const react = (reaction) =>{
    console.log(`Reacting ${reaction} to the meassage: ${message.uuid}`);
    reactToMessage({variables:{ uuid: message.uuid, content: reaction}})
  }

  const reactButton = (
    <OverlayTrigger
    trigger='click'
    placement="top"
    show= {showPopOver}
    onToggle={setShowPopOver}
    transition={false}
    rootClose
    overlay={
      <Popover className="rounded-pill pop">
            {
              reactions.map(reaction =>(
                <button onClick={()=> react(reaction)} key={reaction}>{reaction}</button>
              ))
            }
      </Popover>
    }
  >
    <button className="reaction"><i className="fa-regular fa-face-smile"></i></button>
    </OverlayTrigger>
  )

  return (
      <div
        className={classNames("chat-style", {
          sender: sent,
          reciever: reciever,
        })}
      >
        {message.reactions.length > 0 && (
          <div className="emoji">
            {emojis} {message.reactions.length}
          </div>
        )}
        <p key={message.uuid}>{message.content}</p>
        {reactButton}
      </div>
  );
}
