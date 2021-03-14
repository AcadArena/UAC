import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState, VetoItem } from "../config/types/types";
import DraftingFrame from "../assets/imgs/draft.png";
import { getOriginalNode } from "typescript";
import theme from "../Theme";
import { Transition } from "react-spring/renderprops-universal";
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
  ingame: {
    width: 1920,
    height: 1080,
    position: "relative",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${DraftingFrame})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "visible",
  },
  scores: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 160,

    "& .bestOf": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 1124,
      height: 41,
      fontFamily: "Anton",
      textTransform: "uppercase",
      fontSize: 30,
      paddingBottom: 6,
      // marginTop: 2,
      color: "#f8f8f8",
      alignSelf: "flex-end",
    },

    "& .score": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // margin: "0px 10px",
      // height: 70,
      width: 83,
      color: "#fff",
      fontFamily: "Anton",
      fontSize: 24,
      whiteSpace: "nowrap",
    },
  },
  teams: {
    width: 1250,
    height: 160,
    position: "absolute",
    // top: 158,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .spacer": {
      width: 136,
    },
    "& .one": {
      flexDirection: "row-reverse",

      "& .details": {
        flex: 1,
        "& .org": { textAlign: "right" },
        "& .school": { textAlign: "right" },
      },
    },

    "& .two": {},
    "& .team": {
      display: "flex",
      // flex: 1,
      alignItems: "center",
      width: 464 + 105,
      "& .score": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        // margin: "0px 10px",
        // height: 70,
        // width: 83,
        width: 105,
        color: "#fff",
        fontFamily: "Anton",
        fontSize: 48,
        whiteSpace: "nowrap",
      },
      "& .logo": {
        height: 91,
        width: 91,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: "0px 10px",
        flexShronk: 0,
      },

      "& .details": {
        "& .org": {
          color: "#ffd200",
          fontFamily: "Druk Wide Bold",
          lineHeight: 1,
          fontSize: 26,
          textTransform: "uppercase",
        },
        "& .school": {
          color: "#ffffff",
          fontFamily: "Anton",
          textTransform: "uppercase",
          fontSize: 18,
          lineHeight: 1,
          letterSpacing: 1,
          paddingTop: 3,
        },
      },
    },
  },
  picks: {
    display: "flex",
    position: "absolute",
    alignSelf: "center",
    bottom: 359,
    width: 883,
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: -10,
  },
  vetoItem: {
    height: 58,
    flex: 1,
    maxWidth: "30%",
    minWidth: "30%",
    margin: "0px 7px 14px 7px",
    border: "5px solid #ffd200",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 10,
    "& .text": {
      color: "#fff",
      textTransform: "uppercase",
      fontFamily: "Anton",
      letterSpacing: 1,
      fontSize: 20,
      padding: "3px 20px",
      backgroundColor: "rgba(0,0,0,.6)",
    },
    "& .winner": {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,.5)",
      "& .logo": {
        height: "100%",
        width: "100%",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transform: "scale(2)",
        filter: "drop-shadow(0px 4px 4px rgba(0,0,0,1))",
      },
    },
  },
});

const Drafting = () => {
  const c = mcs();
  const { match, swap_team_positions, tournament, live_data } = useSelector(
    (state: ReduxState) => state.live
  );

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
          groupIds.includes(match.player2_id) ||
          match.player1_id === team?.id ||
          match.player2_id === team?.id
      )
      .forEach((match) => {
        let isTeam1 =
          groupIds.includes(match.player1_id) || match.player1_id === team?.id;
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
    // ?.map((m) => m.winner_id)
    // .reduce((acc, cur) => {
    //   if (groupIds.includes(cur)) {
    //     return acc + 1;
    //   } else {
    //     return acc;
    //   }
    // }, 0) ?? 0;
    return `${win}-${lost}`;
  };

  return (
    <div className={c.ingame}>
      <div className={c.scores}>
        {/* <div className="score">
          {swap_team_positions
            ? getGroupMatchResults(
                tournament?.participants.find((org) =>
                  org.group_player_ids.includes(match?.player2_id ?? 0)
                )
              )
            : getGroupMatchResults(
                tournament?.participants.find((org) =>
                  org.group_player_ids.includes(match?.player1_id ?? 0)
                )
              )}
        </div> */}
        <div className="bestOf">
          {live_data?.ingame || `BO${match?.bestOf ?? 1}`}
        </div>
        {/* <div className="score">
          {!swap_team_positions
            ? getGroupMatchResults(
                tournament?.participants.find((org) =>
                  org.group_player_ids.includes(match?.player2_id ?? 0)
                )
              )
            : getGroupMatchResults(
                tournament?.participants.find((org) =>
                  org.group_player_ids.includes(match?.player1_id ?? 0)
                )
              )}
        </div> */}
      </div>
      <div className={c.teams}>
        <div className="team one">
          {Boolean(match?.group_id) && (
            <div className="score">
              {swap_team_positions
                ? getGroupMatchResults(
                    tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player2_id ?? 0)
                    )
                  )
                : getGroupMatchResults(
                    tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player1_id ?? 0)
                    )
                  )}
            </div>
          )}
          <div
            className="logo"
            style={{
              backgroundImage: `url(${
                swap_team_positions
                  ? tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player2_id ?? 0)
                    )?.logo
                  : tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player1_id ?? 0)
                    )?.logo
              })`,
              margin: Boolean(match?.group_id)
                ? "0px 10px"
                : "0px 0px 0px 10px",
            }}
          ></div>
          <div className="details">
            <div className="org">
              {swap_team_positions
                ? tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player2_id ?? 0)
                  )?.org_name
                : tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player1_id ?? 0)
                  )?.org_name}
            </div>
            <div className="school">
              {swap_team_positions
                ? tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player2_id ?? 0)
                  )?.university_name
                : tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player1_id ?? 0)
                  )?.university_name}
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="team two">
          {Boolean(match?.group_id) && (
            <div className="score">
              {!swap_team_positions
                ? getGroupMatchResults(
                    tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player2_id ?? 0)
                    )
                  )
                : getGroupMatchResults(
                    tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player1_id ?? 0)
                    )
                  )}
            </div>
          )}
          <div
            className="logo"
            style={{
              backgroundImage: `url(${
                !swap_team_positions
                  ? tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player2_id ?? 0)
                    )?.logo
                  : tournament?.participants.find((org) =>
                      org.group_player_ids.includes(match?.player1_id ?? 0)
                    )?.logo
              })`,
              margin: Boolean(match?.group_id)
                ? "0px 10px"
                : "0px 10px 0px 0px",
            }}
          ></div>
          <div className="details">
            <div className="org">
              {!swap_team_positions
                ? tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player2_id ?? 0)
                  )?.org_name
                : tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player1_id ?? 0)
                  )?.org_name}
            </div>
            <div className="school">
              {!swap_team_positions
                ? tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player2_id ?? 0)
                  )?.university_name
                : tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player1_id ?? 0)
                  )?.university_name}
            </div>
          </div>
        </div>
      </div>

      <div className={c.picks}>
        <Transition
          items={match?.veto?.filter((v) => v.type === "pick") ?? []}
          from={{ opacity: 0, transform: "translateY(10px)" }}
          enter={{ opacity: 1, transform: "translateY(0px)" }}
          delay={1500}
        >
          {(v) => (props) => (
            <div
              className={c.vetoItem}
              style={{
                backgroundImage: `url(${mapMap[v.map]})`,
                ...props,
                justifyContent: Boolean(v.winner) ? "flex-start" : "center",
              }}
            >
              <div className="text">
                {v.team.university_acronym !== "AUTO" &&
                  `${v.team.university_acronym} — `}
                {v.map}
              </div>
              {Boolean(v.winner) && (
                <div className="winner">
                  <div
                    className="logo"
                    style={{ backgroundImage: `url(${v.winner?.logo})` }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default Drafting;
