import { makeStyles } from "@material-ui/core";
import React from "react";
import frameTopElement from "../../assets/imgs/frameTopElement.png";
import frameBottomElement from "../../assets/imgs/frameBottomElement.png";

const ms = makeStyles((theme) => ({
  box: {
    display: "flex",
    // height: 540,
    width: 1059,
    // backgroundColor: "#19181b",
    backgroundColor: "#0d0e0e",
    // backgroundSize: "contain",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // // backgroundImage: `url(${frameBG})`,

    //88.69047619047619

    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      backgroundImage: `url(${frameTopElement})`,
      zIndex: 999,
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: `url(${frameBottomElement})`,
      zIndex: 999,
    },
  },
}));

const Frame: React.FC<{ className?: string }> = ({
  className,
  children,
  ...props
}) => {
  const c = ms();
  return (
    <div className={c.box + " " + className} {...props}>
      {children}
    </div>
  );
};

export default Frame;
