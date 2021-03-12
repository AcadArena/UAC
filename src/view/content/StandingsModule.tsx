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
import { Transition } from "react-spring/renderprops";
import { Participant, ReduxState } from "../../config/types/types";

const ms = makeStyles({
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
});

const StandingsModule: React.FC<{ className?: string; group: string[] }> = ({
  className,
  group = [],
  ...props
}) => {
  const c = ms();
  const { tournament } = useSelector((state: ReduxState) => state.live);
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

  let groups = group.map((uni) =>
    tournament?.participants?.find((p) => p.university_acronym === uni)
  );

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
  const getGroupsLoses = (team?: Participant): number => {
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

    return lost;
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
    <div style={{ paddingBottom: 10 }}>
      <Table className={c.table + " " + className} {...props}>
        <TableHead className="table-head">
          <TableRow className="tr">
            <TableCell align="center" className="td pos">
              Pos
            </TableCell>
            <TableCell className="td team">
              TeamS{" "}
              {["ADMU", "DLSU", "MU", "USC", "USA", "FTX"].every((item) =>
                group.includes(item)
              )
                ? "(GROUP A)"
                : "(GROUP B)"}
            </TableCell>
            <TableCell className="td wl">W-L</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          <Transition
            items={groups.sort(groupsSort)}
            // @ts-ignore
            keys={(team, i) => i}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            trail={100}
          >
            {(team, array, i) => (props) => (
              <TableRow className="tr" style={props}>
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
            )}
          </Transition>
          {/* {groups.sort(groupsSort).map((team, i) => (
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
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default StandingsModule;
