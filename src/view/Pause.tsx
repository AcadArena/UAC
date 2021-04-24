import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LowerThirdsAlt from "../comps/lowerthirds/LowerThirdsAlt";
import { ReduxState } from "../config/types/types";
import pauseSvg from "../assets/imgs/tactical.svg";
import technicalPause from "../assets/imgs/technical.svg";
import { PauseType } from "../config/types/pause.interface";
import { Transition } from "react-spring/renderprops";

const makeComponentStyles = makeStyles({
  wrapper: {
    margin: 100,
  },
  content: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    "& .text": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      paddingLeft: "40px",
      zIndex: 99,

      "& .type": {
        color: "#ffd200",
        fontFamily: "'industry', sans-serif",
        fontSize: 45,
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 1,
        // marginBottom: 3,
        transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },

    "& .team": {
      height: "100%",
      width: 100,
      marginLeft: 20,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 99,
    },

    "& .clock": {
      backgroundImage: `url(${pauseSvg})`,
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: 126,
      width: 126,
      position: "absolute",
      bottom: 0,
      right: 0,
      transform: "translate(-30px, 23px) scale(0.4)",
    },
    "& .screw": {
      backgroundImage: `url(${technicalPause})`,
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: 126,
      width: 126,
      position: "absolute",
      bottom: 0,
      right: 0,
    },
  },
});

const Pause = () => {
  const classes = makeComponentStyles();
  const { pause } = useSelector((state: ReduxState) => state.live);
  return (
    <div className={classes.wrapper}>
      <Transition
        items={pause?.paused}
        from={{ opacity: 0, transform: "translateX(-20px)" }}
        enter={{ opacity: 1, transform: "translateX(0px)" }}
        leave={{ opacity: 0, transform: "translateX(-20px)" }}
      >
            {/* @ts-ignore */}
          {(item) => item && (props => (

      <LowerThirdsAlt disablelogo shadow size={400} style={props}>
        <div className={classes.content}>
          {pause?.type === PauseType.tactical && <div className="clock"></div>}
          {pause?.type === PauseType.technical && <div className="screw"></div>}
          {pause?.team && (
            <div
              className="team"
              style={{
                backgroundImage: `url(${pause?.team?.logo})`,
              }}
            ></div>
          )}
          <div
            className="text"
            style={{
              paddingLeft: pause?.type === PauseType.technical ? 40 : 20,
            }}
          >
            <div className="type">{pause?.type}</div>
            <div className="type" style={{ color: "#fff", marginTop: -5 }}>
              Pause
            </div>
          </div>
        </div>
      </LowerThirdsAlt>
      ))

      }</Transition>
    </div>
  );
};

export default Pause;
