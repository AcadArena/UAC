import React from "react";
import { useSelector } from "react-redux";
import {
  Live,
  ReduxState,
  Tournament,
  Participant,
  Match,
} from "../../config/types/types";
import { format } from "date-fns";

const useTournament = () => {
  const { match, tournament } = useSelector<ReduxState, Live>(
    (state) => state.live
  );
  const participants = tournament?.participants;
  const matches = tournament?.matches;

  const getOrg = (teamId: number = 0): Participant | undefined => {
    return participants?.find(
      (team) => team.id === teamId || team.group_player_ids.includes(teamId)
    );
  };

  /**
   *
   * ### Get result of a match.
   *
   */
  const getTeamMatchResult = (
    match?: Match,
    teamId: number = 0
  ): {
    wins: number;
    loses: number;
  } => {
    if (!match) return { wins: 0, loses: 0 };

    let wins = 0,
      loses = 0;

    const team = getOrg(teamId);
    const teamGroupIds = team?.group_player_ids ?? [];

    let isTeam1 =
      teamGroupIds.includes(match.player1_id) || team?.id === match.player1_id;

    let rounds = match.scores_csv.split(",");

    rounds.forEach((r) => {
      let ss = r.match(/^(\d*)-(\d*)/);
      if (isTeam1) {
        if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
          wins = wins + 1;
        } else if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
          loses = loses + 1;
        }
      } else {
        if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
          wins = wins + 1;
        } else if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
          loses = loses + 1;
        }
      }
    });

    return { wins, loses };
  };

  /**
   *
   * ### Get team's group stage result.
   *
   */
  const getTeamGroupsResult = (
    teamId: number = 0
  ): {
    wins: number;
    loses: number;
    points: number;
  } => {
    const groupIds = getOrg(teamId)?.group_player_ids ?? [];

    let wins = 0,
      loses = 0,
      points = 0;

    matches
      ?.filter(
        (match) =>
          groupIds.includes(match.player1_id) ||
          groupIds.includes(match.player2_id)
      )
      .forEach((match) => {
        let isTeam1 = groupIds.includes(match.player1_id);

        let matchWins = 0;
        let matchLoses = 0;

        let rounds = match.scores_csv.split(",");

        rounds.forEach((r) => {
          let ss = r.match(/^(\d*)-(\d*)/);
          if (isTeam1) {
            if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
              wins = wins + 1;
              matchWins = matchWins + 1;
            } else if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
              loses = loses + 1;
              matchLoses = matchLoses + 1;
            }
          } else {
            if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
              wins = wins + 1;

              matchWins = matchWins + 1;
            } else if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
              loses = loses + 1;
              matchLoses = matchLoses + 1;
            }
          }
        });

        if (matchWins === 2 && matchLoses === 0) {
          points = points + 3;
        } else if (matchWins === 1) {
          points = points + 1;
        }
      });

    return { wins, loses, points };
  };

  const badger = (m: Match) => {
    const bestof = m.bestOf ?? 2;
    if (
      getTeamMatchResult(m, m.player1_id).wins !== 0 ||
      getTeamMatchResult(m, m.player2_id).wins !== 0
    ) {
      if (getTeamMatchResult(m, m.player1_id).wins > bestof / 2) {
        return `#${getOrg(m.player1_id)?.university_acronym}WIN`;
      }

      if (getTeamMatchResult(m, m.player2_id).wins > bestof / 2) {
        return `#${getOrg(m.player2_id)?.university_acronym}WIN`;
      }
      return `${getTeamMatchResult(m, m.player1_id).wins} - ${
        getTeamMatchResult(m, m.player2_id).wins
      }`;
    } else {
      return format(new Date(m.schedule ?? Date.now()), "hh:mm a") ?? "SOON";
    }
  };

  return {
    match,
    tournament,
    participants: participants ?? [],
    matches: matches ?? [],
    team: getOrg,
    getTeamGroupsResult,
    getTeamMatchResult,
    badger,
  };
};

export default useTournament;
