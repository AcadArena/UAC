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
import GroupBanner from "../../comps/containers/GroupBanner";
import useTournament from "../../comps/hooks/useTournament";
import { Participant, ReduxState } from "../../config/types/types";

const ms = makeStyles({
  table: {
    "& .table-head": {
      "& .tr": {
        borderBottom: "3px solid #ffd200",
        "& .td": {
          color: "#ffd200",
          padding: "30px 20px 20px 20px",
          fontFamily: "Anton",
          fontSize: 24,
          textTransform: "uppercase",
        },

        "& .team": {
          // paddingLeft: 100,
        },
        "& .groupName": {
          width: 355,
        },

        "& .wl": {
          textAlign: "center",
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
          padding: "10px 25px",
          fontFamily: "Anton",
          fontSize: 22,
          verticalAlign: "middle",
        },

        "& .groupName": {
          width: 355,
          columnSpan: 4,
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

        "& .wl, .pos, .points": {
          fontSize: 22,
          width: 150,
          textAlign: "center",
        },
        "& .points": {
          // fontSize: 34,
          color: "#ffd000",
        },
      },
    },
  },
  module: {
    position: "relative",
  },
  head: {
    position: "absolute",
    height: "100%",
    width: 380,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 50,
    "& .head": {
      fontFamily: "Anton",
      fontSize: 70,
      color: "#ffd000",
    },
  },
});

const StandingsModule: React.FC<{ className?: string; group: number }> = ({
  className,
  group = 0,
  ...props
}) => {
  const c = ms();
  const { tournament } = useSelector((state: ReduxState) => state.live);

  const { matches, team, getTeamGroupsResult } = useTournament();

  let allGroups = Array.from(
    new Set(matches.filter((m) => Boolean(m.group_id)).map((m) => m.group_id))
  );
  console.log("group", allGroups);

  let groupMatches = matches.filter((m) => m.group_id === allGroups[group]);

  let groupIds = new Set([
    ...groupMatches.map((m) => m.player1_id),
    ...groupMatches.map((m) => m.player2_id),
  ]);

  console.log(groupIds);
  // console.log(groupIds);

  let groups = Array.from(groupIds).map((id) => team(id));
  console.log(groups);

  const groupsSort = (a?: Participant, b?: Participant) => {
    const aPoints = getTeamGroupsResult(a?.id).points;
    const bPoints = getTeamGroupsResult(b?.id).points;
    return aPoints < bPoints ? 1 : -1;
  };

  return (
    <div className={c.module}>
      <div className={c.head}>
        <div className="head">STANDINGS</div>
        <GroupBanner group={group === 0 ? "A" : "B"} />
      </div>
      <Table className={c.table + " " + className} {...props}>
        <TableHead className="table-head">
          <TableRow className="tr">
            <TableCell align="center" className="td groupName"></TableCell>
            <TableCell align="center" className="td pos">
              Pos
            </TableCell>
            <TableCell className="td team">Team</TableCell>
            <TableCell className="td wl">W-L</TableCell>
            <TableCell className="td wl">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          <Transition
            items={groups.sort(groupsSort)}
            // @ts-ignore
            keys={(team, i) => i}
            from={{ opacity: 0, transform: "translateX(-10px)" }}
            enter={{ opacity: 1, transform: "translateX(0px)" }}
            trail={100}
          >
            {(team, array, i) => (props) => (
              <TableRow className="tr" style={props}>
                <TableCell align="center" className="td groupName"></TableCell>
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
                  {getTeamGroupsResult(team?.id).wins} -{" "}
                  {getTeamGroupsResult(team?.id).loses}
                </TableCell>
                <TableCell className="td points">
                  {getTeamGroupsResult(team?.id).points}
                </TableCell>
              </TableRow>
            )}
          </Transition>
        </TableBody>
      </Table>
    </div>
  );
};

export default StandingsModule;
