import { makeStyles } from "@material-ui/core";
import { FiberPin } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../config/types/types";

import Astra from "../assets/imgs/valorant/Astra_artwork.png";
import Breach from "../assets/imgs/valorant/Breach_artwork.png";
import Brimstone from "../assets/imgs/valorant/Brimstone_artwork.png";
import Cypher from "../assets/imgs/valorant/Cypher_artwork.png";
import Jett from "../assets/imgs/valorant/Jett_artwork.png";
import Killjoy from "../assets/imgs/valorant/Killjoy.png";
import Omen from "../assets/imgs/valorant/Omen_artwork.png";
import Phoenix from "../assets/imgs/valorant/Phoenix_artwork.png";
import Raze from "../assets/imgs/valorant/Raze_artwork.png";
import Reyna from "../assets/imgs/valorant/Reyna_artwork.png";
import Sage from "../assets/imgs/valorant/Sage_artwork.png";
import Skye from "../assets/imgs/valorant/Skye_artwork.png";
import Sova from "../assets/imgs/valorant/Sova_artwork.webp";
import Viper from "../assets/imgs/valorant/Viper_artwork.png";
import Yoru from "../assets/imgs/valorant/Yoru_artwork.png";

const agents = {
  astra: Astra,
  breach: Breach,
  brimstone: Brimstone,
  cypher: Cypher,
  jett: Jett,
  killjoy: Killjoy,
  omen: Omen,
  phoenix: Phoenix,
  raze: Raze,
  reyna: Reyna,
  sage: Sage,
  skye: Skye,
  sova: Sova,
  viper: Viper,
  yoru: Yoru,
};

const mcs = makeStyles((theme) => ({
  mvpPage: {
    height: 1080,
    width: 1920,
    display: "flex",
    position: "relative",
    backgroundSize: "stretch",
    alignItems: " flex-start",
  },

  photo: {
    width: 824,
    height: 1020,
    position: "absolute",
    top: 60,
    left: 60,
    backgroundSize: "contain",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
    zIndex: 10,
    transformOrigin: "center bottom",
  },
  agent: {
    position: "absolute",
    left: 100,
    display: "flex",
    height: 1080,
    width: 800,
    // backgroundColor: "grey",
    backgroundSize: "100% auto",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    transformOrigin: "center top",
    zIndex: 1,
    transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
  },

  frame: {
    display: "flex",
    width: 1010,
    aspectRatio: "16/9",
    position: "absolute",
    left: 815,
    top: 292,
    backgroundColor: "green",
    border: "10px solid #004fff",
    zIndex: 5,
  },
  stats: {
    display: "flex",
    position: "absolute",
    right: 100,
    bottom: 35,
    zIndex: 99,

    "& .stat": {
      display: "flex",
      flexDirection: "column",
      fontFamily: "'industry'",
      alignItems: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      padding: "0 50px",
      borderRight: "3px solid #fff",

      "&:last-child": {
        border: "none",
      },

      "& .property": {
        color: "#fff",
        fontSize: 60,
        lineHeight: 1,
      },

      "& .value": {
        color: "#ffd200",

        lineHeight: 1,
        fontSize: 95,
      },
    },
  },
}));

const LogitechMVP = () => {
  const c = mcs();
  const { logitech_mvp } = useSelector((state: ReduxState) => state.live);
  return (
    <div className={c.mvpPage}>
      <div
        className={c.photo}
        style={{
          backgroundImage: `url(${logitech_mvp?.photo_main})`,
          transform: `translateX(${logitech_mvp?.player_offset_x}px)  scale(${
            1 + (logitech_mvp?.player_scale_multiplyer ?? 0) * 0.01
          })`,
        }}
      ></div>
      <div
        className={c.agent}
        style={{
          backgroundImage: `url(${agents[logitech_mvp?.agent || "jett"]})`,
          transform: `translateX(${logitech_mvp?.agent_offset_x}px) scale(${
            1 + (logitech_mvp?.agent_scale_multiplyer ?? 0) * 0.01
          })`,
        }}
      ></div>
      <div className={c.frame}></div>

      <div className={c.stats}>
        {logitech_mvp?.stats.map((stat) => (
          <div key={stat.stat_name} className="stat">
            <div className="property">{stat.stat_name}</div>
            <div className="value">{stat.stat_value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogitechMVP;
