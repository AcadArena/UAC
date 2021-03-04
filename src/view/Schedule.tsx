import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Frame from "../comps/containers/Frame";
import { ReduxState } from "../config/types/types";

// @ts-ignore
import { Textfit } from "react-textfit";
import TimerOnly from "./TimerOnly";

const ms = makeStyles((theme) => ({
  page: {
    position: "relative",
    height: 1080,
    width: 1920,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  box: {
    position: "absolute",
    top: 303,
    left: 678,
  },

  schedule: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    padding: "0px 10px",

    "& .head": {
      fontFamily: "Anton",
      fontSize: 50,
      color: "#ffd200",
    },

    "& .matches": {
      display: "flex",
      flexDirection: "column",
      marginTop: 14,
      marginRight: 40,

      "& .match": {
        display: "flex",
        marginBottom: 20,

        "& .vs": {
          color: "#fff",
          fontSize: 16,
          margin: "0px 20px 0px 20px",
          fontFamily: "Anton",
          alignSelf: "center",
        },

        "& .badge": {
          color: "#fbfbfb",
          backgroundColor: "#004fff",
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
          // height: 30,

          "& .item": {
            marginTop: -3,
          },
        },

        "& .team": {
          display: "flex",
          alignItems: "center",
          width: 200,
          "& .logo": {
            height: 55,
            width: 55,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginRight: 15,
          },

          "& .name": {
            color: "#fbfbfb",
            fontFamily: "Anton",
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "left",
            fontSize: 14,
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
    // padding: "0px 10px",s

    "& .head": {
      fontFamily: "Anton",
      fontSize: 50,
      color: "#ffd200",
    },

    "& .match": {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      "& .team": {
        width: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .logo": {
          height: 160,
          width: 160,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginBottom: 10,
        },
        "& .org": {
          color: "#ffd200",
          fontFamily: "Anton",
          textTransform: "uppercase",
          // fontSize: 35,
          lineHeight: 1,
          textAlign: "center",
          width: 200,
          height: 35,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .school": {
          width: 150,
          paddingTop: 5,
          color: "#fff",
          fontFamily: "Druk Wide Bold",
          textTransform: "uppercase",
          fontSize: 12,
          letterSpacing: 1,
          lineHeight: 1,
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
  },

  countdown: {
    top: 783,
    left: 678,
  },
}));

const Schedule = () => {
  const c = ms();
  const {
    matches_today = [],
    tournament = { participants: [] },
    match,
  } = useSelector((state: ReduxState) => state.live);

  const getOrgName = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.org_name ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.org_name ??
      ""
    );
  };
  const getUniversityName = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.university_name ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.university_name ??
      ""
    );
  };

  const getOrgLogo = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.logo ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.logo ??
      ""
    );
  };

  return (
    <div className={c.page}>
      <Frame className={c.box}>
        <div className={c.wrapper}>
          <div className={c.current}>
            <div className="head">UP NEXT</div>

            <div className="match">
              <div className="team">
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${getOrgLogo(
                      match?.player1_id ?? 0
                    )})`,
                  }}
                ></div>
                <Textfit mode="single" max={35}>
                  <div className="org">
                    <div>{getOrgName(match?.player1_id ?? 0)}</div>
                  </div>
                </Textfit>
                <div className="school">
                  {getUniversityName(match?.player1_id ?? 0)}
                </div>
              </div>
              <div className="vs">
                <div className="text">VS</div>
                <div className="bestOf">{match?.bestOf ?? "BO1"}</div>
              </div>
              <div className="team">
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${getOrgLogo(
                      match?.player2_id ?? 0
                    )})`,
                  }}
                ></div>
                <Textfit mode="single" max={35}>
                  <div className="org">
                    {getOrgName(match?.player2_id ?? 0)}
                  </div>
                </Textfit>
                <div className="school">
                  {getUniversityName(match?.player2_id ?? 0)}
                </div>
              </div>
            </div>
          </div>
          <div className={c.schedule}>
            <div className="head">SCHEDULE</div>

            <div className="matches">
              {matches_today.map((match) => (
                <div className="match" key={match.id}>
                  <div className="team left">
                    <div
                      className="logo"
                      style={{
                        backgroundImage: `url(${getOrgLogo(match.player1_id)})`,
                      }}
                    ></div>

                    <div className="name">{getOrgName(match.player1_id)}</div>
                  </div>
                  <div className="vs">VS</div>
                  <div className="team">
                    <div
                      className="logo"
                      style={{
                        backgroundImage: `url(${getOrgLogo(match.player2_id)})`,
                      }}
                    ></div>
                    <div className="name">{getOrgName(match.player2_id)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>

      <TimerOnly className={c.countdown} />
    </div>
  );
};

export default Schedule;
