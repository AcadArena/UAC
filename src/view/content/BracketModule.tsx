import { makeStyles } from "@material-ui/core";
import React from "react";
import Bracket from "../Bracket";

const mcs = makeStyles({
  bracketModule: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "40px 0",
  },
  labels: {
    display: "flex",
    marginBottom: 30,
    marginTop: 50,

    "& .label": {
      backgroundColor: "#ffd200",
      color: "#0d0e0e",
      padding: "3px 20px",
      fontFamily: "industry",
      fontWeight: "bold",
      margin: "0px 70px",
      textTransform: "uppercase",
    },
  },
  bracket: {
    position: "absolute",
    color: "#ffd200",

    fontFamily: "Anton",
    fontSize: 70,
    letterSpacing: 2,
    left: 30,
    top: 20,
  },
});

const BracketModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = mcs();
  return (
    <div className={c.bracketModule + " " + className} {...props}>
      <div className={c.bracket}>BRACKET</div>
      <div className={c.labels}>
        <div className="label" style={{ transform: "translateY(50px)" }}>
          Quarterfinals - June 5
        </div>
        <div className="label" style={{ transform: "translateX(10px)" }}>
          Semi-Finals - June 6
        </div>
        <div className="label" style={{ transform: "translateY(100px)" }}>
          Grand Finals - June 13
        </div>
      </div>
      <Bracket />
    </div>
  );
};

export default BracketModule;
