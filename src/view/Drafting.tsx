import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../config/types/types";
import DraftingFrame from "../assets/imgs/drafting.png";
import { getOriginalNode } from "typescript";
import theme from "../Theme";

const mcs = makeStyles({
  ingame: {
    width: 1920,
    height: 1080,
    position: "relative",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${DraftingFrame})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scores: {
    width: "100%",
    display: "flex",
    justifyContent: "center",

    "& .gameCount": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 136,
      height: 41,
      fontFamily: "Druk Wide Bold",
      textTransform: "uppercase",
      fontSize: 20,
      color: "#0d0e0e",
    },

    "& .score": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0px 10px",
      height: 70,
      width: 50,
      color: "#fff",
      fontFamily: "Anton",
      fontSize: 24,
      whiteSpace: "nowrap",
    },
  },
  teams: {
    width: 914,
    height: 50,
    position: "absolute",
    top: 158,
    display: "flex",
    justifyContent: "space-between",

    "& .two": {
      flexDirection: "row-reverse",
      "& .details": {
        flex: 1,
        "& .org": { textAlign: "right" },
        "& .school": { textAlign: "right" },
      },
    },

    "& .team": {
      display: "flex",
      height: 50,
      width: 396,
      alignItems: "center",

      "& .logo": {
        height: "80%",
        width: 50,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: "0px 10px",
      },

      "& .details": {
        "& .org": {
          color: "#ffd200",
          fontFamily: "Anton",
          lineHeight: 1,
          fontSize: 20,

          textTransform: "uppercase",
        },
        "& .school": {
          color: "#ffffff",
          fontFamily: "Anton",
          textTransform: "uppercase",
          fontSize: 10,
          lineHeight: 1,
          letterSpacing: 1,
          paddingTop: 3,
        },
      },
    },
  },
});

const Drafting = () => {
  const c = mcs();
  const {
    match,
    swap_team_positions,
    tournament,
    game_number = 1,
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
          if (ss && ss[1] > ss[2]) {
            win = win + 1;
          } else if (ss && ss[1] < ss[2]) {
            lost = lost + 1;
          }
        } else {
          if (ss && ss[1] < ss[2]) {
            win = win + 1;
          } else if (ss && ss[1] > ss[2]) {
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
        <div className="gameCount">Game {game_number}</div>
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
    </div>
  );
};

export default Drafting;
