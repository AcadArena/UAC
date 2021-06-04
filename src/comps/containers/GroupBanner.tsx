import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import sticker from "../../assets/imgs/sticker.png";

const mcs = makeStyles((theme) => ({
  banner: {
    height: 232,
    width: 100,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: `url(${sticker})`,

    "& .text": {
      fontFamily: "Anton",
      fontSize: 50,
      color: "#111111",
      lineHeight: 1,
      marginBottom: 10,
    },
    "& .grp": {
      fontFamily: "Anton",
      fontSize: 125,
      color: "#111111",
      lineHeight: 1,
    },
  },
}));

const GroupBanner: FC<{ group: "A" | "B" }> = ({ group = "A" }) => {
  const classes = mcs();

  return (
    <div className={classes.banner}>
      <div className="text">GRP</div>
      <div className="grp">{group}</div>
    </div>
  );
};

export default GroupBanner;
