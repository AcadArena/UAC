import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { config, Spring } from "react-spring/renderprops";
import { Participant, ReduxState } from "../config/types/types";

const mcs = makeStyles({
  winnerPage: {
    height: 1080,
    width: 1920,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    alignSelf: "center",
    justifySelf: "center",
    marginTop: 125,
    "& .text": {
      fontFamily: "Druk Wide Bold",
      fontSize: 250,
      lineHeight: 1,
      position: "relative",
    },

    "& .front": {
      color: "#ffd200",
      zIndex: 99,
    },
    "& .back": {
      color: "transparent",
      "-webkit-text-stroke": "2px #fff",
      opacity: 0.15,
    },

    "& .top": {
      marginBottom: -40,
      transform: "translateY(100%)",
    },
    "& .bottom": { marginTop: -40, transform: "translateY(-100%)" },
  },
  team: {
    position: "absolute",
    zIndex: 1000,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    filter: "drop-shadow(0px 10px 20px rgba(0,0,0,.5))",
    paddingTop: 80,
    "& .logo": {
      height: 500,
      width: 500,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .org": {
      fontFamily: "Druk Wide Bold",
      fontSize: 70,
      lineHeight: 1,
      marginTop: 30,
      textTransform: "uppercase",
      color: "#ffd200",
    },
    "& .school": {
      fontFamily: "Anton",
      fontSize: 40,
      lineHeight: 1,
      textTransform: "uppercase",
      color: "#fff",
    },
  },
});

const Winner: React.FC<{ alt?: boolean }> = ({ alt }) => {
  const c = mcs();
  const { tournament, match } = useSelector((state: ReduxState) => state.live);

  const team = (id: number): Participant | undefined => {
    return tournament?.participants.find((p) =>
      p.group_player_ids.includes(id)
    );
  };

  return (
    <div className={c.winnerPage}>
      <Spring
        from={{ opacity: 0, transform: "translateY(100px)" }}
        to={{ opacity: 1, transform: "translateY(0px)" }}
      >
        {(props) => (
          <div className={c.text} style={props}>
            <Spring
              from={{ opacity: 1, transform: "translateY(100%)" }}
              to={{ opacity: 0.15, transform: "translateY(0%)" }}
            >
              {(props) => (
                <div className="text back top" style={props}>
                  WINNER
                </div>
              )}
            </Spring>

            <div className="text front">WINNER</div>
            <Spring
              from={{
                opacity: 1,
                transform: "translateY(-100%)",
                "-webkit-text-stroke": "2px rgb(255,210,0)",
              }}
              to={{
                opacity: 0.15,
                transform: "translateY(0%)",
                "-webkit-text-stroke": "2px rgb(255,255,255)",
              }}
            >
              {(props) => (
                <div className="text back bottom" style={props}>
                  WINNER
                </div>
              )}
            </Spring>
          </div>
        )}
      </Spring>

      <Spring
        from={{ opacity: 0, transform: "scale(1.2)" }}
        to={{ opacity: 1, transform: "scale(1)" }}
        delay={1000}
      >
        {(props) => (
          <div className={c.team} style={props}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  !alt
                    ? team(match?.player1_id ?? 0)?.logo
                    : team(match?.player2id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {!alt
                ? team(match?.player1_id ?? 0)?.org_name
                : team(match?.player2id ?? 0)?.org_name}
            </div>
            <div className="school">
              {!alt
                ? team(match?.player1_id ?? 0)?.university_name
                : team(match?.player2id ?? 0)?.university_name}
            </div>
          </div>
        )}
      </Spring>
    </div>
  );
};

export default Winner;
