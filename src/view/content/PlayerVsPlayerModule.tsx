import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../config/types/types";
import frame from "../../assets/imgs/pvp-stats-frame.png";
import { stat } from "fs";

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

    "& .player": {
      height: "80%",
      width: 250,
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
  },
  stats: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Anton",
    textTransform: "uppercase",
    "& .stat": {
      color: "#fff",
      margin: "9px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .value": {
        color: "#ffd200",
        fontFamily: "Anton",
        flex: 1,
        fontSize: 22,
      },

      "& .left": { textAlign: "right" },
      "& .right": { textAlign: "left" },

      "& .name": {
        letterSpacing: 1,
        width: 100,
        margin: "0px 20px",
        textAlign: "center",
        fontSize: 14,
        // transform: "skew(-5deg)",
      },
    },
  },
  lowerThirds: {
    alignSelf: "center",
    position: "absolute",
    bottom: 12,
    width: 1171,
    height: 92,
    display: "flex",
    justifyContent: "space-between",
    backgroundImage: `url(${frame})`,
    backgroundSize: "100% 100%",
    "& .right": {
      flexDirection: "row-reverse",
      "& .logo": {
        marginRight: 0,
        marginLeft: 10,
      },
      "& .details": {
        textAlign: "right",
      },
    },
    "& .team": {
      width: 549,
      display: "flex",
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: "center",
      "& .logo": {
        height: "70%",
        width: 85,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginRight: 10,
      },
      "& .details": {
        color: "#fff",

        "& .school": {
          fontFamily: "Anton",
          textTransform: "uppercase",
          letterSpacing: 1,
          lineHeight: 1,
        },
        "& .name": {
          fontFamily: "Druk Wide Bold",
          color: "#ffd200",
          textTransform: "uppercase",
          fontSize: 30,
          lineHeight: 1,
        },
      },
    },
  },
});

const PlayerVsPlayerModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = mcs();
  const { stat_player_vs } = useSelector((state: ReduxState) => state.live);
  return (
    <div className={c.playerModule + " " + className} {...props}>
      <div className="head">PLAYER MATCHUP</div>
      <div className={c.content}>
        <div
          className="player"
          style={{
            backgroundImage: `url(${stat_player_vs?.player1.photo_main})`,
          }}
        ></div>
        <div className={c.stats}>
          {stat_player_vs?.stat_names
            .filter((sn) =>
              Boolean(
                stat_player_vs.player1.stats.find((s) => s.stat_name === sn)
                  ?.isOn &&
                  stat_player_vs.player2.stats.find((s) => s.stat_name === sn)
                    ?.isOn
              )
            )
            .map((sn) => (
              <div className="stat">
                <div
                  className="value left"
                  style={{
                    color:
                      (stat_player_vs.player1.stats.find(
                        (s) => s.stat_name === sn
                      )?.stat_value ?? 0) >
                      (stat_player_vs.player2.stats.find(
                        (s) => s.stat_name === sn
                      )?.stat_value ?? 0)
                        ? "#ffd200"
                        : "#fff",
                  }}
                >
                  {
                    stat_player_vs.player1.stats.find((s) => s.stat_name === sn)
                      ?.stat_value
                  }
                </div>
                <div className="name">{sn}</div>
                <div
                  className="value right"
                  style={{
                    color:
                      (stat_player_vs.player1.stats.find(
                        (s) => s.stat_name === sn
                      )?.stat_value ?? 0) <
                      (stat_player_vs.player2.stats.find(
                        (s) => s.stat_name === sn
                      )?.stat_value ?? 0)
                        ? "#ffd200"
                        : "#fff",
                  }}
                >
                  {
                    stat_player_vs.player2.stats.find((s) => s.stat_name === sn)
                      ?.stat_value
                  }
                </div>
              </div>
            ))}
        </div>
        <div
          className="player"
          style={{
            backgroundImage: `url(${stat_player_vs?.player2.photo_main})`,
          }}
        ></div>
      </div>

      <div className={c.lowerThirds}>
        <div className="team">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${stat_player_vs?.player1.team?.logo})`,
            }}
          ></div>
          <div className="details">
            <div className="school">
              {stat_player_vs?.player1.team?.university_name}
            </div>
            <div className="name">{stat_player_vs?.player1.ign}</div>
          </div>
        </div>
        <div className="team right">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${stat_player_vs?.player2.team?.logo})`,
            }}
          ></div>
          <div className="details">
            <div className="school">
              {stat_player_vs?.player2.team?.university_name}
            </div>
            <div className="name">{stat_player_vs?.player2.ign}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerVsPlayerModule;
