import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Spring, Transition } from "react-spring/renderprops";
import { ReduxState, Stat } from "../../config/types/types";

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
    "& .info": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "28px 33px",

      "& .team": {
        display: "flex",
        alignItems: "flex-end",
        "& .logo": {
          height: 105,
          width: 105,
          marginRight: 20,
          backgroundSize: "contain",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
        },
        "& .details": {
          display: "flex",
          flexDirection: "column",
          paddingBottom: 5,

          "& .ign": {
            color: "#ffd200",
            fontFamily: "Druk Wide Bold",
            textTransform: "uppercase",
            fontSize: 34,
            lineHeight: 1,
            letterSpacing: 2,
          },
          "& .name": {
            color: "#ffffff",
            fontFamily: "Anton",
            textTransform: "uppercase",
            fontSize: 26,
            letterSpacing: 2,
            paddingTop: 5,
            lineHeight: 1,
          },
        },
      },
      "& .stats": {
        flex: 1,
        // marginBottom: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        flexWrap: "wrap",
        padding: "0px 20px",
      },
    },
    "& .avatar": {
      width: 363,
      height: "100%",
      backgroundSize: "contain",
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
    },
  },

  stat: {
    display: "flex",
    minHeight: "30%",
    alignItems: "center",
    width: "50%",

    "& .name": {
      color: "#fff",
      fontFamily: "industry",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      width: 75,
      marginRight: 20,
      fontSize: 18,
      transform: "skew(-5deg)",
    },
    "& .value": {
      color: "#ffd200",
      fontFamily: "industry",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: 30,
      letterSpacing: 1,
      marginRight: 30,
      width: 100,
    },
  },
});

const PlayerModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = mcs();
  const { stat_player } = useSelector((state: ReduxState) => state.live);
  return (
    <div className={c.playerModule + " " + className} {...props}>
      <div className="head">PLAYER STATS</div>
      <div className={c.content}>
        <div className="info">
          <div className="stats">
            <Transition
              items={stat_player?.stats.filter((s) => s.isOn) ?? []}
              keys={(s) => s?.stat_name}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              trail={150}
            >
              {(stat) => (props) => (
                <div className={c.stat} style={props}>
                  <div className="name">{stat.stat_name}</div>
                  <div className="value">{stat.stat_value}</div>
                </div>
              )}
            </Transition>
            {/* {stat_player?.stats
              .filter((s) => s.isOn)
              .map((stat) => (
                <div className={c.stat}>
                  <div className="name">{stat.stat_name}</div>
                  <div className="value">{stat.stat_value}</div>
                </div>
              ))} */}
          </div>

          <Spring
            from={{ opacity: 0, transform: "translateX(-10px)" }}
            to={{ opacity: 1, transform: "translateX(0px)" }}
            delay={900}
          >
            {(props) => (
              <div className="team" style={props}>
                <div
                  className="logo"
                  style={{ backgroundImage: `url(${stat_player?.team?.logo})` }}
                ></div>
                <div className="details">
                  <div className="ign">{stat_player?.ign}</div>
                  <div className="name">{stat_player?.name}</div>
                </div>
              </div>
            )}
          </Spring>
        </div>

        <Spring
          from={{ opacity: 0, transform: "translateX(10px)" }}
          to={{ opacity: 1, transform: "translateX(0px)" }}
          delay={1050}
        >
          {(props) => (
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${stat_player?.photo_main})`,
                ...props,
              }}
            ></div>
          )}
        </Spring>
      </div>
    </div>
  );
};

export default PlayerModule;
