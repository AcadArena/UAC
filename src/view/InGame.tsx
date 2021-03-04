import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../config/types/types";
import DraftingFrame from "../assets/imgs/drafting.png";

const mcs = makeStyles({
  ingame: {
    width: 1920,
    height: 1080,
    position: "relative",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${DraftingFrame})`,
  },
});

const InGame = () => {
  const c = mcs();
  const { match } = useSelector((state: ReduxState) => state.live);
  return (
    <div className={c.ingame}>
      <div className={c.scores}>
        <div className="left"></div>
        <div className="left"></div>
        <div className="left"></div>
      </div>
    </div>
  );
};

export default InGame;
