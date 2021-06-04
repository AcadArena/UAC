import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Match, ReduxState } from "../../config/types/types";

// @ts-ignore
import { Textfit } from "react-textfit";
import { Participant } from "../../config/types/types";
import { Transition } from "react-spring/renderprops";
import useTournament from "../../comps/hooks/useTournament";

const ms = makeStyles((theme) => ({
  schedule: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    // // padding: "0px 10px",
    height: 507,
    maxHeight: 507,
    transition: "150ms ease-out",

    "& .head": {
      fontFamily: "Anton",
      fontSize: 50,
      color: "#ffd200",
      width: "100%",
      textAlign: "center",
      paddingTop: 10,
      borderBottom: "5px solid #ffd200",
    },

    "& .matches": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flexWrap: "wrap",
      // maxHeight: 200,
      marginTop: 5,
      // marginRight: 40,

      "& .match": {
        display: "flex",
        // marginBottom: 5,

        "& .vs": {
          color: "#fff",
          fontSize: 26,
          margin: "0px 20px",
          fontFamily: "Anton",
          alignSelf: "center",
          // width: 100,
          textAlign: "center",
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
          width: 97,
          whiteSpace: "nowrap",
          // height: 30,

          "& .item": {
            marginTop: -3,
          },
        },

        "& .team": {
          display: "flex",
          alignItems: "center",
          width: 450,
          "& .logo": {
            height: 50,
            width: 90,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            margin: "0 15px",
          },

          "& .name": {
            color: "#eeeeee",
            fontFamily: "Druk Wide Bold",
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "left",
            fontSize: 18,
            letterSpacing: 1,
          },
        },
      },
    },
  },
  wrapper: {
    display: "flex",
    // padding: "20px 0px",
    width: "100%",
  },

  // countdown: {
  //   top: 783,
  //   left: 678,
  // },
}));

const ScheduleOnlyModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = ms();
  const {
    matches_today = [],
    tournament = { participants: [], matches: [] },
    match,
  } = useSelector((state: ReduxState) => state.live);

  const { team, badger } = useTournament();

  return (
    <div className={c.wrapper + " " + className} {...props}>
      <div className={c.schedule}>
        <div className="head">SCHEDULE</div>

        <div className="matches">
          <Transition
            items={matches_today.slice(0, 6)}
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
                // @ts-ignore
                <div className="match" key={match.id} style={props}>
                  <div className="badge">{badger(match)}</div>
                  <div className="team left">
                    <div
                      className="logo"
                      style={{
                        backgroundImage: `url(${team(match.player1_id)?.logo})`,
                      }}
                    ></div>

                    <div className="name" style={{ textAlign: "right" }}>
                      {team(match.player1_id)?.university_acronym}{" "}
                      {team(match.player1_id)?.org_name}
                    </div>
                  </div>
                  <div className="vs">VS</div>
                  <div className="team">
                    <div
                      className="logo"
                      style={{
                        backgroundImage: `url(${team(match.player2_id)?.logo})`,
                      }}
                    ></div>
                    <div className="name">
                      {team(match.player2_id)?.university_acronym}{" "}
                      {team(match.player2_id)?.org_name}
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

export default ScheduleOnlyModule;
