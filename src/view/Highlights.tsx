import { makeStyles } from "@material-ui/core";
import React from "react";

import frame from "../assets/imgs/hightlights-frame.png";
import useTournament from "../comps/hooks/useTournament";

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
    top: 360,
    left: 3,
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
}));

const Highlights = () => {
  const classes = mcs();
  const { match, team } = useTournament();
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
    </div>
  );
};

export default Highlights;
