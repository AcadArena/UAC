import React from "react";
import { Spring } from "react-spring/renderprops";
import LowerThirds from "../comps/lowerthirds/LowerThirds";
import replayBug from "../assets/imgs/replay.png";

const Replay = () => {
  return (
    <Spring
      from={{
        opacity: 0,
        transform: "translateX(-10px)",
      }}
      to={{ opacity: 1, transform: "translateX(0px)" }}
    >
      {(props) => (
        <div
          style={{
            height: 109,
            width: 639,
            backgroundImage: `url(${replayBug})`,
            backgroundSize: "100% 100%",
            ...props,
          }}
        ></div>
        // <LowerThirds size="small" shadow style={{ margin: 20, ...props }}>
        //   <div
        //     style={{
        //       height: "100%",
        //       fontFamily: "Anton",
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       fontSize: 60,
        //       color: "#ffd200",
        //       lineHeight: 1,
        //       width: "100%",
        //     }}
        //   >
        //     REPLAY
        //   </div>
        // </LowerThirds>
      )}
    </Spring>
  );
};

export default Replay;
