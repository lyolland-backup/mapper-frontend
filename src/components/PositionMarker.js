import React from "react";
import { Marker, Popup } from "react-leaflet";

const PositionMarker = ({ position, currentLocation }) => {
  return (
    <Marker position={position} icon={currentLocation}>
      <Popup>
        You are here <span>😀</span>
      </Popup>
    </Marker>
  );
};

export default PositionMarker;
