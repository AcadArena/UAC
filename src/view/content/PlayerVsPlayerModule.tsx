import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../config/types/types";
import frame from "../../assets/imgs/pvp-stats-frame.png";
import { stat } from "fs";
import { Spring, Transition } from "react-spring/renderprops";
import { TransitionGroup } from "react-transition-group";
import { Stats } from "node:fs";

const mcs = makeStyles({
  playerModule: {
    display: "flex",
    flexDirection: "column",
    // height: 545,
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
      // height: "100%",
      width: 250,
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      transformOrigin: "center bottom",
    },
  },
  stats: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Anton",
    justifyContent: "center",
    paddingBottom: 104,
    textTransform: "uppercase",
    "& .stat": {
      color: "#fff",
      margin: "9px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .value": {
        color: "#ffd200",
        fontFamily: "industry",
        fontWeight: "bold",
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
        fontFamily: "industry",
        fontWeight: "bold",
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

  const getSettings = (player: "player1" | "player2", beforeValue: boolean) => {
    const settings =
      player === "player1"
        ? stat_player_vs?.player1_settings
        : player === "player2"
        ? stat_player_vs?.player2_settings
        : undefined;

    if (settings) {
      return ` translateX(${
        (settings.x ?? 0) +
        (beforeValue ? (player === "player1" ? -10 : 10) : 0)
      }px) scale(${1 + (settings.scale ?? 0) * 0.01}) scaleX(${
        1 * (settings.flip_x ? -1 : 1)
      })`;
    } else {
      return `translateX(${
        0 + (beforeValue ? (player === "player1" ? -10 : 10) : 0)
      }px)`;
    }
  };
  return (
    <div className={c.playerModule + " " + className} {...props}>
      <div className="head">PLAYER MATCHUP</div>
      <div className={c.content}>
        <Spring
          from={{ opacity: 0, transform: `${getSettings("player1", true)}` }}
          to={{ opacity: 1, transform: `${getSettings("player1", false)}` }}
          delay={800}
        >
          {(props) => (
            <div
              className="player"
              style={{
                backgroundImage: `url(${stat_player_vs?.player1.photo_main})`,
                ...props,
              }}
            ></div>
          )}
        </Spring>

        <div className={c.stats}>
          <Transition
            items={
              stat_player_vs?.stat_names?.filter((sn) =>
                Boolean(
                  stat_player_vs.player1.stats.find((s) => s.stat_name === sn)
                    ?.isOn &&
                    stat_player_vs.player2.stats.find((s) => s.stat_name === sn)
                      ?.isOn
                )
              ) ?? []
            }
            keys={(s: string) => s}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            trail={100}
          >
            {(sn) => (props) => (
              <div className="stat" style={props}>
                <div
                  className="value left"
                  style={{
                    color:
                      parseInt(
                        stat_player_vs?.player1.stats.find(
                          (s) => s.stat_name === sn
                        )?.stat_value ?? 0 + ""
                      ) >
                      parseInt(
                        stat_player_vs?.player2.stats.find(
                          (s) => s.stat_name === sn
                        )?.stat_value ?? 0 + ""
                      )
                        ? "#ffd200"
                        : "#fff",
                  }}
                >
                  {
                    stat_player_vs?.player1.stats.find(
                      (s) => s.stat_name === sn
                    )?.stat_value
                  }
                </div>
                <div className="name">{sn}</div>
                <div
                  className="value right"
                  style={{
                    color:
                      parseInt(
                        stat_player_vs?.player1.stats.find(
                          (s) => s.stat_name === sn
                        )?.stat_value ?? 0 + ""
                      ) <
                      parseInt(
                        stat_player_vs?.player2.stats.find(
                          (s) => s.stat_name === sn
                        )?.stat_value ?? 0 + ""
                      )
                        ? "#ffd200"
                        : "#fff",
                  }}
                >
                  {
                    stat_player_vs?.player2.stats.find(
                      (s) => s.stat_name === sn
                    )?.stat_value
                  }
                </div>
              </div>
            )}
          </Transition>

          {/* {stat_player_vs?.stat_names
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
            ))} */}
        </div>
        <Spring
          from={{ opacity: 0, transform: `${getSettings("player2", true)}` }}
          to={{
            opacity: 1,
            transform: `${getSettings("player2", false)}`,
          }}
          delay={800}
        >
          {(props) => (
            <div
              className="player"
              style={{
                backgroundImage: `url(${stat_player_vs?.player2.photo_main})`,
                ...props,
              }}
            ></div>
          )}
        </Spring>
      </div>

      <div className={c.lowerThirds}>
        <Spring
          from={{ opacity: 0, transform: "translateY(10px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          delay={300}
        >
          {(props) => (
            <div className="team" style={props}>
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
          )}
        </Spring>

        <Spring
          from={{ opacity: 0, transform: "translateY(10px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          delay={300}
        >
          {(props) => (
            <div className="team right" style={props}>
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
          )}
        </Spring>
      </div>
    </div>
  );
};

export default PlayerVsPlayerModule;
