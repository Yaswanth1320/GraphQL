import React, { useEffect, useState } from "react";
import { GET_MESSAGES, SEND_MESSAGE } from "../Graphql/Queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../Context/message";
import Chat from "./chat";

export default function Messages() {
  const [content, setContent] = useState("");
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();
  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: data => dispatch({type:'ADD_MESSAGE', payload:{
        email: selectedUser.email,
        message: data.sendMessage
    }}),
    onError: err => console.log(err),
  });

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.email } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          email: selectedUser.email,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (content.trim() === "" || !selectedUser) return;

    console.log("sumitted")
    setContent('')

    sendMessage({variables:{to: selectedUser?.email, content}})
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p className="start">Select a friend</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p className="start">Loading...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <Chat key={message.uuid} message={message} />
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p className="start">You are connected! send your first message!</p>;
  }

  let chatuser = "user";
  let chating = 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';

  users?.map((user) => {
    if (user.email === selectedUser?.email) {
      chatuser = user.username;
      chating = user.imageUrl;
    }
  });


  return (
    <div className="msg-container">
      <div className="heading">
        <div className="logo">
          <img src={chating ? chating: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'} alt="profile" width="50px" height="50px" />
          <div className="info">
            <p className="name">{chatuser}</p>
            <p className="status">
              <i className="fa-solid fa-circle fa-beat"></i> online
            </p>
          </div>
        </div>
        <p className="call">
          <i className="fa-solid fa-phone-volume"></i> Call
        </p>
      </div>
      <div className="messages">
        <div className="chat-dir">{selectedChatMarkup}</div>
      </div>
      <form onSubmit={submitMessage}>
        <input
          type="text"
          name="search"
          className="search"
          value={content}
          placeholder="Text message"
          onChange={e => setContent(e.target.value)}
        />
        <button className="submit" onClick={submitMessage}><i className="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>
  );
}
