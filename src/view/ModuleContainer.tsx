import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Frame from "../comps/containers/Frame";
import { ReduxState } from "../config/types/types";
import PlayerModule from "./content/PlayerModule";
import PlayerVsPlayerModule from "./content/PlayerVsPlayerModule";
import ScheduleModule from "./content/ScheduleModule";
import ScheduleOnlyModule from "./content/ScheduleOnlyModule";
import StandingsModule from "./content/StandingsModule";
import TeamVsTeamModule from "./content/TeamVsTeamModule";

const mcs = makeStyles({
  banner: {
    margin: "0px 150px",
    position: "relative",
    // paddingBottom: 10,
    "& .fade-enter": {
      opacity: 0,
      transform: "translateX(-15px)",
    },
    "& .fade-enter-active": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit-active": {
      transform: "translateX(-15px)",
      opacity: 0,
    },

    "& .fade-enter-active, .fade-exit-active": {
      transition: "0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    },
  },
  wrapper: {
    height: "100%",
    width: "100%",
  },
});

const ModuleContainer = () => {
  const c = mcs();
  const { container_mode = "schedule" } = useSelector(
    (state: ReduxState) => state.live
  );

  return (
    <Frame className={c.banner}>
      <SwitchTransition>
        <CSSTransition
          key={container_mode}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
        >
          <div className={c.wrapper}>
            {container_mode === "schedule" && <ScheduleModule />}
            {container_mode === "standings_group_a" && (
              <StandingsModule
                group={["ADMU", "DLSU", "MU", "USC", "USA", "TFX"]}
              />
            )}
            {container_mode === "standings_group_b" && (
              <StandingsModule
                group={["MCL", "HAU", "FIT", "UPD", "TUP-M", "UST"]}
              />
            )}

            {container_mode === "stats_player" && <PlayerModule />}
            {container_mode === "stats_player_vs" && <PlayerVsPlayerModule />}
            {container_mode === "stats_team_vs" && <TeamVsTeamModule />}
            {container_mode === "ending" && <ScheduleOnlyModule />}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Frame>
  );
};

export default ModuleContainer;
