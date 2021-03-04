import React from "react";
import { useSelector } from "react-redux";
import { useTimer } from "react-timer-hook";
import { ReduxState } from "../../config/types/types";
import { wsContext } from "../../config/WebsocketProvider";

const Timer: React.FC<{ expiryTimestamp: number }> = ({
  expiryTimestamp,
  ...props
}) => {
  const { countdown_minutes = 0 } = useSelector(
    (state: ReduxState) => state.live
  );
  const ws = React.useContext(wsContext);
  const [state, setState] = React.useState<boolean>(true);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setState(false),
  });

  React.useEffect(() => {
    restart(countdown_minutes);
  }, [countdown_minutes]);

  ws.socket.on("time_command", (command: string) => {
    switch (command) {
      // case "start":
      //   return start();
      case "pause":
        setState(true);
        return pause();
      case "resume":
        setState(true);
        return resume();
      case "restart":
        setState(true);
        return restart(countdown_minutes);
    }
  });

  const live = useSelector((state: ReduxState) => state.live);

  return (
    <div {...props}>
      {state ? (
        <>
          {Boolean(hours) && (hours < 10 ? "0" + hours : hours) + ":"}
          {minutes < 10 && "0"}
          {minutes}:{seconds < 10 && "0"}
          {seconds}
        </>
      ) : (
        "SOON"
      )}
    </div>
  );
};

export default Timer;
