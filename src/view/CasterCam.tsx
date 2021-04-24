import { Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LowerThirds, {
  getLTWidth,
  LowerThirdsSize,
} from "../comps/lowerthirds/LowerThirds";
import {
  ReduxState,
  LowerThirdsMode,
  Participant,
  VetoItem,
  PollItemProps,
} from "../config/types/types";
import Marquee from "react-fast-marquee";
import theme from "../Theme";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { wsContext } from "../config/WebsocketProvider";
import { Transition } from "react-spring/renderprops";
import { RouteComponentProps, withRouter } from "react-router-dom";
import LeftFrame from "../assets/imgs/left-frame.png";
import RightFrame from "../assets/imgs/right-frame.png";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ascentMap from "../assets/imgs/ascent.jpeg";
import bindMap from "../assets/imgs/bind.jpeg";
import splitMap from "../assets/imgs/split.jpeg";
import iceboxMap from "../assets/imgs/icebox.jpeg";
import havenMap from "../assets/imgs/haven.jpeg";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { projectFirestore as db } from "../config/firebase";
import Ad from "./lowerthirds/Ad";

const ms = makeStyles({
  screen: {
    position: "relative",
    height: 1080,
    width: 1920,
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  LowerThirds: {
    position: "absolute",
    top: 822,
    left: 359,
    opacity: 0,

    "& .fade-enter": {
      opacity: 0,
      transform: "translateX(-15px)",
    },
    "& .fade-enter-active": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit-active": {
      transform: "translateX(-15px)",
      opacity: 0,
    },

    "& .fade-enter-active, .fade-exit-active": {
      transition: "0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    },
  },

  // ticker
  tickerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  headline: {
    color: "#ffd200",
    fontFamily: "'industry', sans-serif",
    fontSize: 34 * 0.746031746031746,
    fontWeight: "bold",
    flex: 1,
    padding: `0px ${39 * 0.746031746031746}px 0px ${67 * 0.746031746031746}px`,
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    overflow: "hidden",
  },
  ticker: {
    backgroundColor: "#fff",
    color: "#02143c",
    fontFamily: "'industry'",
    height: 37 * 0.746031746031746,
    display: "flex",
    alignItems: "center",
    padding: `0px ${39 * 0.746031746031746}px 0px 0px`,
    fontSize: "10.07142857142857pt",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    position: "relative",
    width: "100%",
  },
  tickerInner: {
    alignItems: "center",
  },
  tickerItem: {
    display: "flex",
  },

  // Casters
  castersWrapper: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    marginLeft: theme.spacing(2 * 0.746031746031746),

    "& .caster": {
      display: "flex",
      padding: theme.spacing(0, 6 * 0.746031746031746),
      flexDirection: "column",
      borderRight: "3px solid rgba(255,255,255,.7)",

      "&:last-child": {
        borderRight: "none",
      },

      "& .name": {
        color: "#fff",
        fontFamily: "industry",
        fontSize: 38 * 0.746031746031746,
        textTransform: "uppercase",
        fontWeight: "bold",
        whiteSpace: "pre",
      },
      "& .ign": {
        fontWeight: "bold",
        color: "#ffd200",
        fontFamily: "industry",
        fontSize: 20 * 0.746031746031746,
        textTransform: "uppercase",
      },
    },
  },
  ltContent: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  announcements: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: `0px ${39 * 0.746031746031746}px 0px ${67 * 0.746031746031746}px`,

    "& .headline": {
      color: "#ffd200",
      fontFamily: "'industry', sans-serif",
      fontSize: 28 * 0.746031746031746,
      fontWeight: "bold",
      textTransform: "uppercase",
    },

    "& .content": {
      textTransform: "uppercase",
      fontFamily: "industry",
      color: "#f9f9f9",
      fontSize: 54 * 0.746031746031746,
      fontWeight: "bold",
      marginTop: -15 * 0.746031746031746,
      whiteSpace: "nowrap",
    },
  },
  playerStats: {
    display: "flex",
    height: "100%",
    width: "100%",
    paddingLeft: theme.spacing(7 * 0.746031746031746),
    alignItems: "center",

    "& .teamLogo": {
      width: 100 * 0.746031746031746,
      height: "90% ",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .playerPhoto": {
      backgroundSize: "contain",
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "bottom center",
      height: "100%",
      width: 120 * 0.746031746031746,
      transform: "scale(1.3)",
    },

    "& .content": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(
        0,
        7 * 0.746031746031746,
        0,
        3 * 0.746031746031746
      ),

      "& .playerName": {
        fontFamily: "industry",
        fontWeight: "bold",
        fontSize: 24 * 0.746031746031746,
        textTransform: "uppercase",
        color: "#ffd200",
      },
      "& .quote": {
        fontFamily: "industry",
        alignSelf: "flex-start",
        fontWeight: 600,
        fontSize: 26 * 0.746031746031746,
        textTransform: "uppercase",
        color: "#f9f9f9",
        lineHeight: 1,
        // textAlign: "center",
        // padding: theme.spacing(0, 3),
        // position: "relative",

        // "&::before": {
        //   content: "'\"'",

        //   opacity: 0.5,
        //   position: "absolute",
        //   top: -5,
        //   right: "95%",
        //   fontFamily: "industry",
        //   fontWeight: "bold",
        //   fontSize: 40,
        //   color: "#f9f9f9",
        // },
        // "&::after": {
        //   content: "'\"'",
        //   opacity: 0.5,
        //   position: "absolute",
        //   top: -5,
        //   left: "95%",
        //   fontFamily: "industry",
        //   fontWeight: "bold",
        //   fontSize: 40,
        //   color: "#f9f9f9",
        // },
      },

      "& .stats": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "& .divider": {
          width: 2,
          height: 48 * 0.746031746031746,
          backgroundColor: "#f9f9f9",
        },

        "& .statItem": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          "&:first-child": {
            paddingLeft: 0,
          },
          "&:last-child": {
            borderRight: "none",
          },

          "& .property": {
            color: "#ffd200",
            fontSize: 16 * 0.746031746031746,
            fontFamily: "industry",
            fontWeight: "bold",
            fontStyle: "italic",
            textTransform: "uppercase",
          },

          "& .value": {
            marginTop: -5 * 0.746031746031746,
            color: "#fff",
            fontSize: 28 * 0.746031746031746,
            fontFamily: "industry",
            fontWeight: "bold",
            textTransform: "uppercase",
          },
        },
      },
    },
  },
  hidden: {
    height: 10 * 0.746031746031746,
    width: 10 * 0.746031746031746,
    opacity: 0,
    // display: "none",
  },

  match: {
    display: "flex",
    position: "absolute",
    opacity: 0,
    top: 822,
    left: 359,
    zIndex: 999,
    justifyContent: "space-between",
    width: 1700 * 0.746031746031746,
    alignItems: "center",

    "& .vs": {
      fontFamily: "Druk Wide Bold, sans-serif",
      fontSize: 34 * 0.746031746031746,
      color: "#ffd200",
    },

    "& .team": {
      height: "100%",
      display: "flex",
      alignItems: "center",

      "& .logo": {
        height: "90%",
        width: 120 * 0.746031746031746,
        margin: `0px ${52 * 0.746031746031746}px`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
      "& .details": {
        display: "flex",
        flexDirection: "column",
        flex: 1,

        "& .school": {
          color: "#ddd",
          fontFamily: "industry, sans-serif",
          textTransform: "uppercase",
          fontSize: 20 * 0.746031746031746,
          fontWeight: "bold",
          lineHeight: 1,
          // letterSpacing: 1,
        },
        "& .name": {
          color: "#ffd200",
          fontFamily: "Druk Wide Bold, sans-serif",
          textTransform: "uppercase",
          fontSize: 34 * 0.746031746031746,
          lineHeight: 1,
        },
      },

      "& .right": {
        "& .school": { textAlign: "right" },
        "& .name": { textAlign: "right" },
      },

      "& .score": {
        color: "#f9f9f9",
        fontFamily: "Druk Wide Bold, sans-serif",
        textTransform: "uppercase",
        fontSize: 55 * 0.746031746031746,
        width: 100,
        textAlign: "center",
      },
    },
  },

  frame1: {
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${LeftFrame})`,
    height: 451,
    width: 654,
    position: "absolute",
    top: 336,
    left: 333,

    "& .caster": {
      position: "absolute",
      left: 22,
      bottom: 23,
      color: "#fff",
      textTransform: "uppercase",
      fontFamily: "Druk Wide Bold",
      fontSize: 24,
    },
  },

  frame2: {
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${RightFrame})`,
    height: 451,
    width: 654,
    position: "absolute",
    top: 336,
    left: 997,

    "& .caster": {
      position: "absolute",
      right: 22,
      bottom: 23,
      color: "#fff",
      textTransform: "uppercase",
      textAlign: "right",
      fontFamily: "Druk Wide Bold",
      fontSize: 24,
    },
  },
  veto: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    "& .wrapper": {
      display: "flex",
      alignItems: "center",
      height: "100%",
    },
    "& .title": {
      color: "#ffd200",
      fontFamily: "Anton",
      fontSize: 50,
      textTransform: "uppercase",
      padding: theme.spacing(0, 2, 0, 8),
    },
    "& .veto-item": {
      width: 100,
      paddingTop: 5,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(0, 2),
      "& .team": {
        fontFamily: "Anton",
        fontSize: 20,
        lineHeight: 1,
        color: "#ffd200",
      },
      "& .map": {
        width: 100,
        height: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Anton",
        color: "#ffd200",
        textTransform: "uppercase",
        textShadow: "0px 2px 4px rgba(0,0,0,1)",
        letterSpacing: 1,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontSize: 18,
      },
      "& .type": {
        marginTop: -10,
        position: "relative",
        zIndex: 100,
      },
    },
  },

  pickem: {
    height: "100%",
    alignItems: "center",
    display: "flex",

    "& .title-wrap": {
      display: "flex",
      flexDirection: "column",

      padding: theme.spacing(0, 5, 0, 8),
      borderRight: "2px solid rgba(255,255,255,.5)",
      "& .title": {
        color: "#fff",
        fontFamily: "Anton",
        fontSize: 50,
        textTransform: "uppercase",
        lineHeight: 1,
      },
      "& .sub-title": {
        color: "#aaa",
        fontFamily: "Anton",
        fontSize: 20,
        textTransform: "uppercase",
        lineHeight: 1,
      },
    },

    "& .wrapper": {
      display: "flex",
      height: "100%",
      alignItems: "center",
      padding: theme.spacing(0, 5),
      flex: 1,

      "& .team1, .team2": {
        height: 75,
        width: 75,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },

      "& .bar": {
        flex: 1,
        height: 50,
        backgroundColor: "#ffd200",
        margin: theme.spacing(0, 4),
        display: "flex",
        position: "relative",
        alignItems: "center",
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 80%, 98% 100%, 2% 100%, 0% 80%)",

        "& .team2votes, .team1votes": {
          fontFamily: "Anton",
          fontSize: 25,
          position: "absolute",
          padding: theme.spacing(0, 3),

          filter: "drop-shadow(0 8px 4px rgba(0,0,0,.25))",
        },

        "& .team1votes": { left: 0 },
        "& .team2votes": { right: 0 },

        "& .innerbar": {
          backgroundColor: "#004fff",
          height: "100%",
          width: "100%",
          transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
        },
      },
    },
  },

  pickemShoutout: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",

    "& .avatar": {
      height: 126 * 0.746031746031746,
      width: 126 * 0.746031746031746,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: 10 * 0.746031746031746,
      transform: "scale(0.75)",
      marginLeft: 10 * 0.746031746031746,
    },

    "& .head": {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(
        0,
        8 * 0.746031746031746,
        0,
        10 * 0.746031746031746
      ),
      borderRight: "3px solid rgba(255,255,255,.5)",
      "& .subtitle": {
        color: "#aaa",
        fontFamily: "Anton",
        fontSize: 30 * 0.746031746031746,
        textTransform: "uppercase",
        lineHeight: 1,
      },

      "& .shoutout": {
        color: "#ffd200",
        fontFamily: "Anton",
        fontSize: 60 * 0.746031746031746,
        textTransform: "uppercase",
        lineHeight: 1,
      },
    },

    "& .wrapper": {
      padding: `0px ${37 * 0.746031746031746}px 0px ${
        10 * 0.746031746031746
      }px`,
      height: "100%",
      width: "100%",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",

      "& .headline": {
        color: "#ffd200",
        fontFamily: "'industry', sans-serif",
        fontSize: 25 * 0.746031746031746,
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 1,
        marginBottom: 3 * 0.746031746031746,
      },

      "& .content": {
        textTransform: "uppercase",
        fontFamily: "industry",
        color: "#f9f9f9",
        fontSize: 30 * 0.746031746031746,
        fontWeight: "bold",
        marginTop: -5 * 0.746031746031746,
        lineHeight: 1,
      },
    },
  },
});

// const isNumber = (n: any): boolean => {
//   return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
// };

const maps = {
  ascent: ascentMap,
  bind: bindMap,
  haven: havenMap,
  split: splitMap,
  icebox: iceboxMap,
};

const getSize = (string: LowerThirdsMode): LowerThirdsSize => {
  switch (string) {
    case "ticker":
      return "medium";
    case "casters":
      return "medium";
    case "long":
      return "large";
    case "playerStats":
      return "medium";
    case "playerQuote":
      return "medium";
    case "veto":
      return 1400;
    case "pickem":
      return "large";
    case "pickemShoutout":
      return "large";
    default:
      return "medium";
  }
};

const CasterCam: React.FC<RouteComponentProps> = ({ location: { search } }) => {
  const c = ms();
  const {
    lowerThirds,
    casters,
    casters_alt,
    match,
    match_live,
    tournament,
  } = useSelector((state: ReduxState) => state.live);

  const [poll] = useDocumentData<PollItemProps>(
    db
      .collection("tournaments")
      .doc(tournament?.url)
      .collection("poll")
      .doc(match?.id + "")
  );

  let params = new URLSearchParams(search);

  const ws = React.useContext(wsContext);
  React.useEffect(() => {
    ws.updateSocketUsername("Caster Cam Module");
  }, []);

  const getParticipant = (id: number): Participant | undefined => {
    return (
      tournament?.participants.find((p) => p.id === id) ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
    );
  };

  const getTeamLogo = (id: number = 0): string => {
    return (
      tournament?.participants.find((p) => p.id === id)?.logo ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.logo ??
      ""
    );
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

  const team = (id: number) => {
    return tournament?.participants.find(
      (p) => p.group_player_ids.includes(id) || p.id === id
    );
  };

  const getPos = (): number => {
    let totalVotes: number =
      (poll?.team1_votes ?? 0) + (poll?.team2_votes ?? 0);
    let pos = ((poll?.team1_votes ?? 0) / totalVotes) * 100;

    return totalVotes > 0 ? pos : 50;
  };

  return (
    <div className={c.screen}>
      <img src={lowerThirds?.player?.photo_main} className={c.hidden} />
      <img src={lowerThirds?.player?.team?.logo} className={c.hidden} />
      <img src={getTeamLogo(match?.player1_id)} className={c.hidden} />
      <img src={getTeamLogo(match?.player2_id)} className={c.hidden} />
      <div className={c.frame1}>
        <div className="caster">
          {!Boolean(params.get("alt"))
            ? casters
              ? casters[0].name
              : ""
            : casters_alt
            ? casters_alt[0].name
            : ""}
        </div>
      </div>
      <div className={c.frame2}>
        <div className="caster">
          {!Boolean(params.get("alt"))
            ? casters
              ? casters[1].name
              : ""
            : casters_alt
            ? casters_alt[1].name
            : ""}
        </div>
      </div>
      <Transition
        items={match_live}
        from={{ opacity: 0, transform: "translateY(10px)" }}
        enter={{ opacity: 1, transform: "translateY(0px)" }}
        leave={{ opacity: 0, transform: "translateY(10px)" }}
      >
        {(toggle) =>
          toggle
            ? (props) => (
                <div className={c.match} style={props}>
                  <LowerThirds size={783} disablelogo shadow>
                    <div className="team">
                      <div
                        className="logo"
                        style={{
                          backgroundImage: `url(${getTeamLogo(
                            match?.player1_id
                          )}})`,
                        }}
                      ></div>
                      <div className="details">
                        <div className="school">
                          {
                            getParticipant(match?.player1_id ?? 0)
                              ?.university_name
                          }
                        </div>
                        <div className="name">
                          {getParticipant(match?.player1_id ?? 0)?.org_name}
                        </div>
                      </div>
                      <div className="score">
                        {getFinalScore(match?.scores_csv ?? "0-0", 1)}
                      </div>
                    </div>
                  </LowerThirds>
                  <div className="vs">VS</div>
                  <LowerThirds size={783} reversecut shadow disablelogo>
                    <div className="team">
                      <div className="score">
                        {getFinalScore(match?.scores_csv ?? "0-0", 2)}
                      </div>
                      <div className="details right">
                        <div className="school">
                          {
                            getParticipant(match?.player2_id ?? 0)
                              ?.university_name
                          }
                        </div>
                        <div className="name">
                          {getParticipant(match?.player2_id ?? 0)?.org_name}
                        </div>
                      </div>
                      <div
                        className="logo"
                        style={{
                          backgroundImage: `url(${getTeamLogo(
                            match?.player2_id
                          )}})`,
                        }}
                      ></div>
                    </div>
                  </LowerThirds>
                </div>
              )
            : (props) => (
                <LowerThirds
                  size={getSize(lowerThirds?.mode ?? "ticker")}
                  shadow
                  className={c.LowerThirds}
                  style={{ ...props }}
                >
                  <SwitchTransition mode="out-in">
                    <CSSTransition
                      key={lowerThirds?.mode}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade"
                    >
                      <div style={{ color: "#fff" }} className={c.ltContent}>
                        {/* TICKER */}
                        {lowerThirds?.mode === "ticker" && (
                          <div className={c.tickerWrapper}>
                            <div className={c.headline}>
                              {lowerThirds?.headline}
                            </div>
                            <div className={c.ticker}>
                              <Marquee
                                gradientWidth={100 * 0.746031746031746}
                                className={c.tickerInner}
                                style={{
                                  width:
                                    getLTWidth(
                                      getSize(lowerThirds?.mode ?? "ticker")
                                    ) -
                                    126 * 0.746031746031746,
                                }}
                              >
                                {(lowerThirds?.ticker ?? "")
                                  .split("\n")
                                  .map((item, i) => (
                                    <div
                                      key={i}
                                      className={c.tickerItem}
                                      style={{ whiteSpace: "pre" }}
                                    >
                                      {item}
                                      {lowerThirds?.ticker.split("\n").length -
                                        1 ===
                                      i ? (
                                        <span
                                          style={{
                                            margin: `0px ${
                                              20 * 0.746031746031746
                                            }px`,
                                          }}
                                        ></span>
                                      ) : (
                                        <span style={{ margin: `0px ${20}px` }}>
                                          |
                                        </span>
                                      )}
                                    </div>
                                  ))}
                              </Marquee>
                            </div>
                          </div>
                        )}

                        {/* CASTER */}
                        {lowerThirds?.mode === "casters" && (
                          <div className={c.castersWrapper}>
                            {!Boolean(params.get("alt"))
                              ? casters?.map((caster) => (
                                  <div className="caster" key={caster.ign}>
                                    <Typography variant="h4" className="name">
                                      {caster.name}
                                    </Typography>
                                    <Typography variant="h5" className="ign">
                                      {caster.ign}
                                    </Typography>
                                  </div>
                                ))
                              : casters_alt?.map((caster) => (
                                  <div className="caster" key={caster.ign}>
                                    <Typography variant="h4" className="name">
                                      {caster.name}
                                    </Typography>
                                    <Typography variant="h5" className="ign">
                                      {caster.ign}
                                    </Typography>
                                  </div>
                                ))}
                          </div>
                        )}

                        {/* Announcements */}
                        {lowerThirds?.mode === "long" && (
                          <div className={c.announcements}>
                            <Typography variant="h6" className="headline">
                              {lowerThirds.announcement_headline}
                            </Typography>

                            <Typography variant="h4" className="content">
                              {lowerThirds.announcement_content}
                            </Typography>
                          </div>
                        )}

                        {lowerThirds?.mode === "playerStats" && (
                          <div className={c.playerStats}>
                            <div
                              className="teamLogo"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.team?.logo})`,
                              }}
                            ></div>
                            <div className="content">
                              <div className="playerName">
                                {lowerThirds?.player?.ign}
                              </div>
                              <div className="stats">
                                <div className="statItem">
                                  <div className="property">
                                    {lowerThirds?.player_stats?.left?.property}
                                  </div>
                                  <div className="value">
                                    {lowerThirds?.player_stats?.left?.value}
                                  </div>
                                </div>
                                <Divider
                                  component="div"
                                  className="divider"
                                  orientation="vertical"
                                />
                                <div className="statItem">
                                  <div className="property">
                                    {
                                      lowerThirds?.player_stats?.middle
                                        ?.property
                                    }
                                  </div>
                                  <div className="value">
                                    {lowerThirds?.player_stats?.middle?.value}
                                  </div>
                                </div>

                                <Divider
                                  component="div"
                                  variant="fullWidth"
                                  className="divider"
                                  orientation="vertical"
                                />
                                <div className="statItem">
                                  <div className="property">
                                    {lowerThirds?.player_stats?.right?.property}
                                  </div>
                                  <div className="value">
                                    {lowerThirds?.player_stats?.right?.value}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="playerPhoto"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.photo_main})`,
                              }}
                            ></div>
                          </div>
                        )}

                        {lowerThirds?.mode === "playerQuote" && (
                          <div className={c.playerStats}>
                            <div
                              className="teamLogo"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.team?.logo})`,
                              }}
                            ></div>
                            <div className="content">
                              <div className="playerName">
                                {lowerThirds?.player?.ign}
                              </div>
                              <div className="quote">
                                "{lowerThirds?.player_quote}"
                              </div>
                            </div>
                            <div
                              className="playerPhoto"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.photo_main})`,
                              }}
                            ></div>
                          </div>
                        )}

                        {lowerThirds?.mode === "veto" && (
                          <div className={c.veto}>
                            <div className="title">Veto</div>
                            <ArrowForwardIosIcon style={{ color: "#ffd200" }} />
                            <Transition
                              items={match?.veto ?? []}
                              keys={(v) => v.map}
                              from={{
                                opacity: 0,
                                transform: "translateX(-5px)",
                              }}
                              enter={{
                                opacity: 1,
                                transform: "translateX(0px)",
                              }}
                              trail={200}
                            >
                              {(v, state, i) => (props) => (
                                <div className="wrapper" style={props}>
                                  <div className="veto-item">
                                    <div className="team">
                                      {v.team.university_acronym}
                                    </div>
                                    <div
                                      className="map"
                                      style={{
                                        backgroundImage: `url(${maps[v.map]})`,
                                        filter:
                                          v.type === "ban"
                                            ? "grayscale(100%)"
                                            : "none",
                                        color:
                                          v.type === "ban" ? "#eee" : "#ffd200",
                                      }}
                                    >
                                      {v.map}
                                    </div>
                                    {v.type === "ban" ? (
                                      <CancelIcon className="type" />
                                    ) : (
                                      <CheckCircleIcon
                                        className="type"
                                        style={{
                                          color: "#ffd200",
                                        }}
                                      />
                                    )}
                                  </div>
                                  {Boolean(
                                    i !== (match?.veto?.length ?? 5) - 1
                                  ) && (
                                    <ArrowForwardIosIcon
                                      style={{ color: "#ffd200" }}
                                    />
                                  )}
                                </div>
                              )}
                            </Transition>
                            {/* {match?.veto?.map((v, i) => (
                              <div className="wrapper">
                                <div className="veto-item">
                                  <div className="team">
                                    {v.team.university_acronym}
                                  </div>
                                  <div
                                    className="map"
                                    style={{
                                      backgroundImage: `url(${maps[v.map]})`,
                                      filter:
                                        v.type === "ban"
                                          ? "grayscale(100%)"
                                          : "none",
                                      color:
                                        v.type === "ban" ? "#eee" : "#ffd200",
                                    }}
                                  >
                                    {v.map}
                                  </div>
                                  {v.type === "ban" ? (
                                    <CancelIcon className="type" />
                                  ) : (
                                    <CheckCircleIcon
                                      className="type"
                                      style={{
                                        color: "#ffd200",
                                      }}
                                    />
                                  )}
                                </div>
                                {Boolean(
                                  i !== (match?.veto?.length ?? 5) - 1
                                ) && (
                                  <ArrowForwardIosIcon
                                    style={{ color: "#ffd200" }}
                                  />
                                )}
                              </div>
                            ))} */}
                          </div>
                        )}

                        {/* pickem */}
                        {lowerThirds?.mode === "pickem" && (
                          <div className={c.pickem}>
                            <div className="title-wrap">
                              <div className="sub-title">!vote</div>
                              <div className="title">PICK'EM</div>
                            </div>
                            <div className="wrapper">
                              <div
                                className="team1"
                                style={{
                                  backgroundImage: `url(${poll?.team1?.logo})`,
                                }}
                              ></div>
                              <div className="bar">
                                <div
                                  className="innerbar"
                                  style={{
                                    clipPath: `polygon(0% 0%, ${getPos()}% 0%, ${getPos()}% 100%, 0% 100%)`,
                                  }}
                                ></div>
                                <div className="team1votes">
                                  {(poll?.team1_votes ?? 0) +
                                    (poll?.team2_votes ?? 0) ===
                                  0
                                    ? 50
                                    : Math.round(
                                        ((poll?.team1_votes ?? 0) /
                                          ((poll?.team1_votes ?? 0) +
                                            (poll?.team2_votes ?? 0))) *
                                          100
                                      )}
                                  %
                                </div>
                                <div className="team2votes">
                                  {(poll?.team1_votes ?? 0) +
                                    (poll?.team2_votes ?? 0) ===
                                  0
                                    ? 50
                                    : Math.round(
                                        ((poll?.team2_votes ?? 0) /
                                          ((poll?.team1_votes ?? 0) +
                                            (poll?.team2_votes ?? 0))) *
                                          100
                                      )}
                                  %
                                </div>
                              </div>
                              <div
                                className="team2"
                                style={{
                                  backgroundImage: `url(${poll?.team2?.logo})`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {lowerThirds?.mode === "pickemShoutout" && (
                          <div className={c.pickemShoutout}>
                            <div className="head">
                              <div className="subtitle">!pickem</div>
                              <Typography variant="h4" className="shoutout">
                                SHOUTOUT
                              </Typography>
                            </div>
                            {lowerThirds.shoutout?.img && (
                              <div
                                className="avatar"
                                style={{
                                  backgroundImage: `url(${lowerThirds.shoutout?.img})`,
                                }}
                              ></div>
                            )}
                            <div
                              className="wrapper"
                              style={{
                                padding: !lowerThirds.shoutout?.img
                                  ? `0 ${37 * 0.746031746031746}px`
                                  : `0px ${37 * 0.746031746031746}px 0px ${
                                      10 * 0.746031746031746
                                    }px`,
                              }}
                            >
                              <Typography variant="h6" className="headline">
                                {lowerThirds.shoutout?.alias}
                              </Typography>

                              <Typography variant="h4" className="content">
                                {lowerThirds.shoutout?.message}
                              </Typography>
                            </div>
                          </div>
                        )}

                        {lowerThirds?.mode === "ad" && <Ad small />}
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                </LowerThirds>
              )
        }
      </Transition>
    </div>
  );
};

export default withRouter(CasterCam);
