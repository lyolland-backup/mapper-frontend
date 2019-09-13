import React from "react";
import { Popup } from "react-leaflet";

const MessagePopup = ({ message }) => {
  return (
    <Popup>
      <strong>{message.name}</strong>
      <br />
      {message.message}
    </Popup>
  );
};

export default MessagePopup;
