import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./assets/fonts/industry-fonts.css";
import LowerThirds from "./comps/lowerthirds/LowerThirds";
import { makeStyles } from "@material-ui/core";
import LowerThirdTicker from "./comps/lowerthirds/LowerThirdTicker";
import { Route, Switch } from "react-router-dom";
import CasterCam from "./view/CasterCam";
import Schedule from "./view/Schedule";
import Standings from "./view/Standings";
import Drafting from "./view/Drafting";
import InGame from "./view/InGame";
import Timer from "./comps/timer/Timer";
import TimerOnly from "./view/TimerOnly";
import VsScreen from "./view/VsScreen";

const ms = makeStyles({
  app: {
    overflow: "hidden",
    width: 1920,
    height: 1080,
    backgroundColor: "transparent",
  },
});

function App() {
  const c = ms();
  return (
    <div className={c.app}>
      <Switch>
        <Route path="/castercam">
          <CasterCam />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="/standings">
          <Standings group={["ADMU", "DLSU", "MU", "USC", "USA", "FEU"]} />
        </Route>
        <Route path="/drafting">
          <Drafting />
        </Route>
        <Route path="/ingame">
          <InGame />
        </Route>
        <Route path="/vs">
          <VsScreen />
        </Route>
        <Route path="/timer">
          <TimerOnly />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
