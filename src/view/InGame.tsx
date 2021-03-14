import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../config/types/types";
import InGameFrame from "../assets/imgs/top.png";
import { getOriginalNode } from "typescript";
import theme from "../Theme";

const mcs = makeStyles({
  ingame: {
    width: 1920,
    height: 1080,
    position: "relative",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundImage: `url(${InGameFrame})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scores: {
    width: "100%",
    display: "flex",
    justifyContent: "center",

    "& .stage": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Druk Wide Bold",
      textTransform: "uppercase",
      fontSize: 14,
      marginTop: 7,
      color: "#f8f8f8",
    },

    "& .score": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // margin: "0px 5px",
      height: 50,
      width: 50,
      color: "#fff",
      fontFamily: "Anton",
      fontSize: 24,
      whiteSpace: "nowrap",
    },
  },
  teams: {
    width: "100%",
    height: 51,
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    "& .spacer": {
      width: 800,
    },

    "& .two": {
      flexDirection: "row-reverse",
      paddingLeft: 0,
      // paddingRight: 10,
      "& .details": {
        flex: 1,
        "& .org": { textAlign: "right" },
        "& .school": { textAlign: "right" },
      },
    },

    "& .team": {
      display: "flex",
      height: 51,
      width: 400,
      // paddingLeft: 10,
      alignItems: "center",

      "& .score": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // margin: "0px 5px",
        height: 50,
        backgroundCOlor: "blue",
        width: 70,
        color: "#fff",
        fontFamily: "Anton",
        fontSize: 22,
        whiteSpace: "nowrap",
      },

      "& .logo": {
        height: "90%",
        width: 50,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: "0px 10px",
      },

      "& .details": {
        flex: 1,

        "& .org": {
          color: "#ffd200",
          fontFamily: "Druk Wide Bold",
          lineHeight: 1,
          fontSize: 20,
          // whiteSpace: "nowrap",
          textTransform: "uppercase",
        },
        "& .school": {
          color: "#ffffff",
          fontFamily: "Anton",
          textTransform: "uppercase",
          fontSize: 18,
          lineHeight: 1,
          letterSpacing: 1,
        },
      },
    },
  },
  schoolnames: {
    width: 1094,
    height: 30,
    display: "flex",
    justifyContent: "center",
    "& .spacer": {
      width: 250,
    },
    "& .school": {
      flex: 1,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Anton",
      letterSpacing: 1,
      marginBottom: 2,
      fontSize: 18,
      textTransform: "uppercase",
      color: "#f8f8f8",
    },
  },
});

const InGame = () => {
  const c = mcs();
  const {
    match,
    swap_team_positions,
    tournament,
    // game_number = 1,
    live_data,
  } = useSelector((state: ReduxState) => state.live);

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
      <div className={c.schoolnames}>
        <div className="school">
          {swap_team_positions
            ? tournament?.participants.find((org) =>
                org.group_player_ids.includes(match?.player2_id ?? 0)
              )?.university_name
            : tournament?.participants.find((org) =>
                org.group_player_ids.includes(match?.player1_id ?? 0)
              )?.university_name}
        </div>
        <div className="spacer"></div>
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
        <div className="stage">{live_data?.ingame}</div>
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
        <div className="team">
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
            {/* <div className="school">
              {swap_team_positions
                ? tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player2_id ?? 0)
                  )?.university_name
                : tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player1_id ?? 0)
                  )?.university_name}
            </div> */}
          </div>

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
        </div>
        <div className="spacer"></div>
        <div className="team two">
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
            {/* <div className="school">
              {!swap_team_positions
                ? tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player2_id ?? 0)
                  )?.university_name
                : tournament?.participants.find((org) =>
                    org.group_player_ids.includes(match?.player1_id ?? 0)
                  )?.university_name}
            </div> */}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default InGame;
