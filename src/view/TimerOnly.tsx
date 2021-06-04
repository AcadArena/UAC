import { makeStyles } from "@material-ui/core";
import React from "react";

// @ts-ignore
import { Textfit } from "react-textfit";
import Timer from "../comps/timer/Timer";
import timerFrame from "../assets/imgs/startingsoon-container.png";
import { useSelector } from "react-redux";
import { ReduxState } from "../config/types/types";

const ms = makeStyles((theme) => ({
  timer: {
    position: "absolute",
    backgroundSize: "stretch",
    backgroundPosition: "center",
    backgroundImage: `url(${timerFrame})`,
    height: 133,
    width: 728,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 0",
    "& .starting": {
      color: "#fff",
      fontFamily: "Anton",
      lineHeight: 1,
      fontSize: 63,
      textAlign: "center",
      flex: 1,
      paddingRight: 20,
      textTransform: "uppercase",
    },

    "& .time": {
      paddingTop: 10,
      color: "#000",
      fontFamily: "Anton",
      fontSize: 80,
      textAlign: "center",
      lineHeight: 1,
      width: 241,
      height: 102,
      backgroundColor: "#edc401",
      padding: "10px 20px",
      marginLeft: 30,
    },
  },
}));

const TimerOnly: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = ms();
  const { countdown_minutes = 0 } = useSelector(
    (state: ReduxState) => state.live
  );

  return (
    <div className={c.timer + " " + className} {...props}>
      <div className="time">
        <Timer expiryTimestamp={countdown_minutes} />
      </div>
      <div className="starting">Starting Soon</div>
    </div>
  );
};

export default TimerOnly;
