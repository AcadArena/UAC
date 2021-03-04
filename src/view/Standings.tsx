import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Frame from "../comps/containers/Frame";
import { Participant, ReduxState } from "../config/types/types";
import TimerOnly from "./TimerOnly";

const ms = makeStyles((theme) => ({
  standings: {
    width: 1920,
    height: 1080,
    position: "relative",
  },
  frame: {
    position: "absolute",
    top: 303,
    left: 678,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
  },
  table: {
    "& .table-head": {
      "& .tr": {
        borderBottom: "3px solid #ffd200",
        "& .td": {
          color: "#ffd200",
          padding: "30px 20px 10px 20px",
          fontFamily: "Anton",
          fontSize: 24,
        },

        "& .team": {
          // paddingLeft: 100,
        },
      },
    },
    "& .table-body": {
      "& .tr": {
        outline: "none",
        border: "none",
        "& .td": {
          border: "none",
          color: "#fff",
          padding: "10px 20px",
          fontFamily: "Anton",
          fontSize: 24,
        },

        "& .team": {
          display: "flex",
          alignItems: "center",

          "& .name": {
            fontFamily: "Druk Wide Bold",
            // fontStyle: "italic",
            fontSize: 18,
            textTransform: "uppercase",
          },
          "& .logo": {
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: 50,
            width: 50,
            marginRight: 20,
          },
        },

        "& .wl, .pos": {
          fontSize: 19,
          width: 180,
        },
      },
    },
  },
  countdown: {
    top: 847,
    left: 678,
  },
}));

// const groupA = ["ADMU", "DLSU", "MU", "USC", "USA", "FEU"];

const Standings: React.FC<{ group?: string[] }> = ({
  group = ["ADMU", "DLSU", "MU", "USC", "USA", "FEU"],
}) => {
  const c = ms();
  const { tournament } = useSelector((state: ReduxState) => state.live);
  const getGroupMatchResults = (team?: Participant): string => {
    const groupIds: number[] = team?.group_player_ids ?? [];

    const matches = tournament?.matches.filter(
      (m) => groupIds.includes(m.player1_id) || groupIds.includes(m.player2_id)
    );

    let lost: number =
      matches
        ?.map((m) => m.loser_id)
        .reduce((acc, cur) => {
          if (groupIds.includes(cur)) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0) ?? 0;
    let win: number =
      matches
        ?.map((m) => m.winner_id)
        .reduce((acc, cur) => {
          if (groupIds.includes(cur)) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0) ?? 0;
    return `${win}-${lost}`;
  };

  let groups = group.map((uni) =>
    tournament?.participants?.find((p) => p.university_acronym === uni)
  );

  const getGroupsWins = (team?: Participant): number => {
    const groupIds: number[] = team?.group_player_ids ?? [];
    const matches = tournament?.matches.filter(
      (m) => groupIds.includes(m.player1_id) || groupIds.includes(m.player2_id)
    );

    return (
      matches
        ?.map((m) => m.winner_id)
        .reduce((acc, cur) => {
          if (groupIds.includes(cur)) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0) ?? 0
    );
  };
  const getGroupsLoses = (team?: Participant): number => {
    const groupIds: number[] = team?.group_player_ids ?? [];
    const matches = tournament?.matches.filter(
      (m) => groupIds.includes(m.player1_id) || groupIds.includes(m.player2_id)
    );

    return (
      matches
        ?.map((m) => m.loser_id)
        .reduce((acc, cur) => {
          if (groupIds.includes(cur)) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0) ?? 0
    );
  };

  const groupsSort = (a?: Participant, b?: Participant) => {
    const aWins = getGroupsWins(a);
    const bWins = getGroupsWins(b);
    const aLoses = getGroupsLoses(a);
    const bLoses = getGroupsLoses(b);
    if (aWins === bWins) return aLoses > bLoses ? 1 : -1;
    return aWins < bWins ? 1 : -1;
  };

  return (
    <div className={c.standings}>
      <Frame className={c.frame}>
        <Table className={c.table}>
          <TableHead className="table-head">
            <TableRow className="tr">
              <TableCell align="center" className="td pos">
                Pos
              </TableCell>
              <TableCell className="td team">Team</TableCell>
              <TableCell className="td wl">W-L</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {groups.sort(groupsSort).map((team, i) => (
              <TableRow className="tr" key={i}>
                <TableCell align="center" className="td pos">
                  {i + 1}
                </TableCell>
                <TableCell className="td team">
                  <div
                    className="logo"
                    style={{ backgroundImage: `url(${team?.logo})` }}
                  ></div>
                  <div className="name">{team?.org_name}</div>
                </TableCell>
                <TableCell className="td wl">
                  {getGroupMatchResults(team)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Frame>

      <TimerOnly className={c.countdown} />
    </div>
  );
};

export default Standings;
