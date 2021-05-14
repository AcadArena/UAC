import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Match, ReduxState } from "../../config/types/types";
import { format } from "date-fns";
// @ts-ignore
import { Textfit } from "react-textfit";
import { Participant } from "../../config/types/types";
import { config, Spring, Transition } from "react-spring/renderprops";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useTournament from "../../comps/hooks/useTournament";

const ms = makeStyles((theme) => ({
  schedule: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    padding: "0px 10px",
    transition: "all 150ms ease-out",
    "& .head": {
      fontFamily: "Anton",
      fontSize: 60,
      color: "#ffd200",
    },

    "& .matches": {
      display: "flex",
      flexDirection: "column",
      marginTop: 14,
      marginRight: 40,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      "& .match": {
        display: "flex",
        width: "100%",
        marginBottom: 10,

        "& .vs": {
          color: "#fff",
          fontSize: 28,
          margin: "0px 40px 0px 40px",
          fontFamily: "Anton",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },

        "& .badge": {
          color: "#0d0e0e",
          backgroundColor: "#ffd200",
          padding: "3px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginRight: 20,
          transform: "skew(-10deg)",
          fontFamily: "industry",
          fontWeight: "bold",
          fontSize: 14,
          width: 87,
          whiteSpace: "nowrap",
          // height: 30,

          "& .item": {
            marginTop: -2,
          },
        },

        "& .team": {
          display: "flex",
          alignItems: "center",
          width: 200,
          "& .logo": {
            height: 55,
            width: 70,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginRight: 15,
            flexShrink: 0,
          },

          "& .name": {
            color: "#fbfbfb",
            fontFamily: "Druk Wide Bold",
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "left",
            fontSize: 25,
            width: 150,
            letterSpacing: 1,
          },
        },
      },
    },
  },
  current: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    // padding: "0px 10px",

    "& .head": {
      fontFamily: "Anton",
      fontSize: 60,
      color: "#ffd200",
    },

    "& .match": {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      margin: "50px 0 0",
      "& .team": {
        width: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .logo": {
          height: 160,
          width: 160,
          backgroundSize: "contain",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          marginBottom: 10,
        },
        "& .org": {
          fontFamily: "Anton",
          textTransform: "uppercase",
          // fontSize: 35,
          lineHeight: 1,
          textAlign: "center",
          width: 200,
          height: 35,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          color: "#fff",
        },
        "& .school": {
          width: 200,
          // paddingTop: 5,
          fontFamily: "industry",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: 18,
          // letterSpacing: 1,
          lineHeight: 1,
          color: "#ffd200",
          textAlign: "center",
        },
      },

      "& .vs": {
        // alignSelf: "center",
        marginTop: 85,
        margin: "0px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .text": {
          color: "#fff",
          fontFamily: "Anton",
          fontSize: 45,
          lineHeight: 1,
        },
        "& .bestOf": {
          color: "#ffd200",
          fontFamily: "Druk Wide Bold",
          fontSize: 16,
        },
      },
    },
  },
  wrapper: {
    display: "flex",
    padding: "20px 0px",
    width: "100%",

    height: "100%",
  },

  countdown: {
    top: 783,
    left: 678,
  },

  lowSched: {
    margin: 0 + "!important",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    "& .match": {
      maxHeight: "none !important",
      position: "relative",
      width: "100%",
      justifyContent: "center",
      "& .badge": {
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)!important",
        // justifySelf: "center",
        // alignSelf: "center",
      },
      "&. left": {
        "& .name": {
          textAlign: "center!important",
        },
      },
      "& .team": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "& .logo": {
          height: "100px !important",
          width: "200px !important",

          marginRight: "0px !important",
        },

        "& .name": {
          fontSize: "15px!important",
          width: "200px!important",
          textAlign: "center!important",
        },
      },
      "& .vs": {
        fontSize: "30px !important",
        margin: "0px 60px!important",
      },
    },
  },
}));

const ScheduleModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = ms();
  const { matches_today = [], match } = useSelector(
    (state: ReduxState) => state.live
  );

  const { team, badger } = useTournament();

  const lowSched = (): boolean => {
    return matches_today.filter((m) => m.id !== match?.id).length < 3;
  };

  return (
    <div className={c.wrapper + " " + className} {...props}>
      <div className={c.current}>
        <div className="head">UP NEXT</div>

        <Spring
          from={{ opacity: 0, transform: "translateY(-10px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          delay={1000}
        >
          {(props) => (
            <div className="match" style={props}>
              <div className="team">
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${team(match?.player1_id)?.logo})`,
                  }}
                ></div>
                <Textfit mode="single" max={35}>
                  <div className="org">
                    <div>{team(match?.player1_id)?.org_name}</div>
                  </div>
                </Textfit>
                <div className="school">
                  {team(match?.player1_id)?.university_name}
                </div>
              </div>
              <div className="vs">
                <div className="text">VS</div>
                <div className="bestOf">
                  {match?.bestOf ? "BO" + match?.bestOf : "BO1"}
                </div>
              </div>
              <div className="team">
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${team(match?.player2_id)?.logo})`,
                  }}
                ></div>
                <Textfit mode="single" max={35}>
                  <div className="org">{team(match?.player2_id)?.org_name}</div>
                </Textfit>
                <div className="school">
                  {team(match?.player2_id)?.university_name}
                </div>
              </div>
            </div>
          )}
        </Spring>
      </div>

      <div className={c.schedule}>
        <div className="head">SCHEDULE</div>

        <div className={lowSched() ? "matches " + c.lowSched : "matches"}>
          <Transition
            items={matches_today.filter((m) => m.id !== match?.id).slice(0, 5)}
            keys={(m) => m.id}
            from={{
              opacity: 0,
              maxHeight: 0,
              marginBottom: 0,
            }}
            enter={[
              {
                opacity: 0.000001,
              },
              {
                opacity: 1,
                maxHeight: 55,
                marginBottom: 20,
                // transform: "translateX(0px)",
              },
            ]}
            leave={{
              opacity: 0,
              // transform: "translateX(5px)",
              maxHeight: 0,
              marginBottom: 0,
            }}
            trail={100}
          >
            {(match) => (props) =>
              (
                <div
                  className="match"
                  key={match.id}
                  // @ts-ignore
                  style={props}
                >
                  <div className="badge">
                    <div className="item">{badger(match)}</div>
                  </div>
                  <div className="team left">
                    <div
                      className="logo"
                      style={{
                        backgroundImage: `url(${team(match.player1_id)?.logo})`,
                      }}
                    ></div>
                    <div className="name">
                      {team(match.player1_id)?.university_acronym}
                    </div>
                  </div>
                  <div className="vs">
                    <div className="">vs</div>
                  </div>
                  <div className="team">
                    <div
                      className="logo"
                      style={{
                        backgroundImage: `url(${team(match.player2_id)?.logo})`,
                      }}
                    ></div>
                    <div className="name">
                      {team(match.player2_id)?.university_acronym}
                    </div>
                  </div>
                </div>
              )}
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModule;
