import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Transition } from "react-spring/renderprops-universal";
import bg from "../assets/imgs/veto.png";
import { ReduxState, VetoItem } from "../config/types/types";
import ascent from "../assets/imgs/ascent.jpeg";
import haven from "../assets/imgs/haven.jpeg";
import bind from "../assets/imgs/bind.jpeg";
import split from "../assets/imgs/split.jpeg";
import icebox from "../assets/imgs/icebox.jpeg";

const mapMap = {
  ascent: ascent,
  haven: haven,
  bind: bind,
  split: split,
  icebox: icebox,
};
const mcs = makeStyles({
  page: {
    height: 1080,
    width: 1920,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundImage: `url(${bg})`,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: 1485,
    height: 376,
    top: 445,
    left: 216,
    justifyContent: "space-between",

    "& .team": {
      display: "flex",
      flexDirection: "column",
      alignItem: "center",
      width: 334,
      height: 376,

      "& .container": {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& .logo": {
          height: "80%",
          marginTop: 10,
          width: "80%",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
      },

      "& .org": {
        height: 87,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "Druk Wide Bold",
        color: "#111111",
        fontSize: 22,
        lineHeight: 1.1,
        padding: "10px ",
      },
    },
  },
  veto: {
    display: "flex",
    flexDirection: "column",
    width: 750,
    height: 550,
    justifyContent: "center",
    marginTop: 200,
  },
  vetoItem: {
    width: 749,
    height: 96,
    margin: "7px 0",
    border: "5px solid #ffd200",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "& .banpick": {
      backgroundColor: "#ffd200",
      filter: "grayscale(-100%)",
      position: "absolute",
      top: -2,

      padding: "5px 20px",
      textTransform: "uppercase",
      fontFamily: "Anton",
      fontSize: 18,
      textAlign: "center",
      width: 70,
    },
    "& .map": {
      color: "#f8f8f8",
      backgroundColor: "rgba(0,0,0,.8)",
      padding: "5px 20px",
      textTransform: "uppercase",
      fontFamily: "Anton",
      fontSize: 24,
      width: 150,
      textAlign: "center",
    },
  },
});

const Veto = () => {
  const c = mcs();
  const { match, tournament } = useSelector((state: ReduxState) => state.live);
  const team = (id: number) => {
    return tournament?.participants?.find(
      (p) => p.id === id || p.group_player_ids.includes(id)
    );
  };
  const team1 = team(match?.player1_id ?? 0)?.university_acronym;
  const team2 = team(match?.player2_id ?? 0)?.university_acronym;
  return (
    <div className={c.page}>
      <div className={c.wrapper}>
        <div className="team">
          <div className="container">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${team(match?.player1_id ?? 0)?.logo})`,
              }}
            ></div>
          </div>
          <div className="org">{team(match?.player1_id ?? 0)?.org_name}</div>
        </div>
        <div className="team">
          <div className="container">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${team(match?.player2_id ?? 0)?.logo})`,
              }}
            ></div>
          </div>
          <div className="org">{team(match?.player2_id ?? 0)?.org_name}</div>
        </div>
      </div>

      <div className={c.veto}>
        <Transition
          items={match?.veto ?? []}
          keys={(v: VetoItem) => v.map}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          trail={300}
        >
          {(v) => (props) => (
            <div
              className={c.vetoItem}
              style={{
                ...props,
                backgroundImage: `url(${mapMap[v.map]})`,
                filter: v.type === "ban" ? "grayscale(100%)" : "",
              }}
            >
              <div className="map">{v.map}</div>
              <div
                className="banpick"
                style={{
                  ...(v.team.university_acronym === team1
                    ? { left: -2 }
                    : v.team.university_acronym === team2
                    ? { right: -2 }
                    : { top: 70, width: 125 }),
                }}
              >
                {v.team.university_acronym === "AUTO" ? "Left Over" : v.type}
              </div>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default Veto;
