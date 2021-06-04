import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../config/types/types";
import bracketPng from "../assets/imgs/bracket.png";
const mcs = makeStyles((theme) => ({
  bracket: {
    backgroundSize: "contain",
    backgroundImage: `url(${bracketPng})`,
    backgroundRepeat: "no-repeat",
    width: 874,
    height: 331,
    position: "relative",
    display: "flex",
  },
  match: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",

    "& .team": {
      display: "flex",

      "& .score": {
        width: 44,
        height: 34,
        marginRight: 2,
        marginBottom: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'industry'",
        fontWeight: "bold",
        color: "#0d0e0e",
        fontSize: 23,
        lineHeight: 1,

        transform: "translateY(-1px)",
      },
    },
  },

  details: {
    width: 164,
    height: 34,
    marginBottom: 2,
    display: "flex",
    alignItems: "center",

    "& .logo": {
      height: 30,
      width: 40,
      margin: "0px 10px 0px 6px",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .org": {
      fontFamily: "'industry'",
      fontWeight: "bold",
      color: "#fff",
      fontSize: 15,
      lineHeight: 1,
      textTransform: "uppercase",
      whiteSpace: "no-wrap",
      fontStyle: "italic",
    },
  },

  match2: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",

    "& .team": {
      display: "flex",

      "& .score": {
        width: 50,
        height: 39,
        marginRight: 3,
        marginBottom: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'industry'",
        fontWeight: "bold",
        color: "#010101",
        fontSize: 25,
        lineHeight: 1,
        transform: "translateY(-1px)",
      },
    },
  },

  details2: {
    width: 187,
    height: 39,
    marginBottom: 2,
    display: "flex",
    alignItems: "center",

    "& .logo": {
      height: 30,
      width: 40,
      margin: "0px 4px 0px 6px",
      backgroundSize: "contain",
      backgroundPosition: "center",

      backgroundRepeat: "no-repeat",
    },

    "& .org": {
      fontFamily: "'industry'",
      fontWeight: "bold",
      color: "#fff",
      fontSize: 19,
      textTransform: "uppercase",
      letterSpacing: -0.8,
      fontStyle: "italic",
      whiteSpace: "no-wrap",
    },
  },
}));

const Bracket = () => {
  const c = mcs();
  const { tournament } = useSelector((state: ReduxState) => state.live);
  console.log(tournament);

  const team = (id: number) => {
    return tournament?.participants?.find((p) => p.id === id);
  };

  const score = (score: string, teamIndex: number) => {
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

  const match = (id: number) => {
    return tournament?.matches?.find((m) => m.id === id);
  };

  const getWinner = (matchId: number) => {
    if (score(match(matchId)?.scores_csv ?? "0-0", 1) > 1) {
      return team(match(matchId)?.player1_id ?? 0);
    } else if (score(match(matchId)?.scores_csv ?? "0-0", 2) > 1) {
      return team(match(matchId)?.player2_id ?? 0);
    } else {
      return null;
    }
  };

  return (
    <div className={c.bracket}>
      {/* Match 1 */}
      <div
        className={c.match}
        style={{
          top: 49,
          left: 0,
        }}
      >
        {/* Team 1 */}
        <div className="team">
          <div className="score">
            {score(match(239481248)?.scores_csv ?? "0-0", 1)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481248)?.player1_id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481248)?.player1_id ?? 0)?.university_acronym}
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div className="team">
          <div className="score">
            {score(match(239481248)?.scores_csv ?? "0-0", 2)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481248)?.player2_id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481248)?.player2_id ?? 0)?.university_acronym}
            </div>
          </div>
        </div>
      </div>

      {/* Match 2 */}
      <div
        className={c.match}
        style={{
          top: 260,
          left: 0,
        }}
      >
        {/* Team 1 */}
        <div className="team">
          <div className="score">
            {score(match(239481249)?.scores_csv ?? "0-0", 1)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481249)?.player1_id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481249)?.player1_id ?? 0)?.university_acronym}
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div className="team">
          <div className="score">
            {score(match(239481249)?.scores_csv ?? "0-0", 2)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481249)?.player2_id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481249)?.player2_id ?? 0)?.university_acronym}
            </div>
          </div>
        </div>
      </div>

      {/* Match 3 */}
      <div
        className={c.match}
        style={{
          top: 0,
          left: 329,
        }}
      >
        {/* Team 1 */}
        <div className="team">
          <div className="score">
            {score(match(239481250)?.scores_csv ?? "0-0", 1)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481250)?.player1_id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481250)?.player1_id ?? 0)?.university_acronym}
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div className="team">
          <div className="score">
            {score(match(239481250)?.scores_csv ?? "0-0", 2)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481250)?.player2_id ?? 0)?.logo ??
                  getWinner(239481248)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481250)?.player2_id ?? 0)?.university_acronym ??
                getWinner(239481248)?.university_acronym ??
                "TBD"}
            </div>
          </div>
        </div>
      </div>

      {/* Match 4 */}
      <div
        className={c.match}
        style={{
          top: 210,
          left: 329,
        }}
      >
        {/* Team 1 */}
        <div className="team">
          <div className="score">
            {score(match(239481251)?.scores_csv ?? "0-0", 1)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481251)?.player1_id ?? 0)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481251)?.player1_id ?? 0)?.university_acronym}
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div className="team">
          <div className="score">
            {score(match(239481251)?.scores_csv ?? "0-0", 2)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481251)?.player2_id ?? 0)?.logo ??
                  getWinner(239481249)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481251)?.player2_id ?? 0)?.university_acronym ??
                getWinner(239481249)?.university_acronym ??
                "TBD"}
            </div>
          </div>
        </div>
      </div>

      {/* Match 5 */}
      <div
        className={c.match}
        style={{
          top: 107,
          left: 664,
        }}
      >
        {/* Team 1 */}
        <div className="team">
          <div className="score">
            {score(match(239481252)?.scores_csv ?? "0-0", 1)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481252)?.player1_id ?? 0)?.logo ??
                  getWinner(239481250)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481252)?.player1_id ?? 0)?.university_acronym ??
                getWinner(239481250)?.university_acronym ??
                "TBD"}
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div className="team">
          <div className="score">
            {score(match(239481252)?.scores_csv ?? "0-0", 2)}
          </div>
          <div className={c.details}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(match(239481252)?.player2_id ?? 0)?.logo ??
                  getWinner(239481251)?.logo
                })`,
              }}
            ></div>
            <div className="org">
              {team(match(239481252)?.player2_id ?? 0)?.university_acronym ??
                getWinner(239481251)?.university_acronym ??
                "TBD"}
            </div>
          </div>
        </div>
      </div>

      {/* Winner 1 */}
      <div
        className={c.details}
        style={{
          position: "absolute",
          top: 67,
          left: 308,
        }}
      >
        <div
          className="logo"
          style={{
            backgroundImage: `url(${getWinner(233491296)?.logo})`,
          }}
        ></div>
        <div className="org">{getWinner(233491296)?.university_acronym}</div>
      </div>

      {/* Winner 2 */}
      <div
        className={c.details}
        style={{
          position: "absolute",
          top: 189,
          left: 308,
        }}
      >
        <div
          className="logo"
          style={{
            backgroundImage: `url(${getWinner(233491297)?.logo})`,
          }}
        ></div>
        <div className="org">{getWinner(233491297)?.university_acronym}</div>
      </div>

      {/* Winner 3 */}
      <div
        className={c.details2}
        style={{
          position: "absolute",
          top: 333,
          left: 798,
        }}
      >
        <div
          className="logo"
          style={{
            backgroundImage: `url(${getWinner(233491301)?.logo})`,
          }}
        ></div>
        <div className="org">{getWinner(233491301)?.university_acronym}</div>
      </div>

      {/* Winner 4 */}
      <div
        className={c.details2}
        style={{
          position: "absolute",
          top: 490,
          left: 798,
        }}
      >
        <div
          className="logo"
          style={{
            backgroundImage: `url(${getWinner(233491302)?.logo})`,
          }}
        ></div>
        <div className="org">{getWinner(233491302)?.university_acronym}</div>
      </div>
    </div>
  );
};

export default Bracket;
