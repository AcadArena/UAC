import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../config/types/types";

// @ts-ignore
import LowerThirds from "../comps/lowerthirds/LowerThirds";

const mcs = makeStyles({
  vsPage: {
    height: 1080,
    width: 1920,
    position: "relative",
    display: "flex",
    // justifyContent: "space-evenly",
    alignItems: "flex-end",

    // padding: "0 200px",
    backgroundSize: "stretch",

    "& .lts": {
      display: "flex",
      width: "100%",
      justifyContent: "space-evenly",
      position: "absolute",
      bottom: 20,
      // margin: "0 auto",
      zIndex: 100,
    },
    "& .team": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // border: "2px solid blue",
      position: "relative",

      "& .logo": {
        width: 400,
        height: 350,
        backgroundSize: "contain",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: 0,
        zIndex: 5,

        transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
      },

      "& .player": {
        height: 800,
        width: "100%",
        // border: "2px solid yellow",
        backgroundPosition: "bottom center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        zIndex: 10,
        transformOrigin: "bottom center",
        transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
      },

      "& .score": {
        color: "#fff",
        fontFamily: "Anton",
        letterSpacing: 5,
        fontSize: 80,
        textTransform: "uppercase",
        width: 500,
        marginTop: 20,
        textAlign: "center",
        lineHeight: 1,
      },
      "& .org": {
        color: "#ffd200",
        fontFamily: "Druk Wide Bold",
        fontSize: 43,
        textTransform: "uppercase",
        width: 500,
        textAlign: "center",
        lineHeight: 1,
        marginTop: 20,
        display: "flex",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
      },
      "& .school": {
        color: "#fff",
        fontFamily: "Anton",
        fontSize: 30,
        textTransform: "uppercase",
        width: 500,
        textAlign: "center",
        lineHeight: 1,
        marginTop: 10,
      },
    },
  },
  lt: {
    margin: "0px 80px",

    "& .wrapper": {
      height: "100%",
      width: "100%",
      display: "flex",
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
    },

    "& .player": {
      color: "#ffd200",
      fontFamily: "'Druk Wide Bold'",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 25,
      lineHeight: 1,
    },
  },
});

const VsScreenPlayoffs = () => {
  const c = mcs();
  const { tournament, match, vs_screen } = useSelector(
    (state: ReduxState) => state.live
  );

  const team = (t: number): Participant | undefined => {
    return tournament?.participants.find(
      (p) => p.group_player_ids.includes(t) || p.id === t
    );
  };

  const getGroupMatchResults = (team?: Participant): string => {
    const groupIds: number[] = team?.group_player_ids ?? [];

    const matches = tournament?.matches.filter(
      (m) => groupIds.includes(m.player1_id) || groupIds.includes(m.player2_id)
    );

    let lost: number = 0;
    let win: number = 0;

    matches
      ?.filter(
        (match) =>
          groupIds.includes(match.player1_id) ||
          groupIds.includes(match.player2_id)
      )
      .forEach((match) => {
        console.log(match);
        let isTeam1 = groupIds.includes(match.player1_id);
        let ss = match.scores_csv.match(/^(\d*)-(\d*)/);

        if (isTeam1) {
          if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
            win = win + 1;
          } else if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
            lost = lost + 1;
          }
        } else {
          if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
            win = win + 1;
          } else if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
            lost = lost + 1;
          }
        }
      });
    return `${win}-${lost}`;
  };

  const getFinalScore = (score: string, teamIndex: number) => {
    const scores: string[] = score.split(",");
    let team1: number = 0;
    let team2: number = 0;

    scores.forEach((s) => {
      let ss = s.match(/^(\d*)-(\d*)/);
      if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
        team1 = team1 + 1;
      } else if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
        team2 = team2 + 1;
      }
    });
    return teamIndex === 1 ? team1 : team2;
  };
  return (
    <div className={c.vsPage}>
      <div className="team">
        <div
          className="logo"
          style={{
            backgroundImage: `url(${team(match?.player1_id ?? 0)?.logo})`,
            transform: `
              translateX(${vs_screen?.team1_logo_settings.x}px)
              translateY(${vs_screen?.team1_logo_settings.y}px)
              scale(${1 + (vs_screen?.team1_logo_settings.scale ?? 0) * 0.01})
            `,
          }}
        ></div>
        <div
          className="player"
          style={{
            backgroundImage: `url(${vs_screen?.team1_player?.photo_main})`,
            transform: `
              translateX(${vs_screen?.team1_player_settings.x}px)
              translateY(${vs_screen?.team1_player_settings.y}px)
              scale(${1 + (vs_screen?.team1_player_settings.scale ?? 0) * 0.01})
              ${
                vs_screen?.team1_player_settings.flip_x
                  ? "scaleX(-1)"
                  : "scaleX(1)"
              }
            `,
          }}
        ></div>
      </div>

      {/* <div className="spacer"></div> */}

      <div className="team">
        <div
          className="logo"
          style={{
            backgroundImage: `url(${team(match?.player2_id ?? 0)?.logo})`,

            transform: `
              translateX(${vs_screen?.team2_logo_settings.x}px)
              translateY(${vs_screen?.team2_logo_settings.y}px)
              scale(${1 + (vs_screen?.team2_logo_settings.scale ?? 0) * 0.01})
            `,
          }}
        ></div>
        <div
          className="player"
          style={{
            backgroundImage: `url(${vs_screen?.team2_player?.photo_main})`,
            transform: `
            translateX(${vs_screen?.team2_player_settings.x}px)
            translateY(${vs_screen?.team2_player_settings.y}px)
            scale(${1 + (vs_screen?.team2_player_settings.scale ?? 0) * 0.01})
            ${
              vs_screen?.team2_player_settings.flip_x
                ? "scaleX(-1)"
                : "scaleX(1)"
            }
          `,
          }}
        ></div>
      </div>

      <div className="lts">
        {/* Team 1 */}
        <LowerThirds className={c.lt} shadow disablelogo>
          <div className="wrapper">
            <div className={c.logo}>
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${team(match?.player1_id ?? 0)?.logo})`,
                }}
              ></div>
            </div>

            <div className={c.info}>
              <div className="org">
                {team(match?.player1_id ?? 0)?.university_name}
              </div>
              <div className="player">
                {team(match?.player1_id ?? 0)?.org_name}
              </div>
            </div>
          </div>
        </LowerThirds>
        {/* team2 */}
        <LowerThirds className={c.lt} shadow disablelogo reversecut>
          <div
            className="wrapper"
            style={{
              flexDirection: "row-reverse",
            }}
          >
            <div
              className={c.logo}
              style={{
                marginRight: 20,
                marginLeft: 0,
              }}
            >
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${team(match?.player2_id ?? 0)?.logo})`,
                }}
              ></div>
            </div>

            <div className={c.info} style={{ alignItems: "flex-end" }}>
              <div className="org" style={{ textAlign: "right" }}>
                {team(match?.player2_id ?? 0)?.university_name}
              </div>
              <div className="player" style={{ textAlign: "right" }}>
                {team(match?.player2_id ?? 0)?.org_name}
              </div>
            </div>
          </div>
        </LowerThirds>
      </div>
    </div>
  );
};

export default VsScreenPlayoffs;
