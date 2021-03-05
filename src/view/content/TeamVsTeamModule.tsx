import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../config/types/types";
// @ts-ignore
import { Textfit } from "react-textfit";

const mcs = makeStyles({
  playerModule: {
    display: "flex",
    flexDirection: "column",
    height: 545,
    overflow: "hidden",

    "& .head": {
      color: "#ffd200",
      fontFamily: "Anton",
      textAlign: "center",
      fontSize: 85,
      lineHeight: 1,
      padding: "18px 0px 5px",
      borderBottom: "5px solid #ffd200",
    },
  },
  content: {
    display: "flex",
    flex: 1,
    padding: "20px 36px",
    alignItems: "center",
  },
  stats: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Anton",
    textTransform: "uppercase",
    "& .stat": {
      color: "#fff",
      margin: "13px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .value": {
        color: "#ffd200",
        fontFamily: "Anton",
        flex: 1,
        fontSize: 24,
        width: 125,
      },

      "& .left": { textAlign: "right" },
      "& .right": { textAlign: "left" },

      "& .name": {
        letterSpacing: 1,
        width: 150,
        margin: "0px 20px",
        textAlign: "center",
        fontSize: 18,
        // transform: "skew(-5deg)",
      },
    },
  },
  team: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    lineHeight: 1,

    "& .logo": {
      height: 150,
      width: 150,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .org": {
      color: "#ffd200",
      fontFamily: "Druk Wide Bold",
      textTransform: "uppercase",
      marginTop: 15,
      fontSize: 20,
      width: 270,
      textAlign: "center",
    },
    "& .school": {
      color: "#fff",
      fontFamily: "Anton",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginTop: 5,
    },
  },
});

const TeamVsTeamModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = mcs();
  const { stat_team_vs } = useSelector((state: ReduxState) => state.live);
  return (
    <div className={c.playerModule + " " + className} {...props}>
      <div className="head">TEAM STATS</div>
      <div className={c.content}>
        <div className={c.team}>
          <div
            className="logo"
            style={{ backgroundImage: `url(${stat_team_vs?.team1.logo})` }}
          ></div>
          <Textfit mode="single" max={20}>
            <div className="org">{stat_team_vs?.team1.org_name}</div>
          </Textfit>
          <div className="school">{stat_team_vs?.team1.university_name}</div>
        </div>
        <div className={c.stats}>
          {stat_team_vs?.stat_names
            .filter((sn) =>
              Boolean(
                stat_team_vs.team1.stats.find((s) => s.stat_name === sn)
                  ?.isOn &&
                  stat_team_vs.team2.stats.find((s) => s.stat_name === sn)?.isOn
              )
            )
            .map((sn) => (
              <div className="stat">
                <div
                  className="value left"
                  style={{
                    color:
                      (stat_team_vs.team1.stats.find((s) => s.stat_name === sn)
                        ?.stat_value ?? 0) >
                      (stat_team_vs.team2.stats.find((s) => s.stat_name === sn)
                        ?.stat_value ?? 0)
                        ? "#ffd200"
                        : "#fff",
                  }}
                >
                  {
                    stat_team_vs.team1.stats.find((s) => s.stat_name === sn)
                      ?.stat_value
                  }
                </div>
                <div className="name">{sn}</div>
                <div
                  className="value right"
                  style={{
                    color:
                      (stat_team_vs.team1.stats.find((s) => s.stat_name === sn)
                        ?.stat_value ?? 0) <
                      (stat_team_vs.team2.stats.find((s) => s.stat_name === sn)
                        ?.stat_value ?? 0)
                        ? "#ffd200"
                        : "#fff",
                  }}
                >
                  {
                    stat_team_vs.team2.stats.find((s) => s.stat_name === sn)
                      ?.stat_value
                  }
                </div>
              </div>
            ))}
        </div>
        <div className={c.team}>
          <div
            className="logo"
            style={{ backgroundImage: `url(${stat_team_vs?.team2.logo})` }}
          ></div>
          <Textfit mode="single" max={20}>
            <div className="org">{stat_team_vs?.team2.org_name}</div>
          </Textfit>
          <div className="school">{stat_team_vs?.team2.university_name}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamVsTeamModule;
