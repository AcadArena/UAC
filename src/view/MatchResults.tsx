import { makeStyles } from "@material-ui/core";
import { LineWeight } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import bg from "../assets/imgs/results.png";
import useTournament from "../comps/hooks/useTournament";
import { Live, ReduxState } from "../config/types/types";

const mcs = makeStyles((theme) => ({
  page: {
    height: 1080,
    width: 1920,
    backgroundSize: "100% 100%",
    backgroundImage: `url(${bg})`,
    position: "relative",

    "& .left": {
      left: 5,
      "& .name": {
        textAlign: "left",
        paddingLeft: 10,
      },
      "& .score": {
        marginLeft: 5,
      },
    },
    "& .right": {
      right: 5,
      flexDirection: "row-reverse",
      "& .name": {
        textAlign: "right",
        paddingRight: 10,
      },
      "& .score": {
        marginRight: 5,
      },
    },

    "& .team": {
      display: "flex",
      alignItems: "center",
      height: 75,
      width: 430,
      position: "absolute",
      top: 16,

      "& .logo": {
        height: 75,
        width: 105,
        backgroundSize: "auto 80%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },

      "& .name": {
        color: "#fff",
        fontFamily: "Anton",
        textTransform: "uppercase",
        fontSize: 34,
        letterSpacing: 1,
        lineHeight: 1,
        flex: 1,
      },

      "& .score": {
        width: 75,
        color: "#fff",
        fontFamily: "Anton",
        textTransform: "uppercase",
        fontSize: 40,
        textAlign: "center",
      },
    },
  },
}));

const MatchResults = () => {
  const classes = mcs();

  const { match } = useSelector<ReduxState, Live>((state) => state.live);
  const { team, getTeamMatchResult } = useTournament();

  return (
    <div className={classes.page}>
      <div className="team left">
        <div
          className="logo"
          style={{ backgroundImage: `url(${team(match?.player1_id)?.logo})` }}
        ></div>
        <div className="name">{team(match?.player1_id)?.org_name}</div>
        <div className="score">
          {getTeamMatchResult(match, match?.player1_id).wins}
        </div>
      </div>
      <div className="team right">
        <div
          className="logo"
          style={{ backgroundImage: `url(${team(match?.player2_id)?.logo})` }}
        ></div>
        <div className="name">{team(match?.player2_id)?.org_name}</div>
        <div className="score">
          {getTeamMatchResult(match, match?.player2_id).wins}
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
