import { makeStyles } from "@material-ui/core";
import React from "react";

// @ts-ignore
import { Textfit } from "react-textfit";
import Timer from "../comps/timer/Timer";
import timerFrame from "../assets/imgs/frameTimer.png";
import { useSelector } from "react-redux";
import { ReduxState } from "../config/types/types";

const ms = makeStyles((theme) => ({
  timer: {
    position: "absolute",
    backgroundSize: "stretch",
    backgroundPosition: "center",
    backgroundImage: `url(${timerFrame})`,
    height: 168,
    width: 420,
    display: "flex",
    flexDirection: "column",

    padding: "10px 0",
    "& .starting": {
      color: "#004fff",
      fontFamily: "Druk Wide Bold",
      lineHeight: 1,
    },

    "& .time": {
      paddingTop: 10,
      color: "#fff",
      fontFamily: "Anton",
      fontSize: 90,
      textAlign: "center",
      lineHeight: 1,
      width: 420,
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
      <Textfit mode="single" max={42}>
        <div className="starting">Starting Soon</div>
        <div className="time">
          <Timer expiryTimestamp={countdown_minutes} />
        </div>
      </Textfit>
    </div>
  );
};

export default TimerOnly;
