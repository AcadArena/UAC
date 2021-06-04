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
import Winner from "./view/Winner";
import WinnerAlt from "./view/WinnerAlt";
import ModuleContainer from "./view/ModuleContainer";
import Replay from "./view/Replay";
import Veto from "./view/Veto";
import WinnerChampion from "./view/WinnerChampion";
import Bracket from "./view/Bracket";
import LogitechMVP from "./view/LogitechMVP";
import IngameLowerThirds from "./view/InGameLowerThirds";
import VsScreenPlayoffs from "./view/VsScreenPlayoffs";
import Pause from "./view/Pause";
import PointsSystemTest from "./view/PointsSystemTest";
import { Highlight } from "@material-ui/icons";
import Highlights from "./view/Highlights";
import InGameWr from "./view/InGame_wr";
import MatchResults from "./view/MatchResults";
import SchedWithAds from "./view/SchedWithAd";

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
          <Standings group={["ADMU", "DLSU", "MU", "USC", "USA", "FTX"]} />
        </Route>
        <Route path="/drafting">
          <Drafting />
        </Route>
        <Route path="/ingame/valorant">
          <InGame />
        </Route>
        <Route path="/vs">
          <VsScreenPlayoffs />
        </Route>
        <Route path="/timer">
          <TimerOnly />
        </Route>
        <Route path="/winner1">
          <Winner />
        </Route>
        <Route path="/winner2">
          <Winner alt />
        </Route>
        <Route path="/champion1">
          <WinnerChampion />
        </Route>
        <Route path="/champion2">
          <WinnerChampion alt />
        </Route>
        <Route path="/content">
          <ModuleContainer />
        </Route>
        <Route path="/replay">
          <Replay />
        </Route>
        <Route path="/veto">
          <Veto />
        </Route>
        <Route path="/bracket">
          <Bracket />
        </Route>
        <Route path="/mvp">
          <LogitechMVP />
        </Route>
        <Route path="/lowerThirds">
          <IngameLowerThirds />
        </Route>
        <Route path="/pause">
          <Pause />
        </Route>
        <Route path="/highlights">
          <Highlights />
        </Route>
        <Route path="/schedwithads">
          <SchedWithAds />
        </Route>
        <Route path="/ingame/wr">
          <InGameWr />
        </Route>
        <Route path="/results">
          <MatchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
