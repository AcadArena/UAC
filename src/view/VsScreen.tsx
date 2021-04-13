import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../config/types/types";

// @ts-ignore
import { Textfit } from "react-textfit";

const mcs = makeStyles({
  vsPage: {
    height: 1080,
    width: 1920,
    position: "relative",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",

    padding: "0 200px",
    "& .spacer": {
      width: 500,
    },
    "& .team": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 500,
      marginTop: 150,
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

      "& .logo": {
        width: 400,
        height: 350,
        backgroundSize: "contain",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
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
    },
  },
});

const VsScreen = () => {
  const c = mcs();
  const { tournament, match } = useSelector((state: ReduxState) => state.live);

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
          }}
        ></div>
        <div className="org">
          <Textfit mode="single" max={43}>
            {team(match?.player1_id ?? 0)?.org_name}
          </Textfit>
        </div>
        <div className="school">
          {team(match?.player1_id ?? 0)?.university_name}
        </div>
        <div className="score">{getFinalScore(match?.scores_csv ?? "", 1)}</div>
      </div>

      <div className="spacer"></div>

      <div className="team">
        <div
          className="logo"
          style={{
            backgroundImage: `url(${team(match?.player2_id ?? 0)?.logo})`,
          }}
        ></div>
        <div className="org">
          <Textfit mode="single" max={43}>
            {team(match?.player2_id ?? 0)?.org_name}
          </Textfit>
        </div>
        <div className="school">
          {team(match?.player2_id ?? 0)?.university_name}
        </div>
        <div className="score">{getFinalScore(match?.scores_csv ?? "", 2)}</div>
      </div>
    </div>
  );
};

export default VsScreen;
