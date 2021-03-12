import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Match, ReduxState } from "../../config/types/types";

// @ts-ignore
import { Textfit } from "react-textfit";
import { Participant } from "../../config/types/types";
import { config, Spring, Transition } from "react-spring/renderprops";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const ms = makeStyles((theme) => ({
  schedule: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    padding: "0px 10px",
    height: 460,
    transition: "all 150ms ease-out",
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
          fontSize: 12,
          width: 87,
          whiteSpace: "nowrap",
          // height: 30,

          "& .item": {
            marginTop: -3,
          },
        },

        "& .team": {
          display: "flex",
          alignItems: "center",
          width: 170,
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
            width: 100,
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
      fontSize: 50,
      color: "#ffd200",
    },

    "& .match": {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      marginTop: 50,
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

const ScheduleModule: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const c = ms();
  const {
    matches_today = [],
    tournament = { participants: [], matches: [] },
    match,
  } = useSelector((state: ReduxState) => state.live);

  const getOrgName = (id: number): string => {
    return (
      tournament?.participants?.find((p: Participant) => p.id === id)
        ?.org_name ??
      tournament?.participants.find((p: Participant) =>
        p.group_player_ids.includes(id)
      )?.org_name ??
      ""
    );
  };
  const getUniversityName = (id: number): string => {
    return (
      tournament?.participants?.find((p: Participant) => p.id === id)
        ?.university_name ??
      tournament?.participants.find((p: Participant) =>
        p.group_player_ids.includes(id)
      )?.university_name ??
      ""
    );
  };

  const getOrgLogo = (id: number): string => {
    return (
      tournament?.participants?.find((p: Participant) => p.id === id)?.logo ??
      tournament?.participants.find((p: Participant) =>
        p.group_player_ids.includes(id)
      )?.logo ??
      ""
    );
  };

  const team = (id: number | undefined) => {
    return tournament?.participants?.find(
      (p) => p.group_player_ids.includes(id ?? 0) || p.id === id
    );
  };

  const getGroupsWins = (team?: Participant): number => {
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

    return win;
  };

  const getMatchWins = (match: Match, team?: Participant) => {
    const groupIds: number[] = team?.group_player_ids ?? [];

    let win: number = 0;
    let lost: number = 0;

    let isTeam1 =
      groupIds.includes(match.player1_id) || team?.id === match.player1_id;
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
    return win;
  };

  const badger = (m: Match) => {
    let team1 = team(m.player1_id);
    let team2 = team(m.player2_id);
    if (getMatchWins(m, team1) > getMatchWins(m, team2)) {
      return `#${team1?.university_acronym}WIN`;
    } else if (getMatchWins(m, team1) < getMatchWins(m, team2)) {
      return `#${team2?.university_acronym}WIN`;
    } else if (getMatchWins(m, team1) === getMatchWins(m, team2)) {
      return m.badge ?? "SOON";
    }
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
          )}
        </Spring>
      </div>
      <div className={c.schedule}>
        <div className="head">SCHEDULE</div>

        <div className="matches">
          <Transition
            items={matches_today.filter((m) => m.id !== match?.id)}
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
            {(match) => (props) => (
              // @ts-ignore
              <div className="match" key={match.id} style={props}>
                <div className="badge">
                  <div className="item">{badger(match)}</div>
                </div>
                <div className="team left">
                  <div
                    className="logo"
                    style={{
                      backgroundImage: `url(${getOrgLogo(match.player1_id)})`,
                    }}
                  ></div>

                  <div className="name">{getOrgName(match.player1_id)}</div>
                </div>
                <div className="vs">
                  <div className="">vs</div>
                </div>
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
            )}
          </Transition>

          {/* {matches_today
            .filter((m) => m.id !== match?.id)
            .map((match) => (
              <div className="match" key={match.id}>
                <div className="badge">
                  <div className="item">{badger(match)}</div>
                </div>
                <div className="team left">
                  <div
                    className="logo"
                    style={{
                      backgroundImage: `url(${getOrgLogo(match.player1_id)})`,
                    }}
                  ></div>

                  <div className="name">{getOrgName(match.player1_id)}</div>
                </div>
                <div className="vs">
                  <div className="">vs</div>
                </div>
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
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModule;
