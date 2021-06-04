import { makeStyles } from "@material-ui/core";
import { FiberPin } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { LogitechMVPProps, ReduxState } from "../config/types/types";

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
import LowerThirds from "../comps/lowerthirds/LowerThirds";

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

const getPercentage = (base: number, n: number) => {
  return (n / base) * 100;
};

const mcs = makeStyles((theme) => ({
  mvpPage: {
    height: 1080,
    width: 1920,
    display: "flex",
    position: "relative",
    // backgroundSize: "stretch",
    alignItems: " flex-start",

    "& .bg": {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
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
    height: 568.125,
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
  lt: {
    zIndex: 99,
    position: "absolute",
    bottom: 60,
    left: 60,
    display: "flex",
    "& .wrapper": {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  },

  logo: {
    position: "relative",
    height: 126 * 0.746031746031746,
    width: 128 * 0.746031746031746,
    marginLeft: 20,
    // backgroundColor: "#ffd200",

    "& .logo": {
      position: "relative",
      height: 126 * 0.746031746031746,
      width: 128 * 0.746031746031746,
      // backgroundColor: "#ffd200",
      zIndex: 100,
      backgroundSize: "auto 75%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "drop-shadow(0px 8px 4px rgba(0,0,0,.25))",
    },

    // "&::before": {
    //   content: "''",
    //   width: 160 * 0.746031746031746,
    //   height: 126 * 0.746031746031746,
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   backgroundColor: "#ffd200",
    //   clipPath: `polygon(0% 0%, 100% 0%, ${getPercentage(
    //     160 * 0.746031746031746,
    //     128 * 0.746031746031746
    //   )}% 100%, 0% 100%)`,
    //   zIndex: 90,
    // },
  },

  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 20px",

    "& .org": {
      color: "#fbfbfb",
      fontFamily: "industry",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 20,
      lineHeight: 1,
      marginBottom: 3,
    },

    "& .player": {
      color: "#ffd200",
      fontFamily: "'Druk Wide Bold'",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 35,
      lineHeight: 1,
    },
  },
}));

const LogitechMVP = () => {
  const { logitech_mvp } = useSelector((state: ReduxState) => state.live);
  const c = mcs(logitech_mvp ?? { champion: "" });
  return (
    <div className={c.mvpPage}>
      <div
        className="bg"
        style={{
          backgroundImage: `url("${logitech_mvp?.champion}")`,
          transform: `scaleX(${
            1 * (logitech_mvp?.agent_adjustments.flip_x ? -1 : 1)
          })`,
        }}
      ></div>
      <div
        className={c.photo}
        style={{
          backgroundImage: `url(${logitech_mvp?.photo_main})`,
          transform: `translateX(${
            logitech_mvp?.player_adjustments.x
          }px)  scale(${
            1 + (logitech_mvp?.player_adjustments.scale ?? 0) * 0.01
          })`,
        }}
      ></div>
      {/* <div
        className={c.agent}
        style={{
          backgroundImage: `url(${agents[logitech_mvp?.agent || "jett"]})`,
          transform: `translateX(${
            logitech_mvp?.agent_adjustments.x
          }px) scale(${
            1 + (logitech_mvp?.agent_adjustments.scale ?? 0) * 0.01
          })`,
        }}
      ></div> */}
      {/* <div className={c.frame}></div> */}

      <div className={c.stats}>
        {logitech_mvp?.stats.map((stat) => (
          <div key={stat.stat_name} className="stat">
            <div className="property">{stat.stat_name}</div>
            <div className="value">{stat.stat_value}</div>
          </div>
        ))}
      </div>

      <LowerThirds className={c.lt} size={950} disablelogo shadow>
        <div className="wrapper">
          <div className={c.logo}>
            <div
              className="logo"
              style={{ backgroundImage: `url(${logitech_mvp?.team?.logo})` }}
            ></div>
          </div>

          <div className={c.info}>
            <div className="org">{logitech_mvp?.team?.org_name}</div>
            <div className="player">{logitech_mvp?.ign}</div>
          </div>
        </div>
      </LowerThirds>
    </div>
  );
};

export default LogitechMVP;
