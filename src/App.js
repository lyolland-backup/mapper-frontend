import React, { Component, Fragment } from "react";
import "./App.css";
import FormContainer from "./components/FormContainer";

import L from "leaflet";
import Joi from "joi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, Spinner, Alert } from "reactstrap";
import WorldMap from "./components/WorldMap";
import MessageConfirmation from "./components/MessageConfirmation";

const currentLocation = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
  popupAnchor: [0, -41]
});

const otherUserLocations = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
  popupAnchor: [0, -41]
});

const schema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .max(500)
    .required(),
  message: Joi.string()
    .min(1)
    .max(500)
    .required()
});

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/messages"
    : "https://lit-earth-16997.herokuapp.com/api/v1/messages";

class App extends Component {
  state = {
    location: {
      lat: "",
      lng: ""
    },
    zoom: 2,
    haveUsersLocation: false,
    userMessage: {
      name: "",
      message: ""
    },
    sendingMessage: false,
    sentMessage: false,
    messages: []
  };

  componentDidMount() {
    fetch(API_URL)
      .then(resp => resp.json())
      .then(messages => {
        this.setState({
          messages
        });
      });

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 13
        });
      },
      () => {
        fetch("https://ipapi.co/json")
          .then(resp => resp.json())
          .then(location =>
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 13
            })
          );
      }
    );
  }

  validateFormInput = () => {
    const userMessage = {
      name: this.state.userMessage.name,
      message: this.state.userMessage.message
    };
    const result = Joi.validate(userMessage, schema);
    return !result.error && this.state.haveUsersLocation ? true : false;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validateFormInput()) {
      this.setState({
        sendingMessage: true
      });
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.userMessage.name,
          message: this.state.userMessage.message,
          latitude: this.state.location.lat,
          longitude: this.state.location.lng
        })
      })
        .then(resp => resp.json())
        .then(message => {
          setTimeout(() => {
            this.setState({
              sendingMessage: false,
              sentMessage: true,
              messages: [...this.state.messages, message]
            });
          }, 1000);
        });
    }
  };

  handleInputChange = e => {
    this.setState({
      userMessage: {
        ...this.state.userMessage,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.haveUsersLocation ? (
            <Marker position={position} icon={currentLocation}>
              <Popup>
                You are here <span>😀</span>
              </Popup>
            </Marker>
          ) : null}
          {this.state.messages.map(message => (
            <Marker
              position={[message.latitude, message.longitude]}
              icon={otherUserLocations}
            >
              <Popup>
                <strong>{message.name}</strong>
                <br />
                {message.message}
              </Popup>
            </Marker>
          ))}
        </Map>
        <Card body className="message-form">
          {!this.state.sendingMessage &&
          !this.state.sentMessage &&
          this.state.haveUsersLocation ? (
            <FormContainer
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              validateFormInput={this.validateFormInput}
            />
          ) : this.state.sendingMessage || !this.state.haveUsersLocation ? (
            <Spinner color="primary" />
          ) : (
            <MessageConfirmation />
          )}
        </Card>
      </div>
    );
  }
}

export default App;
