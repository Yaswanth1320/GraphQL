import { useQuery } from "@apollo/client";
import { GET_USERS } from "../Graphql/Queries";
import React from "react";
import { useMessageDispatch,useMessageState } from "../Context/message";

export default function Users({setSelectedUser}) {
    const dispatch = useMessageDispatch();
    const {users} = useMessageState()
  const { loading } = useQuery(GET_USERS, {
    onCompleted: data => dispatch({type: 'SET_USERS',payload: data.getUsers}),
    onError: err => console.log(err)
  });

  let userlist;
  if (!users || loading) {
    userlist = <p>Loading..</p>;
} else if (users.length === 0) {
    userlist = <p>No user found</p>;
  } else if (users.length > 0) {
    userlist = users.map((user) => (
      <div
        key={user.username}
        className="user"
        onClick={() => dispatch({type:'SET_SELECTED_USER', payload:user.email})}
      >
        <img src={user.imageUrl} width="55px" height="55px" alt="user" />
        <div className="latest">
          <h4>{user.username}</h4>
          <p>
            {user.latestMessage
              ? user.latestMessage.content
              : "you are connected now"}
          </p>
        </div>
      </div>
    ));
  }
  return (
    <div className="user-list">
      <p>Online</p>
      {userlist}
    </div>
  );
}
