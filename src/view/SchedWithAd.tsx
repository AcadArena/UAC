import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import frame from "../assets/imgs/sched.png";
import useTournament from "../comps/hooks/useTournament";
import { Live, ReduxState } from "../config/types/types";

const mcs = makeStyles((theme) => ({
  frame: {
    width: 1310,
    height: 565,
    backgroundSize: "100% 100%",
    backgroundImage: `url(${frame})`,
    position: "relative",
  },
  match: {
    display: "flex",
    position: "absolute",
    top: 101,
    left: -16,
    width: 420,
    justifyContent: "center",

    "& .vs": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 30,
      margin: "0px 20px",

      "& .text": {
        color: "#fff",
        fontFamily: "Anton",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 40,
        lineHeight: 1,
      },
      "& .bestof": {
        color: "#ffd200",
        fontFamily: "Druk Wide Bold",
      },
    },

    "& .team": {
      display: "flex",
      flexDirection: "column",
      width: 150,

      "& .logo": {
        height: 93,
        width: "100%",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        flexShrink: 0,
      },
      "& .org": {
        marginTop: 5,
        color: "#fff",
        fontFamily: "Anton",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 20,
        lineHeight: 1,
      },
    },
  },

  sched: {
    display: "flex",
    flexDirection: "column",
    width: 380,
    position: "absolute",
    top: 296,
    left: 4,
    paddingLeft: 45,
    alignItems: "center",

    "& .match": {
      display: "flex",
      alignItems: "center",
      marginBottom: 10,

      "& .badger": {
        color: "#111",
        fontFamily: "industry",
        fontWeight: "bold",
        backgroundColor: "#ffd200",
        padding: "1px 5px",
        transform: "skew(-10deg)",
        width: 83,
        display: "flex",
        justifyContent: "center",
        "& .text": {
          transform: "skew(10deg) translateY(-1px)",
          textAlign: "center",
          fontSize: 12,
        },
      },
      "& .vs": {
        color: "#fff",
        fontFamily: "Anton",
        margin: "0px 5px",
      },
      "& .team": {
        width: 110,
        display: "flex",
        alignItems: "center",

        "& .logo": {
          height: 30,
          width: 50,
          flexShrink: 0,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },

        "& .org": {
          fontFamily: "Druk Wide Bold",
          fontSize: 12,
          color: "#fff",
          flex: 1,
        },
      },
    },
  },
}));

const SchedWithAds = () => {
  const classes = mcs();
  const { match, team, badger } = useTournament();
  const { matches_today } = useSelector<ReduxState, Live>(
    (state) => state.live
  );
  return (
    <div className={classes.frame}>
      <div className={classes.match}>
        <div className="team">
          <div
            className="logo"
            style={{ backgroundImage: `url(${team(match?.player1_id)?.logo})` }}
          ></div>
          <div className="org">{team(match?.player1_id)?.org_name}</div>
        </div>
        <div className="vs">
          <div className="text">VS</div>
          <div className="bestof">BO{match?.bestOf ?? 1}</div>
        </div>
        <div className="team">
          <div
            className="logo"
            style={{ backgroundImage: `url(${team(match?.player2_id)?.logo})` }}
          ></div>
          <div className="org">{team(match?.player2_id)?.org_name}</div>
        </div>
      </div>

      <div className={classes.sched}>
        {matches_today?.map((m) => (
          <div className="match">
            <div className="badger">
              <div className="text">{badger(m)}</div>
            </div>
            <div className="team">
              <div
                className="logo"
                style={{ backgroundImage: `url(${team(m.player1_id)?.logo})` }}
              ></div>
              <div className="org">
                {team(m.player1_id)?.university_acronym}
              </div>
            </div>
            <div className="vs">VS</div>
            <div className="team">
              <div
                className="logo"
                style={{ backgroundImage: `url(${team(m.player2_id)?.logo})` }}
              ></div>
              <div className="org">
                {team(m.player2_id)?.university_acronym}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedWithAds;
