import React, { useEffect } from "react";
import { GET_MESSAGES } from "../Graphql/Queries";
import { useLazyQuery } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../Context/message";
import Chat from "./chat";

export default function Messages() {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();
  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

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

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a friend</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <Chat key={message.uuid} message={message} />
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are connected! send your first message!</p>;
  }

  return (
    <div className="messages">
      <div className="chat-dir">{selectedChatMarkup}
      </div>
    </div>
  );
}
