import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { setLiveSettings } from "./redux/Actions";
import io from "socket.io-client";
import { store } from "..";

export interface WebsocketProps {
  socket?: any;
  setLiveSettings: (settings: any) => void;
  updateSocketUsername: (username: string) => void;
}

export const wsContext = createContext<WebsocketProps>({
  setLiveSettings: () => {},
  updateSocketUsername: () => {},
});
let host: string = "";
const hostCloud: string = "https://rot-websocket-server.herokuapp.com/";
const hostLocal: string = "localhost:3200";

if (window.location.hostname === "localhost") {
  host = hostLocal;
} else {
  host = hostCloud;
}
let socket = io.connect(`${host}`);
socket.emit("join_room", { room: "uac", username: "brodcast module" });
socket.on("set_live_settings", (settings: any) =>
  store.dispatch(setLiveSettings(settings))
);

const WebsocketProvider: React.FC = ({ children }) => {
  let ws: WebsocketProps = {
    setLiveSettings: () => {},
    updateSocketUsername: () => {},
  };
  const dispatch = useDispatch();

  // prettier-ignore
  ws = {
    socket,
    setLiveSettings: (settings:any) => socket.emit("set_live_settings", settings),
    updateSocketUsername: (username) => socket.emit('update_user', {room: 'nco', username})
  }
  return <wsContext.Provider value={ws}>{children}</wsContext.Provider>;
};

export default WebsocketProvider;
