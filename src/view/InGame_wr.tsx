import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../config/types/types";
import InGameFrame from "../assets/imgs/ingameframe.png";
import useTournament from "../comps/hooks/useTournament";

const mcs = makeStyles({
  ingame: {
    width: 1920,
    height: 1080,
    position: "relative",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundImage: `url(${InGameFrame})`,
    display: "flex",
    justifyContent: "center",
  },
  team: {
    display: "flex",
    flexDirection: "column",

    "& .logo-wrap": {
      "& .left": { marginRight: 507, transform: "translateX(27px)" },
      "& .right": { marginLeft: 507 },
      "& .logo": {
        height: 69,
        width: 93,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 90%",
        marginTop: 4,
      },
    },

    "& .info-right": {
      "& .score": {
        marginRight: 10,
      },
    },

    "& .info-left": {
      justifyContent: "flex-end",
      "& .org": {
        color: "#fff",
      },
      "& .score": {
        marginLeft: 10,
      },
    },
    "& .info": {
      display: "flex",
      height: 56,
      transform: "translateY(-3px)",
      margin: "0px 76px",
      "& .org": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Anton",
        textTransform: "uppercase",
        fontSize: 26,
        textAlign: "center",
        width: 219,
        lineHeight: 1,
      },
      "& .score": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Anton",
        textTransform: "uppercase",
        fontSize: 34,
        lineHeight: 1,
        color: "#fff",
        width: 41,
      },
    },
  },

  ingameText: {
    position: "absolute",
    top: 185,
    right: 51,
    height: 50,
    width: 192,

    display: "flex",
    alignItems: "center",
    fontFamily: "Anton",
    textTransform: "uppercase",
    fontSize: 26,
    textAlign: "left",
    lineHeight: 1,
    color: "#fff",
  },
});

const InGameWr = () => {
  const c = mcs();
  const {
    match,
    swap_team_positions,
    tournament,
    // game_number = 1,
    live_data,
  } = useSelector((state: ReduxState) => state.live);

  const { getTeamMatchResult, team } = useTournament();

  return (
    <div className={c.ingame}>
      <div className={c.team}>
        <div className="logo-wrap">
          <div
            className="logo left"
            style={{
              backgroundImage: `url(${
                swap_team_positions
                  ? team(match?.player2_id)?.logo
                  : team(match?.player1_id)?.logo
              })`,
            }}
          ></div>
        </div>
        <div className="info info-left">
          <div className="org">
            {team(swap_team_positions ? match?.player2_id : match?.player1_id)
              ?.university_acronym +
              " " +
              team(swap_team_positions ? match?.player2_id : match?.player1_id)
                ?.org_name}
          </div>
          <div className="score">
            {
              getTeamMatchResult(
                match,
                swap_team_positions ? match?.player2_id : match?.player1_id
              ).wins
            }
          </div>
        </div>
      </div>
      <div className={c.team}>
        <div className="logo-wrap">
          <div
            className="logo right"
            style={{
              backgroundImage: `url(${
                team(
                  swap_team_positions ? match?.player1_id : match?.player2_id
                )?.logo
              })`,
            }}
          ></div>
        </div>
        <div className="info info-right">
          <div className="score">
            {
              getTeamMatchResult(
                match,
                swap_team_positions ? match?.player1_id : match?.player2_id
              ).wins
            }
          </div>
          <div className="org">
            {team(swap_team_positions ? match?.player1_id : match?.player2_id)
              ?.university_acronym +
              " " +
              team(swap_team_positions ? match?.player1_id : match?.player2_id)
                ?.org_name}
          </div>
        </div>
      </div>

      <div className={c.ingameText}>{live_data?.ingame || "Best of two"}</div>
    </div>
  );
};

export default InGameWr;
