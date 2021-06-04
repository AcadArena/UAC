import React from "react";
import useTournament from "../comps/hooks/useTournament";

const PointsSystemTest = () => {
  const { getTeamGroupsResult } = useTournament();
  return <div>{getTeamGroupsResult(146135791).loses} test</div>;
};

export default PointsSystemTest;
